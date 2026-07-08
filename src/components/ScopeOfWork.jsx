import React, { useEffect, useRef, useState } from "react";
import "./ScopeOfWork.css";

/**
 * Scope of Work — sits comfortably between About and Projects.
 * Reuses the Projects.jsx reveal-on-scroll pattern and the site's
 * card/diagonal-cut signature, applied here as an icon grid rather
 * than a photo grid.
 */
const SERVICES = [
  {
    title: "Government Building Construction Projects",
    text: "Public buildings, ministries and institutional facilities delivered to national standards and on schedule.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M3 21h18" />
        <path d="M5 21V7l7-4 7 4v14" />
        <path d="M9 9h.01M9 13h.01M15 9h.01M15 13h.01" />
        <path d="M10 21v-4h4v4" />
      </svg>
    ),
  },
  {
    title: "Private Sector Building Construction Projects",
    text: "Turnkey construction for private clients, from concept and planning through to final handover.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m3 11 9-8 9 8" />
        <path d="M5 10v10h14V10" />
        <path d="M9 20v-6h6v6" />
      </svg>
    ),
  },
  {
    title: "Infrastructure Development Projects",
    text: "Roads, utilities, foundations and heavy civil works engineered for durability and long-term safety.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M4 21 10 3h1l3 9h1l3-9h1l4 18" />
        <path d="M8 15h3M13.5 15h3" />
      </svg>
    ),
  },
  {
    title: "Commercial and Industrial Buildings",
    text: "Warehouses, factories and commercial complexes built for performance, efficiency and scale.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M2 21h20" />
        <path d="M4 21V9l6-4 6 4v12" />
        <path d="M16 21v-8l4 2v6" />
        <path d="M8 13h1M8 17h1M12 13h1M12 17h1" />
      </svg>
    ),
  },
  {
    title: "Renovation and Rehabilitation Projects",
    text: "Reinforcement, restoration and modernization that extend the life and value of existing structures.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="m14.7 6.3 3 3L8 19H5v-3Z" />
        <path d="m13 4 3 3" />
        <path d="M3 21h6" />
      </svg>
    ),
  },
  {
    title: "Mechanical, Electrical, and Plumbing (MEP) Works",
    text: "Complete MEP installation executed with precision as an integrated part of every project we deliver.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l2.6-2.6a4 4 0 0 1-5.6 5.6L7.4 19.6a2 2 0 0 1-2.8-2.8l7.3-7.3a4 4 0 0 1 5.6-5.6Z" />
      </svg>
    ),
  },
];

function ScopeCard({ service, index }) {
  return (
    <article className="scope-card" style={{ "--i": index }}>
      <span className="scope-card__number">{String(index + 1).padStart(2, "0")}</span>
      <span className="scope-card__icon" aria-hidden="true">
        {service.icon}
      </span>
      <h3 className="scope-card__title">{service.title}</h3>
      <p className="scope-card__text">{service.text}</p>
    </article>
  );
}

const AUTO_ROTATE_MS = 5000;

export default function ScopeOfWork({ mobileCarousel = true }) {
  const sectionRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);

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

  // Switch to a single-card carousel on phone-width screens
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goTo = (index) => {
    const next = (index + SERVICES.length) % SERVICES.length;
    setActiveIndex(next);
  };
  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  // Auto-rotate the mobile carousel, pausing while the section is offscreen
  useEffect(() => {
    if (!isMobile || !isVisible) return undefined;
    const timer = setInterval(goNext, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [isMobile, isVisible, activeIndex]);

  const onTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
    touchDeltaX.current = 0;
  };
  const onTouchMove = (e) => {
    touchDeltaX.current = e.touches[0].clientX - touchStartX.current;
  };
  const onTouchEnd = () => {
    const delta = touchDeltaX.current;
    if (Math.abs(delta) > 40) {
      delta < 0 ? goNext() : goPrev();
    }
    touchDeltaX.current = 0;
  };

  return (
    <section
      className={`scope ${isVisible ? "scope--visible" : ""}`}
      id="scope"
      ref={sectionRef}
    >
      <span className="scope__accent" aria-hidden="true" />

      <div className="container scope__container">
        <div className="scope__header">
          <p className="scope__eyebrow">What We Build &amp; Deliver</p>
          <h2 className="scope__title">
            <span>Scope</span> of Work
          </h2>
          <p className="scope__intro">
            From national institutions to private developments, IHCC covers
            the full construction lifecycle &mdash; engineered on precision,
            quality, and sustainability.
          </p>
        </div>

        {isMobile && mobileCarousel ? (
          <div className="scope-carousel">
            <div
              className="scope-carousel__track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {SERVICES.map((service, index) => (
                <div className="scope-carousel__slide" key={service.title}>
                  <ScopeCard service={service} index={index} />
                </div>
              ))}
            </div>

            <button
              type="button"
              className="scope-carousel__nav scope-carousel__nav--prev"
              aria-label="Previous service"
              onClick={goPrev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              className="scope-carousel__nav scope-carousel__nav--next"
              aria-label="Next service"
              onClick={goNext}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="scope-carousel__dots">
              {SERVICES.map((service, index) => (
                <button
                  key={service.title}
                  className={`scope-carousel__dot ${
                    index === activeIndex ? "scope-carousel__dot--active" : ""
                  }`}
                  aria-label={`Go to service ${index + 1}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="scope__grid">
            {SERVICES.map((service, index) => (
              <ScopeCard service={service} index={index} key={service.title} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}