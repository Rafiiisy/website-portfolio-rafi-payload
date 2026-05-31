(() => {
  const DEFAULT_STRAPI_URL = "http://localhost:1337";
  const SECTION_UID_TO_TYPE = {
    "sections.hero": "hero",
    "sections.landing": "landing",
    "sections.booking-form": "booking-form",
    "sections.bookingForm": "booking-form",
  };

  const FALLBACK_PAGES = {
    home: {
      id: "page-home",
      title: "Home",
      slug: "home",
      seo: {
        title: "Salon Mastery - Home",
        description: "Salon Mastery homepage",
      },
      sections: [
        { id: "hero-home", type: "hero", props: {} },
        { id: "landing-home", type: "landing", props: {} },
      ],
    },
    booking: {
      id: "page-booking",
      title: "Booking",
      slug: "booking",
      seo: {
        title: "Salon Mastery - Booking",
        description: "Book your free salon audit",
      },
      sections: [{ id: "booking-form-main", type: "booking-form", props: {} }],
    },
  };

  function resolveStrapiUrl() {
    const configured = window.__STRAPI_URL__ || localStorage.getItem("STRAPI_URL");
    return String(configured || DEFAULT_STRAPI_URL).replace(/\/$/, "");
  }

  function toSectionType(uid) {
    const value = String(uid || "").trim();
    if (!value) return "unknown";
    if (SECTION_UID_TO_TYPE[value]) return SECTION_UID_TO_TYPE[value];
    return value.includes(".") ? value.split(".").at(-1) : value;
  }

  function buildPagesQuery(slugs) {
    const params = new URLSearchParams();
    const safeSlugs = Array.isArray(slugs) ? slugs.filter(Boolean) : [];
    safeSlugs.forEach((slug, index) => {
      params.set(`filters[slug][$in][${index}]`, slug);
    });
    params.set("populate[seo]", "true");
    params.set("populate[sections][populate]", "*");
    params.set("publicationState", "live");
    return params.toString();
  }

  function normalizeSection(item, index) {
    const source = item && typeof item === "object" ? item : {};
    const type = toSectionType(source.__component);
    const sectionId = source.id ? String(source.id) : `${type}-${index}`;
    const props = {};

    Object.keys(source).forEach((key) => {
      if (
        key === "id" ||
        key === "__component" ||
        key === "createdAt" ||
        key === "updatedAt" ||
        key === "publishedAt" ||
        key === "locale"
      ) {
        return;
      }
      props[key] = source[key];
    });

    return { id: sectionId, type, props };
  }

  function normalizePageEntry(entry) {
    if (!entry || typeof entry !== "object") return null;
    const source = entry.attributes && typeof entry.attributes === "object" ? entry.attributes : entry;
    const seo = source.seo && typeof source.seo === "object" ? source.seo : {};
    const sections = Array.isArray(source.sections) ? source.sections : [];
    const slug = String(source.slug || "");

    return {
      id: String(source.id || entry.documentId || entry.id || `page-${slug}`),
      title: String(source.title || ""),
      slug,
      seo: {
        title: String(seo.title || source.title || ""),
        description: String(seo.description || ""),
      },
      sections: sections.map(normalizeSection),
    };
  }

  async function fetchPagesFromStrapi(slugs) {
    const baseUrl = resolveStrapiUrl();
    const query = buildPagesQuery(slugs);
    const response = await fetch(`${baseUrl}/api/pages?${query}`);
    if (!response.ok) {
      const body = await response.text();
      throw new Error(`Strapi request failed ${response.status}: ${body}`);
    }
    const payload = await response.json();
    const entries = Array.isArray(payload?.data) ? payload.data : [];
    const normalized = entries.map(normalizePageEntry).filter(Boolean);

    if (!normalized.length) {
      throw new Error("No Strapi pages returned for requested slugs.");
    }
    return normalized;
  }

  window.SALON_MASTERY_FALLBACK_PAGES = FALLBACK_PAGES;
  window.fetchPagesFromStrapi = fetchPagesFromStrapi;
})();
