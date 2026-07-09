import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
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
        <Link to="/" className="ihcc-nav__brand" aria-label="IHCC — Home">
          <img src={logo} alt="Infinite Horizons Construction Company (IHCC) logo" />
        </Link>

        <nav className="ihcc-nav__links" aria-label="Main navigation">
          {NAV_LINKS.map((link) => (
            <Link key={link.href} to={link.href}>
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="ihcc-nav__actions">
          <Link to="/contact" className="ihcc-nav__cta">
            Contact Us
          </Link>

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
          <Link key={link.href} to={link.href} onClick={() => setIsMenuOpen(false)}>
            {link.label}
          </Link>
        ))}
        <Link to="/contact" className="ihcc-nav__cta ihcc-nav__cta--mobile" onClick={() => setIsMenuOpen(false)}>
          Contact Us
        </Link>
      </div>
    </header>
  );
}