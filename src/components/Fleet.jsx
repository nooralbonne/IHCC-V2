import React, { useEffect, useRef, useState } from "react";
import "./Fleet.css";

/**
 * Fleet / "Our Vehicles & Equipment" section.
 * Shares the site's signature system: Poppins display type, the navy /
 * luxury-blue palette, diagonal-cut corners, and the same scroll-reveal
 * animation pattern used across About / Projects / Project Details.
 */
const FLEET_DATA = {
  totalLabel: "Total Vehicles",
  totalCount: 24,
  categories: [
    { count: 2, name: "Concrete Mixers", detail: "Kamaz" },
    { count: 4, name: "Bulldozers", detail: "JCB & Komatsu" },
    { count: 3, name: "Road Rollers", detail: "Bomag, Dynapac, CAT" },
    { count: 3, name: "Loaders", detail: "Bobcat" },
    { count: 1, name: "Bus", detail: "Hyundai" },
    { count: 5, name: "Pick-ups", detail: "Dodge Ram, Isuzu, Toyota" },
    { count: 6, name: "Passenger Cars", detail: "Toyota, Mercedes, Ford, Chevrolet" },
  ],
};

export default function Fleet({ data = FLEET_DATA }) {
  const sectionRef = useRef(null);
  const gridRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [hasScrolled, setHasScrolled] = useState(false);
  const [atEnd, setAtEnd] = useState(false);
  const [scrollProgress, setScrollProgress] = useState(0);
  const [thumbWidthPercent, setThumbWidthPercent] = useState(30);

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
      { threshold: 0.1 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const updateThumbWidth = () => {
      const node = gridRef.current;
      if (!node || node.scrollWidth === 0) return;
      const ratio = (node.clientWidth / node.scrollWidth) * 100;
      setThumbWidthPercent(Math.max(15, Math.min(90, ratio)));
    };
    updateThumbWidth();
    window.addEventListener("resize", updateThumbWidth);
    return () => window.removeEventListener("resize", updateThumbWidth);
  }, []);

  const handleGridScroll = () => {
    const node = gridRef.current;
    if (!node) return;
    if (!hasScrolled) setHasScrolled(true);
    const maxScroll = node.scrollWidth - node.clientWidth;
    setAtEnd(node.scrollLeft >= maxScroll - 4);
    setScrollProgress(maxScroll > 0 ? node.scrollLeft / maxScroll : 0);
  };

  return (
    <section
      className={`fleet ${isVisible ? "fleet--visible" : ""}`}
      id="fleet"
      ref={sectionRef}
    >
      <div className="container">
        <div className="fleet__heading">
          <p className="fleet__eyebrow">Fleet & Machinery</p>
          <h2 className="fleet__title">
            Our <span>Vehicles &amp; Equipment</span>
          </h2>
          <p className="fleet__intro">
            Ismail Al-Hersh Contracting Company owns a diverse and modern fleet of
            over {data.totalCount} vehicles and heavy machinery, which are
            categorized as follows:
          </p>
        </div>

        <div className="fleet__body">
          <div className="fleet__total">
            <div className="fleet__total-figure">{data.totalCount}</div>
            <div className="fleet__total-label">{data.totalLabel}</div>
          </div>

          <div
            className={`fleet__grid-wrap ${atEnd ? "fleet__grid-wrap--end" : ""}`}
          >
            <div className="fleet__grid" ref={gridRef} onScroll={handleGridScroll}>
              {data.categories.map((item) => (
                <div className="fleet__card" key={item.name}>
                  <span className="fleet__card-count">{item.count}</span>
                  <p className="fleet__card-name">{item.name}</p>
                  <p className="fleet__card-detail">— {item.detail}</p>
                </div>
              ))}
            </div>

            <span
              className={`fleet__swipe-hint ${hasScrolled ? "fleet__swipe-hint--hidden" : ""}`}
              aria-hidden="true"
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M13 5l7 7-7 7M4 12h16" />
              </svg>
            </span>

            <div className="fleet__scroll-track" aria-hidden="true">
              <div
                className="fleet__scroll-thumb"
                style={{
                  width: `${thumbWidthPercent}%`,
                  left: `${scrollProgress * (100 - thumbWidthPercent)}%`,
                }}
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}