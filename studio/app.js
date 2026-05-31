const state = {
  pages: [],
  currentSlug: "",
  currentPage: null,
  site: null,
  readOnlyMode: false,
};

const els = {
  siteBrand: document.getElementById("siteBrand"),
  siteFooterText: document.getElementById("siteFooterText"),
  saveSiteBtn: document.getElementById("saveSiteBtn"),
  pageSelect: document.getElementById("pageSelect"),
  newPageBtn: document.getElementById("newPageBtn"),
  refreshBtn: document.getElementById("refreshBtn"),
  pageTitle: document.getElementById("pageTitle"),
  pageSlug: document.getElementById("pageSlug"),
  seoTitle: document.getElementById("seoTitle"),
  seoDescription: document.getElementById("seoDescription"),
  sectionsJson: document.getElementById("sectionsJson"),
  validateBtn: document.getElementById("validateBtn"),
  savePageBtn: document.getElementById("savePageBtn"),
  status: document.getElementById("status"),
};

function normalizeSlug(value) {
  return String(value || "")
    .toLowerCase()
    .trim()
    .replace(/[^a-z0-9-]/g, "-")
    .replace(/-+/g, "-")
    .replace(/^-|-$/g, "");
}

function setStatus(message) {
  els.status.textContent = message;
}

function getContentUrl(relativePath) {
  return window.location.pathname.startsWith("/_studio/")
    ? `../content/${relativePath}`
    : `/content/${relativePath}`;
}

async function api(path, init) {
  const response = await fetch(path, {
    headers: { "Content-Type": "application/json" },
    ...init,
  });
  const payload = await response.json();
  if (!response.ok) {
    throw new Error(payload.error || payload.errors?.join(", ") || "Request failed");
  }
  return payload;
}

function renderSite() {
  els.siteBrand.value = state.site?.brand || "";
  els.siteFooterText.value = state.site?.footer?.text || "";
  if (state.readOnlyMode) {
    els.saveSiteBtn.disabled = true;
    els.savePageBtn.disabled = true;
    els.newPageBtn.disabled = true;
  }
}

function renderPageSelector() {
  els.pageSelect.innerHTML = "";
  state.pages.forEach((page) => {
    const option = document.createElement("option");
    option.value = page.slug;
    option.textContent = `${page.title} (${page.slug})`;
    els.pageSelect.appendChild(option);
  });
  if (state.currentSlug) {
    els.pageSelect.value = state.currentSlug;
  }
}

function renderCurrentPage() {
  const page = state.currentPage;
  if (!page) {
    els.pageTitle.value = "";
    els.pageSlug.value = "";
    els.seoTitle.value = "";
    els.seoDescription.value = "";
    els.sectionsJson.value = "[]";
    return;
  }
  els.pageTitle.value = page.title || "";
  els.pageSlug.value = page.slug || "";
  els.seoTitle.value = page.seo?.title || "";
  els.seoDescription.value = page.seo?.description || "";
  els.sectionsJson.value = JSON.stringify(page.sections || [], null, 2);
}

function getPagePayloadFromForm() {
  let sections = [];
  try {
    sections = JSON.parse(els.sectionsJson.value || "[]");
  } catch {
    throw new Error("Sections JSON is invalid.");
  }
  const slug = normalizeSlug(els.pageSlug.value);
  return {
    id: `page-${slug}`,
    title: els.pageTitle.value.trim(),
    slug,
    seo: {
      title: els.seoTitle.value.trim(),
      description: els.seoDescription.value.trim(),
    },
    sections,
  };
}

async function loadSite() {
  try {
    const payload = await api("/api/cms/site");
    state.site = payload.site;
    state.readOnlyMode = false;
  } catch {
    const response = await fetch(getContentUrl("site/site.json"));
    if (!response.ok) {
      throw new Error("Cannot load site content.");
    }
    state.site = await response.json();
    state.readOnlyMode = true;
  }
  renderSite();
}

async function discoverPageSlugsFromDirectoryListing() {
  const response = await fetch(getContentUrl("pages/"));
  if (!response.ok) {
    return [];
  }
  const html = await response.text();
  const matches = [...html.matchAll(/href="([^"]+\.json)"/gi)];
  const slugs = matches
    .map((match) => {
      const href = match[1];
      const fileName = href.split("/").pop() || "";
      return fileName.replace(/\.json$/i, "");
    })
    .filter(Boolean);
  return [...new Set(slugs)];
}

async function loadPagesFallback() {
  const slugs = await discoverPageSlugsFromDirectoryListing();
  if (!slugs.length) {
    // Fallback for strict servers without directory listing.
    for (const defaultSlug of ["home", "booking"]) {
      try {
        const resp = await fetch(getContentUrl(`pages/${defaultSlug}.json`));
        if (resp.ok) slugs.push(defaultSlug);
      } catch {
        // keep trying next default slug
      }
    }
  }

  const docs = [];
  for (const slug of slugs) {
    const response = await fetch(getContentUrl(`pages/${slug}.json`));
    if (!response.ok) continue;
    docs.push(await response.json());
  }
  state.pages = docs.map((page) => ({
    id: page.id,
    title: page.title,
    slug: page.slug,
    seo: page.seo,
  }));
  return docs;
}

async function loadPages() {
  let docsFromFallback = null;
  try {
    const payload = await api("/api/cms/pages");
    state.pages = payload.pages;
    state.readOnlyMode = false;
  } catch {
    docsFromFallback = await loadPagesFallback();
    state.readOnlyMode = true;
  }
  if (!state.currentSlug && state.pages.length > 0) {
    state.currentSlug = state.pages[0].slug;
  }
  renderPageSelector();
  if (state.currentSlug) {
    if (docsFromFallback) {
      const match = docsFromFallback.find((item) => item.slug === state.currentSlug);
      state.currentPage = match || docsFromFallback[0] || null;
      renderCurrentPage();
    } else {
      await loadPage(state.currentSlug);
    }
  } else {
    state.currentPage = null;
    renderCurrentPage();
  }
}

async function loadPage(slug) {
  if (state.readOnlyMode) {
    const response = await fetch(getContentUrl(`pages/${slug}.json`));
    if (!response.ok) {
      throw new Error(`Cannot load page: ${slug}`);
    }
    state.currentSlug = slug;
    state.currentPage = await response.json();
  } else {
    const payload = await api(`/api/cms/pages/${encodeURIComponent(slug)}`);
    state.currentSlug = slug;
    state.currentPage = payload.page;
  }
  renderPageSelector();
  renderCurrentPage();
}

els.pageSelect.addEventListener("change", async () => {
  try {
    await loadPage(els.pageSelect.value);
    setStatus(`Loaded page: ${els.pageSelect.value}`);
  } catch (error) {
    setStatus(error.message);
  }
});

els.newPageBtn.addEventListener("click", async () => {
  if (state.readOnlyMode) {
    setStatus("Read-only mode: start dev server to create pages.");
    return;
  }
  const title = window.prompt("Page title?", "New Page");
  if (!title) return;
  const suggestedSlug = normalizeSlug(title);
  const slug = normalizeSlug(window.prompt("Page slug?", suggestedSlug) || "");
  if (!slug) {
    setStatus("Slug is required.");
    return;
  }
  const page = {
    id: `page-${slug}`,
    title,
    slug,
    seo: { title, description: `${title} page description` },
    sections: [],
  };
  try {
    await api("/api/cms/pages", {
      method: "POST",
      body: JSON.stringify({ page }),
    });
    state.currentSlug = slug;
    await loadPages();
    setStatus(`Created page: ${slug}`);
  } catch (error) {
    setStatus(`Create failed: ${error.message}`);
  }
});

els.refreshBtn.addEventListener("click", async () => {
  try {
    await loadSite();
    await loadPages();
    setStatus("Refreshed site and pages.");
  } catch (error) {
    setStatus(error.message);
  }
});

els.validateBtn.addEventListener("click", async () => {
  try {
    const page = getPagePayloadFromForm();
    if (state.readOnlyMode) {
      if (!page.title || !page.slug || !page.seo?.title || !page.seo?.description) {
        throw new Error("Missing required fields.");
      }
      if (!Array.isArray(page.sections)) {
        throw new Error("Sections must be an array.");
      }
      setStatus("Validation passed (read-only mode).");
      return;
    }
    await api("/api/cms/validate", {
      method: "POST",
      body: JSON.stringify({ page }),
    });
    setStatus("Validation passed.");
  } catch (error) {
    setStatus(`Validation failed: ${error.message}`);
  }
});

els.savePageBtn.addEventListener("click", async () => {
  if (state.readOnlyMode) {
    setStatus("Read-only mode: start dev server to save pages.");
    return;
  }
  try {
    const page = getPagePayloadFromForm();
    const method = state.pages.some((item) => item.slug === page.slug) ? "PUT" : "POST";
    const path =
      method === "PUT"
        ? `/api/cms/pages/${encodeURIComponent(page.slug)}`
        : "/api/cms/pages";
    await api("/api/cms/validate", {
      method: "POST",
      body: JSON.stringify({ page }),
    });
    await api(path, {
      method,
      body: JSON.stringify({ page }),
    });
    state.currentSlug = page.slug;
    await loadPages();
    setStatus(`Saved page: ${page.slug}`);
  } catch (error) {
    setStatus(`Save failed: ${error.message}`);
  }
});

els.saveSiteBtn.addEventListener("click", async () => {
  if (state.readOnlyMode) {
    setStatus("Read-only mode: start dev server to save site settings.");
    return;
  }
  try {
    const site = {
      ...state.site,
      brand: els.siteBrand.value.trim(),
      footer: {
        ...(state.site?.footer || {}),
        text: els.siteFooterText.value.trim(),
        links: state.site?.footer?.links || [],
      },
      nav: state.site?.nav || [],
    };
    await api("/api/cms/site", {
      method: "POST",
      body: JSON.stringify({ site }),
    });
    state.site = site;
    setStatus("Saved site content.");
  } catch (error) {
    setStatus(`Save site failed: ${error.message}`);
  }
});

async function bootstrap() {
  try {
    await loadSite();
    await loadPages();
    setStatus(
      state.readOnlyMode
        ? "Studio ready (read-only auto-load mode). Start dev server for saving."
        : "Studio ready."
    );
  } catch (error) {
    setStatus(`Bootstrap failed: ${error.message}`);
  }
}

bootstrap();
