import React, { useEffect, useRef, useState } from "react";
import "./Header.css";

/**
 * Each entry in SLIDES can be a video or an image.
 * To swap the video back in later: add a { type: "video", src, poster } entry.
 */
const SLIDES = [
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1535732759880-bbd5c7265e3f?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1591955506264-3f5a6834570a?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  {
    type: "image",
    src: "https://images.unsplash.com/photo-1503708928676-1cb796a0891e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
  },
  // Add more slides here (video or image) and the arrows/dots activate automatically:
  // { type: "video", src: "/videos/hero-construction.mp4", poster: "/images/hero-construction.jpg" },
];

const AUTO_ROTATE_MS = 7000;

export default function Header() {
  const [activeIndex, setActiveIndex] = useState(0);
  const timerRef = useRef(null);

  const goTo = (index) => {
    const next = (index + SLIDES.length) % SLIDES.length;
    setActiveIndex(next);
  };

  const goNext = () => setActiveIndex((current) => (current + 1) % SLIDES.length);
  const goPrev = () => setActiveIndex((current) => (current - 1 + SLIDES.length) % SLIDES.length);

  useEffect(() => {
    if (SLIDES.length <= 1) return undefined;
    timerRef.current = setInterval(() => {
      setActiveIndex((current) => (current + 1) % SLIDES.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timerRef.current);
  }, []);

  return (
    <section className="hero" id="home">
      {SLIDES.map((slide, index) => {
        const isActive = index === activeIndex;
        if (slide.type === "video") {
          return (
            <video
              key={slide.src}
              className={`hero__slide ${isActive ? "hero__slide--active" : ""}`}
              src={slide.src}
              poster={slide.poster}
              autoPlay
              muted
              loop
              playsInline
              aria-hidden={!isActive}
            />
          );
        }
        const zoomClass = index % 2 === 0 ? "hero__slide--zoom-in" : "hero__slide--zoom-out";
        return (
          <div
            key={slide.src}
            className={`hero__slide ${zoomClass} ${isActive ? "hero__slide--active" : ""}`}
            style={{ backgroundImage: `url("${slide.src}")` }}
            aria-hidden={!isActive}
          />
        );
      })}

      <div className="hero__overlay" />
      <div className="hero__frame" aria-hidden="true" />

      {/* Diagonal cut + hairline seam — the same signature device used across the
          Company Profile (cover, About Us, Our Vision pages) so the site and the
          printed profile read as one identity. */}
      <svg
        className="hero__signature"
        viewBox="0 0 1440 100"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon className="hero__signature-fill" points="0,100 1440,28 1440,100" />
        <line className="hero__signature-line" x1="0" y1="100" x2="1440" y2="28" />
      </svg>

      <div className="container hero__content">
        <p className="hero__eyebrow" >Ismail Al-Hersh Contracting Co.</p>
        <h1 className="hero__title">
          <span>Engineered For</span>
          <span>Infinite Horizons</span>
        </h1>
        <p className="hero__text">
          From design to delivery, we turn every project into an engineering
          landmark built on precision, quality, and sustainability.
        </p>
        <div className="hero__actions">
          <a href="#projects" className="btn btn-accent">
            View Our Projects
          </a>
          <a href="#contact" className="btn btn-outline">
            Contact Us
          </a>
        </div>
      </div>

      {SLIDES.length > 1 && (
        <>
          <button className="hero__arrow hero__arrow--left" aria-label="Previous slide" onClick={goPrev}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="m12 19-7-7 7-7" />
              <path d="M19 12H5" />
            </svg>
          </button>
          <button className="hero__arrow hero__arrow--right" aria-label="Next slide" onClick={goNext}>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M5 12h14" />
              <path d="m12 5 7 7-7 7" />
            </svg>
          </button>

          <div className="hero__dots">
            {SLIDES.map((slide, index) => (
              <button
                key={slide.src}
                className={`hero__dot ${index === activeIndex ? "hero__dot--active" : ""}`}
                aria-label={`Go to slide ${index + 1}`}
                onClick={() => goTo(index)}
              />
            ))}
          </div>
        </>
      )}
    </section>
  );
}