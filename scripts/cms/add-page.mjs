#!/usr/bin/env node
import { access, mkdir, writeFile } from "fs/promises";
import path from "path";

function getArg(name, fallback = "") {
  const arg = process.argv.find((value) => value.startsWith(`--${name}=`));
  if (arg) return arg.slice(name.length + 3);
  const index = process.argv.indexOf(`--${name}`);
  if (index >= 0) return process.argv[index + 1] ?? fallback;
  return fallback;
}

async function exists(filePath) {
  try {
    await access(filePath);
    return true;
  } catch {
    return false;
  }
}

function toId(value) {
  return value.toLowerCase().replace(/[^a-z0-9-]/g, "-");
}

async function main() {
  const slug = toId(getArg("slug"));
  const title = getArg("title", "Untitled Page");

  if (!slug) {
    console.error('Missing required "--slug". Example: --slug about');
    process.exit(1);
  }

  const pagesDir = path.resolve(process.cwd(), "content", "pages");
  await mkdir(pagesDir, { recursive: true });

  const outFile = path.join(pagesDir, `${slug}.json`);
  if (await exists(outFile)) {
    console.error(`Page already exists: ${outFile}`);
    process.exit(1);
  }

  const document = {
    id: `page-${slug}`,
    title,
    slug,
    seo: {
      title,
      description: `${title} page description`,
    },
    sections: [],
  };

  await writeFile(outFile, `${JSON.stringify(document, null, 2)}\n`, "utf8");
  console.log(`Created page content file: ${outFile}`);
  console.log("Next: add sections and update nav entries in content/site/site.json if required.");
}

main().catch((error) => {
  console.error("Failed to create page:", error);
  process.exit(1);
});
