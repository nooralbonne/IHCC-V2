import React, { useEffect, useRef, useState } from "react";
import "./Clients.css";

// Swap these imports for wherever the logo files live in your project
// (e.g. src/assets/clients/...). File names match what was supplied.
import adcLogo from "../assets/clients/ADC.jpg";
import agricultureLogo from "../assets/clients/agriculture.jpg";
import alQaserLogo from "../assets/clients/al-qaser.jpg";
import arabPotashLogo from "../assets/clients/arab-potash.jpg";
import bauLogo from "../assets/clients/BAU.jpg";
import civilDefenseLogo from "../assets/clients/civil-defense.jpg";
import cvdbLogo from "../assets/clients/cvdb.jpg";
import hashemiteLogo from "../assets/clients/hashemite.jpg";
import healthLogo from "../assets/clients/Health.jpg";
import mopwhLogo from "../assets/clients/mopwh.jpg";
import nepcoLogo from "../assets/clients/nepco.jpg";
import arabarmy from "../assets/clients/arabarmy.png";

/**
 * Clients / Partners section — sits comfortably after About or Projects.
 * Shares the site's signature system: Poppins display type, the navy /
 * luxury-blue palette, and the diagonal-cut seam carried through every
 * section. Set on the dark background so it reads as a distinct "trust"
 * beat between the lighter About and Projects sections.
 */
const CLIENTS = [
  { name: "Aqaba Development Corporation", logo: adcLogo },
  { name: "Ministry of Agriculture", logo: agricultureLogo },
  { name: "Al-Qaser Housing Co.", logo: alQaserLogo },
  { name: "Arab Potash Company", logo: arabPotashLogo },
  { name: "Al-Balqa Applied University", logo: bauLogo },
  { name: "Civil Defense Directorate", logo: civilDefenseLogo },
  { name: "Cities & Villages Development Bank", logo: cvdbLogo },
  { name: "The Hashemite University", logo: hashemiteLogo },
  { name: "Ministry of Health", logo: healthLogo },
  { name: "Ministry of Public Works & Housing", logo: mopwhLogo },
  { name: "National Electric Power Company", logo: nepcoLogo },
  { name: "Jordan Armed Forces - Arab Army", logo: arabarmy },
];

export default function Clients() {
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

  // Duplicate the list once so the marquee track can loop seamlessly at -50%.
  const track = [...CLIENTS, ...CLIENTS];

  return (
    <section
      className={`clients ${isVisible ? "clients--visible" : ""}`}
      id="clients"
      ref={sectionRef}
    >
      {/* Diagonal seam picking up where the previous section's cut left off */}
      <svg
        className="clients__seam"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon className="clients__seam-fill" points="0,0 1440,0 0,60" />
        <line className="clients__seam-line" x1="0" y1="0" x2="1440" y2="0" />
      </svg>

      <span className="clients__accent" aria-hidden="true" />

      <div className="container clients__container">
        <div className="clients__header">
          <p className="clients__eyebrow">Trusted By</p>
          <h2 className="clients__title">
            Key  <span>Clients</span> &amp; Partners
          </h2>
          <p className="clients__intro">
            Government bodies, universities, and private-sector clients
            across Jordan who have trusted IHCC with their engineering
            landmarks.
          </p>
        </div>

        <div className="clients__marquee">
          <div className="clients__track">
            {track.map((client, index) => (
              <div className="clients__logo" key={`${client.name}-${index}`}>
                <img src={client.logo} alt={client.name} loading="lazy" />
              </div>
            ))}
          </div>
        </div>

        <div className="clients__stats">
          <div className="clients__stat">
            <span className="clients__stat-number">JD 70,9M</span>
            <span className="clients__stat-label">Public contracts value</span>
          </div>
          <div className="clients__stat">
            <span className="clients__stat-number">45+</span>
            <span className="clients__stat-label">Projects Delivered</span>
          </div>
          <div className="clients__stat">
            <span className="clients__stat-number">40+</span>
            <span className="clients__stat-label">Years of Trust</span>
          </div>
        </div>
      </div>
    </section>
  );
}
