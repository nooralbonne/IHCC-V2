import React, { useEffect, useRef, useState } from "react";
import "./CompanyProfile.css";
import CompanyProfilePdf from "../assets/IHCC-Company-Profile2026.pdf";

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

export default function CompanyProfile() {
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
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  return (
    <section
      className={`company-profile ${isVisible ? "company-profile--visible" : ""}`}
      id="company-profile"
      ref={sectionRef}
    >
      <div className="container company-profile__container">
        <div className="company-profile__content">
          <p className="company-profile__eyebrow">Who We Are</p>
          <h2 className="company-profile__title">
            <span>Building Trust</span>
            <span>Since 1985</span>
          </h2>
          <p className="company-profile__text">
            Ismail Al-Hersh Contracting Company (IHCC) is a first-level
            Jordanian contractor with over 40 years of experience, having
            delivered 45+ projects worth JD 70.9M+ across the civil,
            mechanical, and electrical sectors.
          </p>

          <a
            className="btn btn-accent company-profile__cta"
            href={CompanyProfilePdf}
            target="_blank"
            rel="noopener noreferrer"
            download
          >
            <DownloadIcon />
            View Company Profile
          </a>
        </div>
      </div>

      <span className="company-profile__accent" aria-hidden="true" />
    </section>
  );
}
