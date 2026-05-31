import fs from "node:fs/promises";
import path from "node:path";

function toPosix(value) {
  return value.replace(/\\/g, "/");
}

export function createContentStore(projectRoot) {
  const contentRoot = path.resolve(projectRoot, "content");
  const pagesRoot = path.resolve(contentRoot, "pages");
  const sitePath = path.resolve(contentRoot, "site", "site.json");

  function pagePathForSlug(slug) {
    return path.resolve(pagesRoot, `${slug}.json`);
  }

  async function readJson(filePath) {
    const raw = await fs.readFile(filePath, "utf8");
    return JSON.parse(raw);
  }

  async function writeJsonAtomic(filePath, payload) {
    const dir = path.dirname(filePath);
    await fs.mkdir(dir, { recursive: true });
    const tempPath = path.resolve(
      dir,
      `${path.basename(filePath)}.${Date.now()}.tmp`
    );
    await fs.writeFile(tempPath, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
    await fs.rename(tempPath, filePath);
  }

  async function readPagesList() {
    const entries = await fs.readdir(pagesRoot, { withFileTypes: true });
    const pages = [];
    for (const entry of entries) {
      if (!entry.isFile() || !entry.name.endsWith(".json")) {
        continue;
      }
      const fullPath = path.resolve(pagesRoot, entry.name);
      const page = await readJson(fullPath);
      pages.push({
        id: page.id,
        title: page.title,
        slug: page.slug,
        seo: page.seo,
      });
    }
    return pages.sort((a, b) => a.slug.localeCompare(b.slug));
  }

  async function readPageBySlug(slug) {
    return readJson(pagePathForSlug(slug));
  }

  async function pageExists(slug) {
    try {
      await fs.access(pagePathForSlug(slug));
      return true;
    } catch {
      return false;
    }
  }

  async function createPage(page) {
    const targetPath = pagePathForSlug(page.slug);
    if (await pageExists(page.slug)) {
      const error = new Error(`Page slug already exists: ${page.slug}`);
      error.statusCode = 409;
      throw error;
    }
    await writeJsonAtomic(targetPath, page);
    return page;
  }

  async function updatePage(slug, page) {
    if (slug !== page.slug) {
      const error = new Error("URL slug and payload slug must match.");
      error.statusCode = 400;
      throw error;
    }
    if (!(await pageExists(slug))) {
      const error = new Error(`Page not found: ${slug}`);
      error.statusCode = 404;
      throw error;
    }
    await writeJsonAtomic(pagePathForSlug(slug), page);
    return page;
  }

  async function readSite() {
    return readJson(sitePath);
  }

  async function updateSite(site) {
    await writeJsonAtomic(sitePath, site);
    return site;
  }

  return {
    contentRoot: toPosix(contentRoot),
    pagesRoot: toPosix(pagesRoot),
    sitePath: toPosix(sitePath),
    readPagesList,
    readPageBySlug,
    createPage,
    updatePage,
    readSite,
    updateSite,
  };
}
