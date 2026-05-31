const HERO_DEFAULTS = {
  eyebrow: "For Salon Owners . EUR25k-EUR60k/month",
  title:
    'From an "I-do-everything-myself" salon to a structured, profitable business in 3-6 months.',
  subtitle:
    "For salon owners who want more profit, less chair time, and a team that runs without them.",
  bullets: [
    "+10-30% more profit with clear numbers",
    "5-15 fewer hours per week in operations",
    "A team that works independently",
    "Structured systems instead of chaos",
  ],
  ctaLabel: "Book Free Salon Audit",
  ctaHref: "#booking",
  ctaMeta: "30-45 min via Zoom . Limited to qualified salon owners",
  trustLine: "120+ salon owners transformed",
  imageUrl: "https://www.figma.com/api/mcp/asset/77b88947-e6c7-41a2-8da4-18d1af4d8a86",
  imageAlt: "Veronica portrait",
  featuredInLabel: "Featured in",
  featuredInValue: "Vogue Business",
  statValue: "+27%",
  statText: "Average profit increase within 6 months",
  logos: [
    "VOGUE BUSINESS",
    "SALON TODAY",
    "ESTETICA",
    "MODERN SALON",
    "BUSINESS OF BEAUTY",
    "VOGUE BUSINESS",
  ],
};

function HeroSection(props) {
  const data = { ...HERO_DEFAULTS, ...(props || {}) };
  const titleParts = String(data.title || "").split('"I-do-everything-myself"');
  return (
    <section className="hero-section">
      <div className="container hero-grid">
        <div className="hero-copy">
          <p className="eyebrow with-line">{data.eyebrow}</p>
          <h1 className="hero-title">
            {titleParts.length > 1 ? (
              <>
                {titleParts[0]}
                <em>"I-do-everything-myself"</em>
                {titleParts.slice(1).join('"I-do-everything-myself"')}
              </>
            ) : (
              data.title
            )}
          </h1>
          <p className="hero-subtitle">{data.subtitle}</p>

          <ul className="check-list">
            {(Array.isArray(data.bullets) ? data.bullets : []).map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>

          <div className="hero-cta-row">
            <a href={data.ctaHref} className="btn">
              {data.ctaLabel}
            </a>
            <p>{data.ctaMeta}</p>
          </div>

          <p className="trust-line">{data.trustLine}</p>
        </div>

        <div className="hero-media">
          <img src={data.imageUrl} alt={data.imageAlt} />
          <div className="media-pill">
            <p className="accent">{data.featuredInLabel}</p>
            <p>{data.featuredInValue}</p>
          </div>
          <div className="media-stat">
            <p className="stat-value">{data.statValue}</p>
            <p>{data.statText}</p>
          </div>
        </div>
      </div>

      <div className="logo-strip">
        <div className="logos-marquee" aria-label="Featured publications">
          <div className="logos-track">
            {(Array.isArray(data.logos) ? data.logos : []).map((logo, index) => (
              <span key={`a-${logo}-${index}`}>{logo}</span>
            ))}
          </div>
          <div className="logos-track" aria-hidden="true">
            {(Array.isArray(data.logos) ? data.logos : []).map((logo, index) => (
              <span key={`b-${logo}-${index}`}>{logo}</span>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

window.HeroSection = HeroSection;
