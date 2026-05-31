import fs from "node:fs/promises";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";
import { createContentStore } from "./content-api/content-store.mjs";
import { createCmsHandler } from "./content-api/routes-cms.mjs";

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const projectRoot = path.resolve(__dirname, "..");
const store = createContentStore(projectRoot);
const handleCms = createCmsHandler(store);
const port = Number(process.env.PORT || 4173);
/** Server-side proxy to Payload (avoids browser CORS from :4173 → :3000). Docker: http://payload:3000 */
const payloadProxyTarget = (
  process.env.PAYLOAD_PROXY_TARGET ||
  process.env.PAYLOAD_URL ||
  "http://127.0.0.1:3000"
).replace(/\/$/, "");

const MIME_TYPES = {
  ".html": "text/html; charset=utf-8",
  ".js": "application/javascript; charset=utf-8",
  ".jsx": "text/plain; charset=utf-8",
  ".css": "text/css; charset=utf-8",
  ".json": "application/json; charset=utf-8",
  ".svg": "image/svg+xml",
  ".png": "image/png",
  ".jpg": "image/jpeg",
  ".jpeg": "image/jpeg",
  ".webp": "image/webp",
};

function filePathForRequest(url) {
  if (url.pathname === "/" || url.pathname === "/index.html") {
    return path.resolve(projectRoot, "index.html");
  }
  return path.resolve(projectRoot, `.${url.pathname}`);
}

function isInsideProject(candidatePath) {
  const relative = path.relative(projectRoot, candidatePath);
  return !relative.startsWith("..") && !path.isAbsolute(relative);
}

/**
 * Browser GET http://localhost:4173/__payload/api/salon-pages?... → Payload REST API.
 */
async function proxyPayloadApi(req, res, url) {
  if (req.method !== "GET" || !url.pathname.startsWith("/__payload/")) {
    return false;
  }
  const upstreamPath = url.pathname.replace(/^\/__payload/, "") || "/";
  const target = `${payloadProxyTarget}${upstreamPath}${url.search}`;
  try {
    const r = await fetch(target, {
      headers: { Accept: "application/json" },
    });
    const text = await r.text();
    res.statusCode = r.status;
    res.setHeader(
      "Content-Type",
      r.headers.get("content-type") || "application/json; charset=utf-8",
    );
    res.end(text);
  } catch (err) {
    res.statusCode = 502;
    res.setHeader("Content-Type", "application/json; charset=utf-8");
    res.end(
      JSON.stringify({
        error: "Payload proxy failed",
        detail: err instanceof Error ? err.message : String(err),
        target,
      }),
    );
  }
  return true;
}

async function serveStatic(req, res, url) {
  const targetPath = filePathForRequest(url);
  if (!isInsideProject(targetPath)) {
    res.statusCode = 403;
    res.end("Forbidden");
    return;
  }

  try {
    const stat = await fs.stat(targetPath);
    const filePath = stat.isDirectory()
      ? path.resolve(targetPath, "index.html")
      : targetPath;
    const ext = path.extname(filePath).toLowerCase();
    const mime = MIME_TYPES[ext] || "application/octet-stream";
    const data = await fs.readFile(filePath);
    res.statusCode = 200;
    res.setHeader("Content-Type", mime);
    res.end(data);
  } catch {
    res.statusCode = 404;
    res.end("Not found");
  }
}

const server = http.createServer(async (req, res) => {
  const host = req.headers.host || `localhost:${port}`;
  const url = new URL(req.url || "/", `http://${host}`);

  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Allow-Headers", "Content-Type");
  res.setHeader("Access-Control-Allow-Methods", "GET,POST,PUT,OPTIONS");
  if (req.method === "OPTIONS") {
    res.statusCode = 204;
    res.end();
    return;
  }

  const proxied = await proxyPayloadApi(req, res, url);
  if (proxied) {
    return;
  }

  const handledCms = await handleCms(req, res, url);
  if (handledCms) {
    return;
  }
  await serveStatic(req, res, url);
});

server.listen(port, () => {
  console.log(`Salon Mastery dev server running on http://localhost:${port}`);
  console.log(`Payload API proxy: /__payload/* → ${payloadProxyTarget}/*`);
});
