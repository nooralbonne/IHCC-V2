import React, { useEffect, useState } from "react";
import "./Navbar.css";
import logo from "../assets/logo.jpeg";

const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "About", href: "/about" },
  { label: "Projects", href: "/projects" },
  { label: "Services", href: "/services" },
  
];

export default function Navbar() {
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => setIsScrolled(window.scrollY > 24);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <header className={`ihcc-nav ${isScrolled ? "ihcc-nav--scrolled" : ""}`}>
      <div className="ihcc-nav__inner">
        {/* Logo — enlarged on purpose, it's the first thing that should register */}
        <a href="/" className="ihcc-nav__brand" aria-label="IHCC — Home">
          <img src={logo} alt="Infinite Horizons Construction Company (IHCC) logo" />
        </a>

        <nav className="ihcc-nav__links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <a key={link.href} href={link.href}>
              {link.label}
            </a>
          ))}
        </nav>

        <div className="ihcc-nav__actions">
          <a href="/contact" className="ihcc-nav__cta">
            Contact Us
          </a>

          <button
            className={`ihcc-nav__burger ${isMenuOpen ? "is-open" : ""}`}
            aria-label="Open menu"
            aria-expanded={isMenuOpen}
            onClick={() => setIsMenuOpen((v) => !v)}
          >
            <span />
            <span />
            <span />
          </button>
        </div>
      </div>

      {/* Mobile drawer */}
      <div className={`ihcc-nav__mobile ${isMenuOpen ? "is-open" : ""}`}>
        {NAV_LINKS.map((link) => (
          <a key={link.href} href={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </a>
        ))}
        <a href="#contact" className="ihcc-nav__cta ihcc-nav__cta--mobile" onClick={() => setIsMenuOpen(false)}>
          Contact Us
        </a>
      </div>
    </header>
  );
}