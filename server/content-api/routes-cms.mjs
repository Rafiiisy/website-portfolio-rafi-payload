function isObject(value) {
  return value && typeof value === "object" && !Array.isArray(value);
}

function normalizeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

export function validatePage(page) {
  const errors = [];
  if (!isObject(page)) {
    return ["Page payload must be an object."];
  }
  if (!String(page.id || "").trim()) errors.push("Missing page.id");
  if (!String(page.title || "").trim()) errors.push("Missing page.title");
  if (!String(page.slug || "").trim()) errors.push("Missing page.slug");
  if (!isObject(page.seo)) errors.push("Missing page.seo");
  if (!String(page.seo?.title || "").trim()) errors.push("Missing page.seo.title");
  if (!String(page.seo?.description || "").trim()) {
    errors.push("Missing page.seo.description");
  }
  if (!Array.isArray(page.sections)) errors.push("page.sections must be an array");
  if (Array.isArray(page.sections)) {
    page.sections.forEach((section, index) => {
      if (!isObject(section)) {
        errors.push(`sections[${index}] must be an object`);
        return;
      }
      if (!String(section.id || "").trim()) errors.push(`sections[${index}].id missing`);
      if (!String(section.type || "").trim()) errors.push(`sections[${index}].type missing`);
      if (!isObject(section.props)) errors.push(`sections[${index}].props must be object`);
    });
  }
  return errors;
}

function validateSite(site) {
  const errors = [];
  if (!isObject(site)) return ["Site payload must be an object."];
  if (!String(site.brand || "").trim()) errors.push("Missing site.brand");
  if (!Array.isArray(site.nav)) errors.push("site.nav must be an array");
  if (!isObject(site.footer)) errors.push("Missing site.footer");
  if (!String(site.footer?.text || "").trim()) errors.push("Missing site.footer.text");
  if (!Array.isArray(site.footer?.links)) errors.push("site.footer.links must be an array");
  return errors;
}

async function readJsonBody(req) {
  const chunks = [];
  for await (const chunk of req) {
    chunks.push(chunk);
  }
  const body = Buffer.concat(chunks).toString("utf8").trim();
  if (!body) return {};
  return JSON.parse(body);
}

function json(res, statusCode, payload) {
  res.statusCode = statusCode;
  res.setHeader("Content-Type", "application/json; charset=utf-8");
  res.end(`${JSON.stringify(payload)}\n`);
}

function notFound(res, detail = "Not found") {
  json(res, 404, { error: detail });
}

export function createCmsHandler(store) {
  return async function handleCmsRequest(req, res, url) {
    const method = req.method || "GET";
    const pathname = url.pathname;

    try {
      if (method === "GET" && pathname === "/api/cms/pages") {
        const pages = await store.readPagesList();
        json(res, 200, { pages });
        return true;
      }

      if (method === "GET" && pathname === "/api/cms/site") {
        const site = await store.readSite();
        json(res, 200, { site });
        return true;
      }

      if (method === "POST" && pathname === "/api/cms/site") {
        const body = await readJsonBody(req);
        const site = body.site;
        const errors = validateSite(site);
        if (errors.length) {
          json(res, 400, { valid: false, errors });
          return true;
        }
        const saved = await store.updateSite(site);
        json(res, 200, { valid: true, site: saved });
        return true;
      }

      if (method === "POST" && pathname === "/api/cms/validate") {
        const body = await readJsonBody(req);
        const errors = validatePage(body.page);
        json(res, errors.length ? 400 : 200, { valid: errors.length === 0, errors });
        return true;
      }

      if (method === "POST" && pathname === "/api/cms/pages") {
        const body = await readJsonBody(req);
        const page = body.page;
        if (isObject(page)) {
          page.slug = normalizeSlug(page.slug);
          if (!page.id) page.id = `page-${page.slug}`;
        }
        const errors = validatePage(page);
        if (errors.length) {
          json(res, 400, { valid: false, errors });
          return true;
        }
        const created = await store.createPage(page);
        json(res, 201, { valid: true, page: created });
        return true;
      }

      const slugMatch = pathname.match(/^\/api\/cms\/pages\/([^/]+)$/);
      if (!slugMatch) {
        return false;
      }
      const slug = decodeURIComponent(slugMatch[1]);

      if (method === "GET") {
        try {
          const page = await store.readPageBySlug(slug);
          json(res, 200, { page });
        } catch {
          notFound(res, `Page not found: ${slug}`);
        }
        return true;
      }

      if (method === "PUT") {
        const body = await readJsonBody(req);
        const page = body.page;
        if (isObject(page)) {
          page.slug = normalizeSlug(page.slug || slug);
          if (!page.id) page.id = `page-${page.slug}`;
        }
        const errors = validatePage(page);
        if (errors.length) {
          json(res, 400, { valid: false, errors });
          return true;
        }
        if (page.slug !== slug) {
          json(res, 400, { valid: false, errors: ["Cannot rename slug through update."] });
          return true;
        }
        const updated = await store.updatePage(slug, page);
        json(res, 200, { valid: true, page: updated });
        return true;
      }

      json(res, 405, { error: "Method not allowed" });
      return true;
    } catch (error) {
      const statusCode = error.statusCode || 500;
      json(res, statusCode, { error: error.message || "Internal server error" });
      return true;
    }
  };
}
