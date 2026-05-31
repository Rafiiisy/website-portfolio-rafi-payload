const LANDING_DEFAULTS = {
  caseImageUrl: "https://www.figma.com/api/mcp/asset/27704beb-e078-4b1b-8707-26fc9ab04eda",
  painPoints: [
    {
      id: "01",
      title: "Everything depends on you",
      body: "You are the operator, marketer, trainer, and closer. The salon does not run, you run it.",
    },
    {
      id: "02",
      title: "No clarity on numbers",
      body: "Revenue moves through the salon, but margins and profit per service stay foggy.",
    },
    {
      id: "03",
      title: "Your team waits for direction",
      body: "Capable people hover until you tell them what to do next.",
    },
    {
      id: "04",
      title: "Revenue is up, profit feels unclear",
      body: "Months look strong on paper, but effort and final profit do not match.",
    },
    {
      id: "05",
      title: "Always busy, rarely building",
      body: "Days disappear into appointments, fires, and admin.",
    },
    {
      id: "06",
      title: "The business cannot run without you",
      body: "A real holiday feels impossible and critical decisions loop back to you.",
    },
  ],
  outcomes: [
    "More profit",
    "Less chair time",
    "Independent team",
    "Clear systems",
    "Better decisions",
    "Business freedom",
  ],
  methodSteps: [
    {
      id: "01",
      title: "Clarity over numbers",
      body: "Create a clear picture of revenue, costs, profit, and where the salon is leaking money.",
    },
    {
      id: "02",
      title: "Pricing and profit structure",
      body: "Adjust pricing, service structure, and profitability so the business becomes healthier.",
    },
    {
      id: "03",
      title: "Salon structure",
      body: "Build clear roles, responsibilities, and systems so everything no longer depends on the owner.",
    },
    {
      id: "04",
      title: "Digital back office",
      body: "Organize the salon's operations with simple digital tools and workflows.",
    },
    {
      id: "05",
      title: "Team ownership",
      body: "Train the team to think, act, and take responsibility without waiting for direction.",
    },
    {
      id: "06",
      title: "Real implementation",
      body: "Apply the system step by step inside the salon, not only in theory.",
    },
  ],
  faqs: [
    "How long does it take?",
    "Does this work for small teams?",
    "How much time do I need?",
    "Is this coaching or done-for-you?",
    "What happens during the Free Salon Audit?",
    "Do I need to have clear numbers already?",
    "What if my salon is profitable but still depends on me?",
  ],
};

const DEF = {
  resultsEyebrow: "Where most salons get stuck",
  resultsHeadingPrefix: "This is what is ",
  resultsHeadingEmphasis: "holding you back.",
  resultsQuote:
    "You are generating revenue, but your salon depends entirely on you.",
  methodEyebrow: "The Method",
  methodHeadingTop: "You do not need more information.",
  methodHeadingBottom: "You need a system.",
  outcomesEyebrow: "The Outcome",
  outcomesHeading: "What changes inside your salon.",
  outcomeBody:
    "Structured strategy and ownership create durable results for owners and teams.",
  outcomesCtaLabel: "Book Free Salon Audit",
  outcomesCtaHref: "#booking",
  caseStudiesEyebrow: "Case Studies",
  caseStudiesHeadingPrefix: "Salons rebuilt from the ",
  caseStudiesHeadingEmphasis: "inside out.",
  caseTag: "+31% PROFIT",
  caseTitle: "Maison Lior, Antwerp",
  caseBody:
    "Before: 55+ owner hours/week and unclear margins. After: clearer pricing and ownership with stronger profit.",
  caseQuote: "I finally know my numbers and my team finally knows their job.",
  aboutEyebrow: "About Veronica",
  aboutHeading: "I know your salon reality, because I lived it.",
  aboutCopy:
    "For more than ten years, Veronica owned and operated a salon and rebuilt it around clarity, ownership, and systems.",
  ctaEyebrow: "Your next move",
  ctaHeading: "You can keep going like this - or fix it now.",
  ctaBody:
    "The Free Salon Audit clarifies what is blocking your salon's profit, structure, and freedom.",
  ctaLabel: "Book Free Salon Audit",
  ctaHref: "#booking",
  faqEyebrow: "FAQ",
  faqHeading: "Questions, answered.",
};

const DEFAULT_ABOUT_STATS = [
  { value: "10+", label: "Years owning" },
  { value: "120+", label: "Salons advised" },
  { value: "EUR4M+", label: "Profit unlocked" },
];

function LandingSections(props) {
  const data = { ...LANDING_DEFAULTS, ...(props || {}) };
  const cs = data.caseStudy && typeof data.caseStudy === "object" ? data.caseStudy : {};
  const caseImgSrc = data.caseImageUrl || cs.imageUrl || LANDING_DEFAULTS.caseImageUrl;
  const caseImgAlt = data.caseImageAlt || cs.imageAlt || "Case study salon interior";
  const aboutStats =
    Array.isArray(data.aboutStats) && data.aboutStats.length > 0 ? data.aboutStats : DEFAULT_ABOUT_STATS;

  function handleCtaLightMove(event) {
    const rect = event.currentTarget.getBoundingClientRect();
    const x = event.clientX - rect.left;
    const y = event.clientY - rect.top;

    event.currentTarget.style.setProperty("--light-x", `${x}px`);
    event.currentTarget.style.setProperty("--light-y", `${y}px`);
    event.currentTarget.style.setProperty("--light-opacity", "1");
  }

  function handleCtaLightLeave(event) {
    event.currentTarget.style.setProperty("--light-x", "-9999px");
    event.currentTarget.style.setProperty("--light-y", "-9999px");
    event.currentTarget.style.setProperty("--light-opacity", "0");
  }

  const resultsQuote = (data.resultsQuote || DEF.resultsQuote).replace(/^["']|["']$/g, "");

  return (
    <>
      <section className="section section-alt" id="results">
        <div className="container">
          <p className="eyebrow">{data.resultsEyebrow || DEF.resultsEyebrow}</p>
          <h2>
            {data.resultsHeadingPrefix || DEF.resultsHeadingPrefix}
            <em>{data.resultsHeadingEmphasis || DEF.resultsHeadingEmphasis}</em>
          </h2>
          <div className="pain-grid">
            {(Array.isArray(data.painPoints) ? data.painPoints : []).map((point) => (
              <article key={point.id} className="pain-card">
                <p className="eyebrow accent-eyebrow">{point.id}</p>
                <h3>{point.title}</h3>
                <p>{point.body}</p>
              </article>
            ))}
          </div>
          <blockquote className="short-quote">&ldquo;{resultsQuote}&rdquo;</blockquote>
        </div>
      </section>

      <section className="section section-method" id="process">
        <div className="container">
          <p className="eyebrow">{data.methodEyebrow || DEF.methodEyebrow}</p>
          <h2 className="method-heading">
            {data.methodHeadingTop || DEF.methodHeadingTop}
            <span>{data.methodHeadingBottom || DEF.methodHeadingBottom}</span>
          </h2>
          <div className="method-list">
            {(Array.isArray(data.methodSteps) ? data.methodSteps : []).map((step, index) => (
              <article
                key={step.id}
                className={`method-step ${index % 2 ? "method-step-right" : ""}`}
              >
                <p className="method-step-id">Step {step.id}</p>
                <h3>{step.title}</h3>
                <p>{step.body}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="section" id="outcomes">
        <div className="container">
          <p className="eyebrow">{data.outcomesEyebrow || DEF.outcomesEyebrow}</p>
          <h2>{data.outcomesHeading || DEF.outcomesHeading}</h2>
          <div className="outcome-grid">
            {(Array.isArray(data.outcomes) ? data.outcomes : []).map((outcome) => (
              <article key={outcome} className="outcome-card">
                <h3>{outcome}</h3>
                <p>{data.outcomeBody || DEF.outcomeBody}</p>
              </article>
            ))}
          </div>
          <a className="btn center-btn" href={data.outcomesCtaHref || DEF.outcomesCtaHref}>
            {data.outcomesCtaLabel || DEF.outcomesCtaLabel}
          </a>
        </div>
      </section>

      <section className="section section-alt" id="case-studies">
        <div className="container">
          <p className="eyebrow">{data.caseStudiesEyebrow || DEF.caseStudiesEyebrow}</p>
          <h2>
            {data.caseStudiesHeadingPrefix || DEF.caseStudiesHeadingPrefix}
            <em>{data.caseStudiesHeadingEmphasis || DEF.caseStudiesHeadingEmphasis}</em>
          </h2>
          <div className="case-study">
            <img src={caseImgSrc} alt={caseImgAlt} />
            <div>
              <p className="tag">{cs.tag || data.caseTag || DEF.caseTag}</p>
              <h3>{cs.title || data.caseTitle || DEF.caseTitle}</h3>
              <p>{cs.body || data.caseBody || DEF.caseBody}</p>
              <blockquote>
                &ldquo;
                {(cs.quote || data.caseQuote || DEF.caseQuote).replace(/^["']|["']$/g, "")}
                &rdquo;
              </blockquote>
            </div>
          </div>
        </div>
      </section>

      <section className="section" id="about">
        <div className="container">
          <p className="eyebrow">{data.aboutEyebrow || DEF.aboutEyebrow}</p>
          <h2>{data.aboutHeading || DEF.aboutHeading}</h2>
          <p className="about-copy">{data.aboutCopy || DEF.aboutCopy}</p>
          <div className="stats">
            {aboutStats.map((row, i) => (
              <div key={row.label || row.value || i}>
                <strong>{row.value}</strong>
                <span>{row.label}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section
        className="section section-cta interactive-light"
        onMouseMove={handleCtaLightMove}
        onMouseLeave={handleCtaLightLeave}
      >
        <div className="container cta-panel">
          <p className="eyebrow">{data.ctaEyebrow || DEF.ctaEyebrow}</p>
          <h2>{data.ctaHeading || DEF.ctaHeading}</h2>
          <p>{data.ctaBody || DEF.ctaBody}</p>
          <a className="btn center-btn" href={data.ctaHref || DEF.ctaHref}>
            {data.ctaLabel || DEF.ctaLabel}
          </a>
        </div>
      </section>

      <section className="section" id="faq">
        <div className="container faq">
          <p className="eyebrow">{data.faqEyebrow || DEF.faqEyebrow}</p>
          <h2>{data.faqHeading || DEF.faqHeading}</h2>
          <ul>
            {(Array.isArray(data.faqs) ? data.faqs : []).map((question) => (
              <li key={question}>{question}</li>
            ))}
          </ul>
        </div>
      </section>
    </>
  );
}

window.LandingSections = LandingSections;
