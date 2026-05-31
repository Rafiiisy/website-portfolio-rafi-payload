"use client";

import { useEffect, useState } from "react";

import { Icon } from "@/components/portfolio/ui";

type NavItem = { sectionId: string; label: string };

type SiteHeaderProps = {
  data: {
    name?: string | null;
    shortName?: string | null;
    nav?: NavItem[] | null;
  };
};

export function SiteHeader({ data }: SiteHeaderProps) {
  const [menuOpen, setMenuOpen] = useState(false);
  const nav = data.nav || [];

  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  const closeMenu = () => setMenuOpen(false);

  return (
    <>
      <nav className="nav" aria-label="Main navigation">
        <div className="nav__inner">
          <a href="#top" className="nav__brand" onClick={closeMenu}>
            <span className="nav__avatar">
              <Icon name="spark" size={16} />
            </span>
            <span className="nav__name nav__name--full">{data.name}</span>
            <span className="nav__name nav__name--short">{data.shortName}</span>
          </a>

          <div className="nav__links nav__links--desktop">
            {nav.map((item) => (
              <a key={item.sectionId} href={`#${item.sectionId}`} className="nav__link">
                {item.label}
              </a>
            ))}
          </div>

          <button
            type="button"
            className={`nav__menu-btn${menuOpen ? " nav__menu-btn--open" : ""}`}
            aria-label={menuOpen ? "Close menu" : "Open menu"}
            aria-expanded={menuOpen}
            onClick={() => setMenuOpen((open) => !open)}
          >
            <span className="nav__menu-bar" />
            <span className="nav__menu-bar" />
            <span className="nav__menu-bar" />
          </button>
        </div>
      </nav>

      <div
        className={`nav__overlay${menuOpen ? " nav__overlay--open" : ""}`}
        aria-hidden={!menuOpen}
        onClick={closeMenu}
      />

      <div className={`nav__drawer${menuOpen ? " nav__drawer--open" : ""}`} aria-hidden={!menuOpen}>
        <div className="nav__drawer-links">
          {nav.map((item) => (
            <a
              key={item.sectionId}
              href={`#${item.sectionId}`}
              className="nav__drawer-link"
              onClick={closeMenu}
            >
              {item.label}
            </a>
          ))}
        </div>
        <a href="#contact" className="nav__drawer-cta" onClick={closeMenu}>
          Contact Me
        </a>
      </div>
    </>
  );
}
