import React, { useEffect, useRef, useState } from "react";
import "./About.css";

/**
 * About section — sits directly under the Header.
 * Shares the Header's signature system: Poppins display type,
 * navy / luxury-blue palette, and the diagonal-cut motif carried
 * over from the printed Company Profile.
 */
export default function About() {
  const sectionRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`about ${isVisible ? "about--visible" : ""}`}
      id="about"
      ref={sectionRef}
    >
      {/* Diagonal seam picking up where the Header's cut left off */}
      <svg
        className="about__seam"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon className="about__seam-fill" points="0,0 1440,0 0,60" />
        <line className="about__seam-line" x1="0" y1="0" x2="1440" y2="0" />
      </svg>

      <div className="container about__grid">
        <div className="about__content" style={{ "--i": 0 }}>
          <p className="about__eyebrow">Our Story</p>
          <h2 className="about__title">
            <span>About</span> <span>Us</span>
          </h2>

          <p className="about__text"> Founded in 1985, Ismail Al-Hersh Contracting Company began as a general maintenance provider. Under the leadership of Eng. Mohammad Al-Hersh, it grew into a first-level construction company serving individuals, institutions, and government bodies across Jordan.</p>

         {/* <div className="about__stat" style={{ "--i": 1 }}>
            <span className="about__stat-number">45+</span>
            <p className="about__stat-text">
              Projects successfully completed across Jordan&rsquo;s
              governorates in sectors including education, healthcare,
              energy, and civil defense &mdash; reflecting four decades of
              trusted construction expertise.
            </p>
          </div> */}

          <div className="about__badge" style={{ "--i": 2 }}>
            <span className="about__badge-icon" aria-hidden="true">
              <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </span>
            <div>
              <p className="about__badge-title">First-Level Contractor</p>
              <p className="about__badge-text">
                Membership ID 1482 in the Jordanian Contractors Association — certified for building construction, electromechanical, and water & sanitation works. </p>
            </div>
          </div>

          <div className="about__cta" style={{ "--i": 3 }}>
            <a href="/about" className="btn btn-outline">
              Read More About Us
              <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" />
                <path d="m12 5 7 7-7 7" />
              </svg>
            </a>
          </div>
        </div>

        <div className="about__media">
          <img
            className="about__image"
            src="https://images.unsplash.com/photo-1504307651254-35680f356dfd?q=80&w=1200&auto=format&fit=crop&ixlib=rb-4.1.0"
            alt="IHCC engineers reviewing blueprints on site"
          />
          <span className="about__media-flag" aria-hidden="true" />
        </div>
      </div>
    </section>
  );
}