const state = {
  site: { brand: "", nav: [], footer: { text: "", links: [] } },
  pages: [],
  currentPageId: "",
};

const els = {
  siteFileInput: document.getElementById("siteFileInput"),
  pagesFileInput: document.getElementById("pagesFileInput"),
  siteBrand: document.getElementById("siteBrand"),
  siteFooterText: document.getElementById("siteFooterText"),
  exportSiteBtn: document.getElementById("exportSiteBtn"),
  pageSelect: document.getElementById("pageSelect"),
  addPageBtn: document.getElementById("addPageBtn"),
  deletePageBtn: document.getElementById("deletePageBtn"),
  pageTitle: document.getElementById("pageTitle"),
  pageSlug: document.getElementById("pageSlug"),
  seoTitle: document.getElementById("seoTitle"),
  seoDescription: document.getElementById("seoDescription"),
  sectionsJson: document.getElementById("sectionsJson"),
  validateBtn: document.getElementById("validateBtn"),
  exportPageBtn: document.getElementById("exportPageBtn"),
  status: document.getElementById("status"),
};

function setStatus(text) {
  els.status.textContent = text;
}

function downloadJson(filename, data) {
  const blob = new Blob([JSON.stringify(data, null, 2)], { type: "application/json" });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

function findCurrentPage() {
  return state.pages.find((p) => p.id === state.currentPageId);
}

function pageErrors(page) {
  const errors = [];
  if (!page.id) errors.push("Missing id");
  if (!page.title) errors.push("Missing title");
  if (!page.slug) errors.push("Missing slug");
  if (!page.seo?.title) errors.push("Missing seo.title");
  if (!page.seo?.description) errors.push("Missing seo.description");
  if (!Array.isArray(page.sections)) errors.push("sections must be an array");
  return errors;
}

function renderSite() {
  els.siteBrand.value = state.site.brand ?? "";
  els.siteFooterText.value = state.site.footer?.text ?? "";
}

function renderPageOptions() {
  els.pageSelect.innerHTML = "";
  state.pages.forEach((page) => {
    const option = document.createElement("option");
    option.value = page.id;
    option.textContent = `${page.title || "Untitled"} (${page.slug || "no-slug"})`;
    els.pageSelect.appendChild(option);
  });
  if (!state.currentPageId && state.pages.length > 0) state.currentPageId = state.pages[0].id;
  els.pageSelect.value = state.currentPageId;
}

function renderCurrentPage() {
  const page = findCurrentPage();
  if (!page) {
    els.pageTitle.value = "";
    els.pageSlug.value = "";
    els.seoTitle.value = "";
    els.seoDescription.value = "";
    els.sectionsJson.value = "[]";
    return;
  }
  els.pageTitle.value = page.title ?? "";
  els.pageSlug.value = page.slug ?? "";
  els.seoTitle.value = page.seo?.title ?? "";
  els.seoDescription.value = page.seo?.description ?? "";
  els.sectionsJson.value = JSON.stringify(page.sections ?? [], null, 2);
}

function syncCurrentPageFromInputs() {
  const page = findCurrentPage();
  if (!page) return;
  page.title = els.pageTitle.value.trim();
  page.slug = els.pageSlug.value.trim();
  page.seo = {
    title: els.seoTitle.value.trim(),
    description: els.seoDescription.value.trim(),
  };
  try {
    page.sections = JSON.parse(els.sectionsJson.value || "[]");
  } catch {
    // Keep old sections until validation.
  }
}

function createNewPage(title, slug) {
  const normalizedSlug = slug.toLowerCase().replace(/[^a-z0-9-]/g, "-");
  if (state.pages.some((p) => p.slug === normalizedSlug)) {
    throw new Error(`Slug already exists: ${normalizedSlug}`);
  }
  return {
    id: `page-${normalizedSlug}`,
    title,
    slug: normalizedSlug,
    seo: { title, description: `${title} page description` },
    sections: [],
  };
}

async function readJsonFromFile(file) {
  const text = await file.text();
  return JSON.parse(text);
}

els.siteFileInput.addEventListener("change", async (event) => {
  const file = event.target.files?.[0];
  if (!file) return;
  state.site = await readJsonFromFile(file);
  renderSite();
  setStatus(`Loaded site: ${file.name}`);
});

els.pagesFileInput.addEventListener("change", async (event) => {
  const files = Array.from(event.target.files ?? []);
  const pages = [];
  for (const file of files) {
    pages.push(await readJsonFromFile(file));
  }
  state.pages = pages;
  state.currentPageId = pages[0]?.id ?? "";
  renderPageOptions();
  renderCurrentPage();
  setStatus(`Loaded ${pages.length} page file(s).`);
});

els.pageSelect.addEventListener("change", () => {
  syncCurrentPageFromInputs();
  state.currentPageId = els.pageSelect.value;
  renderCurrentPage();
});

["input", "change"].forEach((eventName) => {
  [els.pageTitle, els.pageSlug, els.seoTitle, els.seoDescription, els.sectionsJson].forEach((el) => {
    el.addEventListener(eventName, () => {
      syncCurrentPageFromInputs();
      renderPageOptions();
    });
  });
});

els.siteBrand.addEventListener("input", () => {
  state.site.brand = els.siteBrand.value;
});

els.siteFooterText.addEventListener("input", () => {
  state.site.footer = state.site.footer || { text: "", links: [] };
  state.site.footer.text = els.siteFooterText.value;
});

els.addPageBtn.addEventListener("click", () => {
  const title = window.prompt("Page title?", "New Page");
  if (!title) return;
  const slug = window.prompt("Page slug?", title.toLowerCase().replace(/\s+/g, "-"));
  if (!slug) return;
  try {
    const page = createNewPage(title, slug);
    state.pages.push(page);
    state.currentPageId = page.id;
    renderPageOptions();
    renderCurrentPage();
    setStatus(`Added page: ${page.slug}`);
  } catch (error) {
    setStatus(`Cannot add page: ${error.message}`);
  }
});

els.deletePageBtn.addEventListener("click", () => {
  const page = findCurrentPage();
  if (!page) return;
  if (!window.confirm(`Delete page "${page.title}"?`)) return;
  state.pages = state.pages.filter((p) => p.id !== page.id);
  state.currentPageId = state.pages[0]?.id ?? "";
  renderPageOptions();
  renderCurrentPage();
  setStatus(`Deleted page: ${page.slug}`);
});

els.validateBtn.addEventListener("click", () => {
  syncCurrentPageFromInputs();
  const errors = [];
  if (!state.site.brand) errors.push("Site: missing brand");
  if (!state.site.footer?.text) errors.push("Site: missing footer.text");
  state.pages.forEach((page) => {
    const pageErrs = pageErrors(page);
    pageErrs.forEach((err) => errors.push(`Page ${page.slug || page.id}: ${err}`));
  });
  setStatus(errors.length ? errors.join("\n") : "Validation passed.");
});

els.exportSiteBtn.addEventListener("click", () => {
  downloadJson("site.json", state.site);
  setStatus("Exported site.json");
});

els.exportPageBtn.addEventListener("click", () => {
  syncCurrentPageFromInputs();
  const page = findCurrentPage();
  if (!page) {
    setStatus("No page selected.");
    return;
  }
  downloadJson(`${page.slug}.json`, page);
  setStatus(`Exported ${page.slug}.json`);
});

renderSite();
renderPageOptions();
renderCurrentPage();
setStatus("Ready. Load site and page files to begin.");
