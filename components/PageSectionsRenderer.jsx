function UnknownSectionFallback({ section }) {
  return (
    <section className="section section-alt">
      <div className="container">
        <p className="eyebrow">Missing section type</p>
        <h2>{section.type || "unknown"}</h2>
        <p>
          Add a component mapping for section id <code>{section.id || "n/a"}</code>.
        </p>
      </div>
    </section>
  );
}

function PageSectionsRenderer({ sections }) {
  const map = {
    hero: (section) => <window.HeroSection {...section.props} />,
    landing: (section) => <window.LandingSections {...section.props} />,
    "booking-form": (section) => <window.BookingLeadSection {...section.props} />,
  };

  if (!Array.isArray(sections) || sections.length === 0) {
    return null;
  }

  return sections.map((section) => {
    const renderFn = map[section.type];
    if (!renderFn) {
      return <UnknownSectionFallback key={section.id || section.type} section={section} />;
    }
    return <React.Fragment key={section.id || section.type}>{renderFn(section)}</React.Fragment>;
  });
}

window.PageSectionsRenderer = PageSectionsRenderer;
