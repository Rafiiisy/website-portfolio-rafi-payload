function SiteHeader() {
  const links = [
    { href: "#results", label: "Results" },
    { href: "#process", label: "Process" },
    { href: "#gallery", label: "Gallery" },
    { href: "#blog", label: "Blog" },
    { href: "#about", label: "About" },
  ];

  return (
    <header className="site-header">
      <div className="container header-inner">
        <a href="#" className="brand">
          Veronica.
        </a>
        <nav className="header-nav" aria-label="Primary">
          {links.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>
        <a className="btn btn-small" href="#booking">
          Book Free Salon Audit
        </a>
      </div>
    </header>
  );
}

window.SiteHeader = SiteHeader;
