import { MediaImage, getMediaUrl } from "@/components/media/media-image";
import { PortfolioProjectsSection } from "@/components/portfolio/projects-section";
import {
  GradientText,
  Icon,
  TagRow,
  mapTags,
} from "@/components/portfolio/ui";

type LinkItem = { label?: string | null; href?: string | null; icon?: string | null };

type HeroData = {
  sectionID?: string | null;
  portrait?: unknown;
  role?: string | null;
  location?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  tagline?: string | null;
  taglineSub?: string | null;
  connectLabel?: string | null;
  scrollLabel?: string | null;
  social?: LinkItem[] | null;
};

export function PortfolioHeroSection({ data }: { data: HeroData }) {
  const portrait = data.portrait;
  const alt = `${data.firstName || ""} ${data.lastName || ""} — ${data.role || ""}`.trim();

  return (
    <section className="hero" id={data.sectionID || "top"}>
      <div className="hero__media">
        {getMediaUrl(portrait as Parameters<typeof getMediaUrl>[0]) ? (
          <MediaImage media={portrait as Parameters<typeof MediaImage>[0]["media"]} alt={alt} loading="eager" />
        ) : null}
      </div>
      <div className="hero__gradient-main" />
      <div className="hero__gradient-tint" />

      <div className="hero__meta">
        <span className="hero__meta-item">{`// ${data.role || ""}`}</span>
        <span className="hero__meta-item">{data.location}</span>
      </div>

      <div className="hero__content">
        <h1 className="hero__name">
          <span className="hero__name-line">{data.firstName}</span>
          <span className="hero__name-line hero__name-line--accent">
            <GradientText>{data.lastName}</GradientText>
          </span>
        </h1>

        <div className="hero__footer">
          <div className="hero__social">
            <span className="hero__connect-label">{data.connectLabel}</span>
            {(data.social || []).map((link) => (
              <a key={link.label} href={link.href || "#"} className="hero__social-link">
                <Icon name={String(link.icon || "linkedin")} size={14} />
                {link.label}
              </a>
            ))}
            <div className="hero__scroll">
              <span className="hero__scroll-dot" />
              <span className="hero__scroll-text">{data.scrollLabel}</span>
              <span className="hero__scroll-arrow">
                <Icon name="arrowDown" size={14} />
              </span>
            </div>
          </div>

          <div className="hero__tagline">
            <p className="hero__tagline-accent">{data.tagline}</p>
            <p className="hero__tagline-sub">{data.taglineSub}</p>
          </div>
        </div>
      </div>
    </section>
  );
}

type StackData = {
  sectionID?: string | null;
  title?: string | null;
  titleAccent?: string | null;
  subtitle?: string | null;
  categories?: Array<{
    title?: string | null;
    icon?: string | null;
    tags?: Array<{ label?: string | null } | null> | null;
  } | null> | null;
};

export function PortfolioStackSection({ data }: { data: StackData }) {
  return (
    <section className="stack" id={data.sectionID || "skills"}>
      <div className="container">
        <header className="stack__header">
          <h2 className="section-heading section-heading--sm">
            {data.title} <GradientText>{data.titleAccent}</GradientText>
          </h2>
          <p className="section-subtitle">{data.subtitle}</p>
        </header>

        <div className="stack__grid">
          {(data.categories || []).map((cat) => (
            <article key={cat?.title} className="skill-card">
              <div className="skill-card__icon">
                <Icon name={String(cat?.icon || "brain")} size={24} />
              </div>
              <h3 className="skill-card__title">{cat?.title}</h3>
              <TagRow tags={mapTags(cat?.tags)} />
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type TestimonialsData = {
  sectionID?: string | null;
  title?: string | null;
  titleAccent?: string | null;
  items?: Array<{ quote?: string | null; name?: string | null; role?: string | null } | null> | null;
};

export function PortfolioTestimonialsSection({ data }: { data: TestimonialsData }) {
  return (
    <section className="testimonials" id={data.sectionID || "testimonials"}>
      <div className="container">
        <header className="testimonials__header">
          <h2 className="section-heading section-heading--sm">
            {data.title} <GradientText>{data.titleAccent}</GradientText>
          </h2>
        </header>

        <div className="testimonials__grid">
          {(data.items || []).map((item) => (
            <article key={item?.name} className="testimonial-card">
              <div className="testimonial-card__glow" />
              <div className="testimonial-card__quote-icon">
                <Icon name="quote" size={32} />
              </div>
              <p className="testimonial-card__text">{item?.quote}</p>
              <div className="testimonial-card__author">
                <p className="testimonial-card__name">{item?.name}</p>
                <p className="testimonial-card__role">{item?.role}</p>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}

type ContactData = {
  sectionID?: string | null;
  badge?: string | null;
  title?: string | null;
  titleAccent?: string | null;
  subtitle?: string | null;
  cta?: string | null;
  ctaHref?: string | null;
  copyright?: string | null;
  links?: LinkItem[] | null;
};

export function PortfolioContactSection({ data }: { data: ContactData }) {
  return (
    <section className="contact" id={data.sectionID || "contact"}>
      <div className="contact__grid-bg" />
      <div className="contact__glow" />

      <div className="container">
        <div className="contact__card">
          <div className="contact__badge">
            <span className="contact__badge-dot" />
            <span className="contact__badge-text">{data.badge}</span>
          </div>

          <h2 className="contact__title">
            {data.title}
            <br />
            that create <GradientText>{data.titleAccent}</GradientText>
          </h2>

          <p className="contact__subtitle">{data.subtitle}</p>

          <a href={data.ctaHref || "#"} className="contact__cta">
            <Icon name="mail" size={20} />
            {data.cta}
          </a>

          <div className="contact__links">
            {(data.links || []).map((link) => (
              <a key={link.label} href={link.href || "#"} className="contact__link">
                <Icon name={String(link.icon || "mail")} size={16} />
                {link.label}
                <span className="contact__link-arrow">
                  <Icon name="external" size={14} />
                </span>
              </a>
            ))}
          </div>
        </div>

        <p className="contact__copyright">{data.copyright}</p>
      </div>
    </section>
  );
}
