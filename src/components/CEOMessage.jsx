import React, { useEffect, useRef, useState } from "react";
import "./CEOMessage.css";
import CEO from "../assets/Mohammad-Alhersh.jpg"
/**
 * CEO Message — a standalone statement section, dark background for
 * gravitas (same navy used in Clients), sharing the site's signature
 * system: Poppins display type, luxury-blue accents, diagonal seam,
 * and the same scroll-reveal pattern used across every section.
 *
 * Swap the portrait image and the name/title in the signature block
 * for the real ones whenever you have them.
 */
export default function CEOMessage() {
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
      className={`ceo ${isVisible ? "ceo--visible" : ""}`}
      id="ceo-message"
      ref={sectionRef}
    >
      {/* Diagonal seam picking up where the previous section's cut left off */}
      <svg
        className="ceo__seam"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon className="ceo__seam-fill" points="0,0 1440,0 0,60" />
        <line className="ceo__seam-line" x1="0" y1="0" x2="1440" y2="0" />
      </svg>

      <span className="ceo__mark" aria-hidden="true">&rdquo;</span>
      <span className="ceo__accent" aria-hidden="true" />

      <div className="container ceo__container">
        <div className="ceo__grid">
          <div className="ceo__media">
            <img
              className="ceo"
              src={CEO}
              alt="Portrait of IHCC's Chief Executive Officer"
            />
            <span className="ceo__media-flag" aria-hidden="true" />

            <div className="ceo__media-caption">
              <span className="ceo__media-name">Eng. Mohammad Al-Hersh</span>
              <span className="ceo__media-title">Chief Executive Officer</span>
            </div>
          </div>

          <div className="ceo__content">
            <p className="ceo__eyebrow">CEO Message</p>

            <h2 className="ceo__quote" style={{ "--i": 0 }}>
              "Some carry a name. <span>I carry a legacy.</span>"
            </h2>

            <p className="ceo__text" style={{ "--i": 1 }}>
              When my father established this company in 1985, he built it
              on something simpler than strategy — showing up, doing the
              work right, and never compromising on what he promised.
            </p>

            <p className="ceo__text" style={{ "--i": 2 }}>
              Forty years later, those values remain the foundation of
              IHCC. Every project we deliver carries the trust earned over
              four decades — a trust I consider my responsibility to
              honour and grow. Our ambition is not only to grow in scale,
              but to grow in impact — to be remembered not just for what
              we build, but for how we make our clients feel throughout
              the journey.
            </p>

            <p className="ceo__closing" style={{ "--i": 3 }}>
              The strongest foundations are built not only with concrete
              and steel, but with reputation, relationships, and
              uncompromising standards.
            </p>

            <p className="ceo__text" style={{ "--i": 4 }}>
              The best is still ahead of us — and we intend to build it.
            </p>

            <div className="ceo__signature" style={{ "--i": 5 }}>
              <span className="ceo__signature-line" />
              <span className="ceo__signature-text">
                <span className="ceo__signature-name">Eng. Mohammad Al-Hersh</span>
                <span className="ceo__signature-title">
                  Chief Executive Officer, IHCC
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
