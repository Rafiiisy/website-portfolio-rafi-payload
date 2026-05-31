(() => {
  const DEFAULT_PAYLOAD_URL = "http://localhost:3000";
  const DEFAULT_COLLECTION = "salon-pages";

  function resolvePayloadUrl() {
    const configured =
      window.__PAYLOAD_PUBLIC_URL__ || localStorage.getItem("PAYLOAD_PUBLIC_URL");
    return String(configured || DEFAULT_PAYLOAD_URL).replace(/\/$/, "");
  }

  function resolveCollection() {
    const c = window.__PAYLOAD_SALON_COLLECTION__ || localStorage.getItem("PAYLOAD_SALON_COLLECTION");
    return String(c || DEFAULT_COLLECTION).replace(/^\//, "");
  }

  function normalizeHeroProps(props) {
    if (!props || typeof props !== "object") return {};
    const p = { ...props };
    if (p.heading != null && p.title == null) p.title = p.heading;
    if (p.ctaHint != null && p.ctaMeta == null) p.ctaMeta = p.ctaHint;
    if (p.featuredLabel != null && p.featuredInLabel == null) p.featuredInLabel = p.featuredLabel;
    if (p.featuredValue != null && p.featuredInValue == null) p.featuredInValue = p.featuredValue;
    if (p.statCopy != null && p.statText == null) p.statText = p.statCopy;
    return p;
  }

  function normalizeBookingProps(props) {
    if (!props || typeof props !== "object") return {};
    const p = { ...props };
    if (p.heading != null && p.title == null) p.title = p.heading;
    if (Array.isArray(p.bullets) && !p.points) p.points = p.bullets;
    if (p.submitLabel != null && p.buttonLabel == null) p.buttonLabel = p.submitLabel;
    if (p.submitHint != null && p.responseMeta == null) p.responseMeta = p.submitHint;
    return p;
  }

  function normalizeLandingProps(props) {
    if (!props || typeof props !== "object") return {};
    const p = { ...props };
    if (p.caseStudy && typeof p.caseStudy === "object") {
      if (p.caseStudy.imageUrl && !p.caseImageUrl) p.caseImageUrl = p.caseStudy.imageUrl;
      if (p.caseStudy.imageAlt && !p.caseImageAlt) p.caseImageAlt = p.caseStudy.imageAlt;
    }
    return p;
  }

  function normalizeSection(section, index) {
    const raw = section && typeof section === "object" ? section : {};
    const typeRaw = String(raw.type || "").trim();
    const propsIn = raw.props && typeof raw.props === "object" ? raw.props : {};

    let props = { ...propsIn };
    if (typeRaw === "hero") props = normalizeHeroProps(props);
    else if (typeRaw === "landing") props = normalizeLandingProps(props);
    else if (typeRaw === "booking-form") props = normalizeBookingProps(props);

    const id = raw.id ? String(raw.id) : `${typeRaw || "section"}-${index}`;
    return { id, type: typeRaw, props };
  }

  function parseSectionsField(raw) {
    if (Array.isArray(raw)) return raw;
    if (typeof raw === "string" && raw.trim()) {
      try {
        const parsed = JSON.parse(raw);
        return Array.isArray(parsed) ? parsed : [];
      } catch {
        return [];
      }
    }
    return [];
  }

  function normalizeSalonPageDoc(doc) {
    if (!doc || typeof doc !== "object") return null;
    const seo = doc.seo && typeof doc.seo === "object" ? doc.seo : {};
    const sectionsRaw = parseSectionsField(doc.sections);

    return {
      id: doc.id != null ? String(doc.id) : `page-${doc.slug || ""}`,
      title: String(doc.title || ""),
      slug: String(doc.slug || ""),
      seo: {
        title: String(seo.title || doc.title || ""),
        description: String(seo.description || ""),
      },
      sections: sectionsRaw.map(normalizeSection),
    };
  }

  /**
   * @param {object} options
   * @param {string} [options.payloadBaseUrl]
   * @param {string} [options.collection]
   * @param {string[]} options.slugs
   * @param {string} [options.authToken] Optional JWT for draft/private docs later
   * @returns {Promise<Record<string, object>>}
   */
  function useSameOriginPayloadProxy() {
    if (typeof window === "undefined") return false;
    if (window.__PAYLOAD_USE_DEV_PROXY__ === false) return false;
    if (window.__PAYLOAD_USE_DEV_PROXY__ === true) return true;
    const port = String(window.location.port || "");
    return port === "4173";
  }

  async function fetchSalonPagesFromPayload(options) {
    const configuredBase = String(options.payloadBaseUrl || resolvePayloadUrl()).replace(/\/$/, "");
    const collection = options.collection || resolveCollection();
    const slugs = Array.isArray(options.slugs) ? options.slugs.filter(Boolean) : [];
    const authToken = options.authToken || "";

    if (!slugs.length) return {};

    const headers = { Accept: "application/json" };
    if (authToken) {
      headers.Authorization = authToken.startsWith("JWT ") ? authToken : `JWT ${authToken}`;
    }

    const pagesBySlug = {};
    const useProxy = useSameOriginPayloadProxy();
    const requestBase = useProxy
      ? `${window.location.origin.replace(/\/$/, "")}/__payload`
      : configuredBase;

    for (const slug of slugs) {
      const params = new URLSearchParams({
        "where[slug][equals]": slug,
        limit: "1",
        depth: "0",
      });
      const response = await fetch(`${requestBase}/api/${collection}?${params}`, {
        headers,
        cache: "no-store",
      });
      if (!response.ok) {
        throw new Error(`Payload ${collection} fetch failed for ${slug}: ${response.status}`);
      }
      const body = await response.json();
      const doc = body?.docs?.[0];
      if (doc) {
        const normalized = normalizeSalonPageDoc(doc);
        if (normalized?.slug) pagesBySlug[normalized.slug] = normalized;
      }
    }

    return pagesBySlug;
  }

  window.fetchSalonPagesFromPayload = fetchSalonPagesFromPayload;
  window.normalizeSalonPageDoc = normalizeSalonPageDoc;
})();
