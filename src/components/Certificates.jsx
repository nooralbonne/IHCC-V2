import React, { useEffect, useRef, useState } from "react";
import { CERTIFICATES } from "./data/certificates";
import "./Certificates.css";


function DownloadIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      fill="none"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
      aria-hidden="true"
    >
      <path d="M12 3v12" />
      <path d="M7 10l5 5 5-5" />
      <path d="M5 21h14" />
    </svg>
  );
}

function CertificateCard({ certificate, index, onPreview }) {
  return (
    <article className="certificate-card" style={{ "--i": index }}>
      <div
        className="certificate-card__media"
        onClick={() => onPreview(certificate)}
        role="button"
        tabIndex={0}
        aria-label={`Preview ${certificate.title} certificate`}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") onPreview(certificate);
        }}
      >
        <img src={certificate.image} alt={`${certificate.title} certificate`} loading="lazy" />
        <span className="certificate-card__badge">Certified</span>
      </div>

      <div className="certificate-card__body">
        <h3 className="certificate-card__title">
          {certificate.title}
          <span className="certificate-card__subtitle">{certificate.subtitle}</span>
        </h3>

        <ul className="certificate-card__meta">
          <li>
            <span>Certificate No</span>
            <span>{certificate.certNo}</span>
          </li>
          <li>
            <span>Issued</span>
            <span>{certificate.issueDate}</span>
          </li>
          <li>
            <span>Valid Until</span>
            <span>{certificate.validUntil}</span>
          </li>
        </ul>

        <a
          className="certificate-card__download"
          href={certificate.pdf}
          target="_blank"
          rel="noopener noreferrer"
          download
        >
          <DownloadIcon />
          Download PDF
        </a>
      </div>
    </article>
  );
}

const AUTO_ROTATE_MS = 5000;

export default function Certificates() {
  const sectionRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [previewCertificate, setPreviewCertificate] = useState(null);
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
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  // Switch to a single-card carousel on phone-width screens, same
  // breakpoint/pattern used across the site (e.g. Projects section)
  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goTo = (index) => {
    const next = (index + CERTIFICATES.length) % CERTIFICATES.length;
    setActiveIndex(next);
  };
  const goNext = () => setActiveIndex((current) => (current + 1) % CERTIFICATES.length);
  const goPrev = () =>
    setActiveIndex((current) => (current - 1 + CERTIFICATES.length) % CERTIFICATES.length);

  // Auto-rotate the mobile carousel, pausing while the section is offscreen
  useEffect(() => {
    if (!isMobile || !isVisible) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % CERTIFICATES.length);
    }, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [isMobile, isVisible]);

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

  // Close the lightbox with Escape
  useEffect(() => {
    if (!previewCertificate) return undefined;
    const onKeyDown = (e) => {
      if (e.key === "Escape") setPreviewCertificate(null);
    };
    window.addEventListener("keydown", onKeyDown);
    return () => window.removeEventListener("keydown", onKeyDown);
  }, [previewCertificate]);

  return (
    <section
      className={`certificates ${isVisible ? "certificates--visible" : ""}`}
      id="certificates"
      ref={sectionRef}
    >
      <div className="container certificates__container">
        <div className="certificates__header">
          <p className="certificates__eyebrow">Accredited &amp; Certified</p>
          <h2 className="certificates__title">
            <span>Our</span>
            <span>Certificates</span>
          </h2>
          <p className="certificates__intro">
            Our management systems are independently certified against
            international standards, reflecting our commitment to quality,
            safety, and environmental responsibility on every project.
          </p>
        </div>

        {isMobile ? (
          <div className="certificate-carousel">
            <div
              className="certificate-carousel__track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {CERTIFICATES.map((certificate, index) => (
                <div className="certificate-carousel__slide" key={certificate.slug}>
                  <CertificateCard
                    certificate={certificate}
                    index={index}
                    onPreview={setPreviewCertificate}
                  />
                </div>
              ))}
            </div>

            <div className="certificate-carousel__controls">
              <button
                type="button"
                className="certificate-carousel__nav certificate-carousel__nav--prev"
                aria-label="Previous certificate"
                onClick={goPrev}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="certificate-carousel__dots">
                {CERTIFICATES.map((certificate, index) => (
                  <button
                    key={certificate.slug}
                    className={`certificate-carousel__dot ${
                      index === activeIndex ? "certificate-carousel__dot--active" : ""
                    }`}
                    aria-label={`Go to certificate ${index + 1}`}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="certificate-carousel__nav certificate-carousel__nav--next"
                aria-label="Next certificate"
                onClick={goNext}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="certificates__grid">
            {CERTIFICATES.map((certificate, index) => (
              <CertificateCard
                key={certificate.slug}
                certificate={certificate}
                index={index}
                onPreview={setPreviewCertificate}
              />
            ))}
          </div>
        )}
      </div>

      {previewCertificate && (
        <div
          className="certificate-lightbox"
          onClick={() => setPreviewCertificate(null)}
          role="dialog"
          aria-modal="true"
          aria-label={`${previewCertificate.title} certificate preview`}
        >
          <button
            type="button"
            className="certificate-lightbox__close"
            aria-label="Close preview"
            onClick={() => setPreviewCertificate(null)}
          >
            ×
          </button>
          <img
            src={previewCertificate.image}
            alt={`${previewCertificate.title} certificate`}
            onClick={(e) => e.stopPropagation()}
          />
        </div>
      )}

      <span className="certificates__accent" aria-hidden="true" />
    </section>
  );
}
