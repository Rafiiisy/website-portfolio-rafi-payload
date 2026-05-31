const { createRoot } = ReactDOM;

function getRoute() {
  const hash = window.location.hash;
  if (hash.startsWith("#booking")) return "booking";
  if (hash.startsWith("#gallery")) return "gallery";
  if (hash.startsWith("#blog/")) return `blog-post:${hash.replace(/^#blog\/?/, "")}`;
  if (hash.startsWith("#blog")) return "blog";
  return "home";
}

function getPayloadBaseUrl() {
  if (window.__USE_PAYLOAD_CMS__ === false) {
    return "";
  }
  const fromWindow = window.__PAYLOAD_PUBLIC_URL__;
  if (typeof fromWindow === "string" && fromWindow.trim()) {
    return fromWindow.replace(/\/$/, "");
  }
  const fromStorage = localStorage.getItem("PAYLOAD_PUBLIC_URL");
  if (fromStorage && fromStorage.trim()) {
    return fromStorage.replace(/\/$/, "");
  }
  return "http://localhost:3000";
}

function App() {
  const [route, setRoute] = React.useState(getRoute());
  const [pagesBySlug, setPagesBySlug] = React.useState({});

  React.useEffect(() => {
    function handleHashChange() {
      setRoute(getRoute());
    }

    window.addEventListener("hashchange", handleHashChange);
    return () => window.removeEventListener("hashchange", handleHashChange);
  }, []);

  React.useEffect(() => {
    let ignore = false;

    async function loadPages() {
      const fallback = window.SALON_MASTERY_FALLBACK_PAGES || {};
      const payloadBase = getPayloadBaseUrl();

      if (payloadBase && typeof window.fetchSalonPagesFromPayload === "function") {
        try {
          const bySlug = await window.fetchSalonPagesFromPayload({
            payloadBaseUrl: payloadBase,
            slugs: ["home", "booking"],
          });
          const hasPayload =
            (bySlug.home && Array.isArray(bySlug.home.sections) && bySlug.home.sections.length) ||
            (bySlug.booking &&
              Array.isArray(bySlug.booking.sections) &&
              bySlug.booking.sections.length);
          if (hasPayload && !ignore) {
            setPagesBySlug({
              home: bySlug.home || fallback.home,
              booking: bySlug.booking || fallback.booking,
            });
            return;
          }
        } catch (error) {
          console.warn("Salon: Payload CMS fetch failed, trying Strapi.", error);
        }
      }

      try {
        const docs = await window.fetchPagesFromStrapi(["home", "booking"]);
        if (!ignore) {
          const map = {};
          docs.forEach((doc) => {
            map[doc.slug] = doc;
          });
          setPagesBySlug(map);
        }
      } catch (error) {
        console.error("Failed to load pages from Strapi. Using fallback pages.", error);
        if (!ignore) {
          setPagesBySlug(fallback);
        }
      }
    }

    loadPages();
    return () => {
      ignore = true;
    };
  }, []);

  React.useEffect(() => {
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      return undefined;
    }

    const targets = document.querySelectorAll(
      "main section, .pain-card, .outcome-card, .method-step, .case-study, .faq li, .booking-form, .content-card"
    );
    if (!targets.length) {
      return undefined;
    }

    targets.forEach((element) => element.classList.add("reveal-ready"));

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        root: null,
        threshold: 0.14,
        rootMargin: "0px 0px -8% 0px",
      }
    );

    targets.forEach((element, index) => {
      element.style.setProperty("--reveal-delay", `${index * 24}ms`);
      observer.observe(element);
    });

    return () => observer.disconnect();
  }, [route]);

  if (route === "booking") {
    return <window.BookingPage page={pagesBySlug.booking} />;
  }
  if (route === "gallery") {
    return <window.GalleryPage />;
  }
  if (route === "blog") {
    return <window.BlogPage />;
  }
  if (route.startsWith("blog-post:")) {
    return <window.BlogPostPage />;
  }
  return <window.HomePage page={pagesBySlug.home} />;
}

const root = createRoot(document.getElementById("root"));
root.render(<App />);
