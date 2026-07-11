import React, { useEffect, useRef, useState } from "react";
import { Link } from "react-router-dom";
import "./AboutPage.css";
import OrgChart from "../../OrgChart";
import CompanyProfile from "../../CompanyProfile";

function useReveal(threshold = 0.15) {
  const ref = useRef(null);
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const node = ref.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, [threshold]);

  return [ref, isVisible];
}

const HISTORY = [
  {
    year: "1985",
    title: "Company Founded",
    text: "Ismail Al-Hersh Contracting Co. established in 1985.",
    position: "top",
  },
  {
    year: "2000",
    title: "Commercial Expansion",
    text: "Expanded into commercial construction and civil works.",
    position: "bottom",
  },
  {
    year: "2010",
    title: "Sector Diversification",
    text: "Entered healthcare and education facilities construction.",
    position: "top",
  },
  {
    year: "2020",
    title: "Project Milestone",
    text: "Reached over 45 completed projects across Jordan.",
    position: "bottom",
  },
  {
    year: "2025",
    title: "Delivering at Scale",
    text: "Achieved 70.9 million JD in public sector contracts.",
    position: "top",
  },
];

const VALUES = [
  {
    title: "Safety",
    text: "Protecting our people and partners on every site, every day.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 2 4 5v6c0 5 3.4 8.7 8 11 4.6-2.3 8-6 8-11V5Z" />
        <path d="m9.5 12 2 2 3.5-4" />
      </svg>
    ),
  },
  {
    title: "Integrity",
    text: "Doing what we say, and standing behind every commitment.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M12 3v18" />
        <path d="M5 7h5l-2.5 6a3 3 0 0 0 5 0L5 7Z" />
        <path d="M14 7h5l-2.5 6a3 3 0 0 0 5 0L14 7Z" />
        <path d="M5 7h14" />
      </svg>
    ),
  },
  {
    title: "Respect",
    text: "Valuing every client, partner, and team member equally.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M17 21v-2a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4v2" />
        <circle cx="9" cy="7" r="4" />
        <path d="M23 21v-2a4 4 0 0 0-3-3.87" />
        <path d="M16 3.13a4 4 0 0 1 0 7.75" />
      </svg>
    ),
  },
  {
    title: "Quality",
    text: "Holding every project to the highest standards of craft.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="8" r="6" />
        <path d="M9 14 6.5 22l5.5-3 5.5 3L15 14" />
      </svg>
    ),
  },
  {
    title: "Collaboration",
    text: "Building strong partnerships with clients and communities.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="8" cy="9" r="3.2" />
        <circle cx="16" cy="9" r="3.2" />
        <path d="M2.5 20a5.5 5.5 0 0 1 11 0" />
        <path d="M10.5 20a5.5 5.5 0 0 1 11 0" />
      </svg>
    ),
  },
  {
    title: "Innovation",
    text: "Embracing better methods and technology on every job.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M9 18h6" />
        <path d="M10 22h4" />
        <path d="M12 2a6 6 0 0 0-4 10.47c.63.6 1 1.44 1 2.33V16h6v-1.2c0-.89.37-1.73 1-2.33A6 6 0 0 0 12 2Z" />
      </svg>
    ),
  },
  {
    title: "Sustainability",
    text: "Building with an eye on resources, safety, and longevity.",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M11 20A7 7 0 0 1 4 13c0-4 3-7 9-11 6 4 9 7 9 11a7 7 0 0 1-7 7 6.97 6.97 0 0 1-4-1.25" />
        <path d="M11 20v-9" />
      </svg>
    ),
  },
];

function History() {
  const [ref, isVisible] = useReveal();

  return (
    <section
      className={`history ${isVisible ? "history--visible" : ""}`}
      ref={ref}
    >
      <div className="container history__container">
        <div className="history__header">
          <p className="section-eyebrow">Our Journey</p>
          <h2 className="history__title">Our History</h2>
          <p className="history__intro">
            Ismail Al-Hersh Contracting Company was established in 1985 as a
            general maintenance provider and later grew into a first-class
            construction company in Jordan (Contractors Association ID:
            1482), led by Eng. Mohammad Al-Hersh.
          </p>
        </div>

        <div className="history__timeline">
          <div className="history__track">
            <span className="history__connector" aria-hidden="true" />
            {HISTORY.map((item) => (
              <div className="history__item" key={item.year}>
                <div className={`history__stem history__stem--${item.position}`}>
                  {item.position === "bottom" && <span className="history__dot" />}
                  {item.position === "bottom" && <span className="history__line" />}
                  <div className="history__content">
                    <h3 className="history__year-title">{item.title}</h3>
                    <p className="history__year-text">{item.text}</p>
                  </div>
                  {item.position === "top" && <span className="history__line" />}
                  {item.position === "top" && <span className="history__dot" />}
                </div>
                <span className="history__arrow">{item.year}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

function MissionVision() {
  const [ref, isVisible] = useReveal();

  return (
    <section className={`mv ${isVisible ? "mv--visible" : ""}`} ref={ref}>
      <div className="container">
        <div className="mv__row">
          <div className="mv__text">
            <p className="section-eyebrow">Our Mission</p>
            <h2 className="mv__title">Building Lasting Relationships</h2>
            <p className="mv__lead">
              To build lasting relationships with our clients by delivering
              the best construction services at competitive,
              market-driven prices.
            </p>
            <p className="mv__body">
              Our mission is to provide comprehensive construction solutions
              &mdash; civil, mechanical, and electrical &mdash; that meet
              the highest standards of quality and safety. We are
              committed to completing every project on time, within
              budget, and to the full satisfaction of our clients and
              partners.
            </p>
          </div>

          <div className="mv__panel">
            <span className="mv__panel-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="m22 2-7 20-4-9-9-4Z" />
                <path d="M22 2 11 13" />
              </svg>
            </span>
            <span className="mv__panel-flag" aria-hidden="true" />
          </div>
        </div>

        <div className="mv__row mv__row--reverse">
          <div className="mv__panel">
            <span className="mv__panel-icon" aria-hidden="true">
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round">
                <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8Z" />
                <circle cx="12" cy="12" r="3.4" />
              </svg>
            </span>
            <span className="mv__panel-flag" aria-hidden="true" />
          </div>

          <div className="mv__text">
            <p className="section-eyebrow">Our Vision</p>
            <h2 className="mv__title">Leading Jordan&rsquo;s Construction Sector</h2>
            <p className="mv__body">
              To serve as the market&rsquo;s top contractor by supporting
              our team, embracing innovation, and delivering outstanding
              results on every project.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

function Values() {
  const [ref, isVisible] = useReveal();

  return (
    <section
      className={`values ${isVisible ? "values--visible" : ""}`}
      ref={ref}
    >
      <span className="values__accent" aria-hidden="true" />

      <div className="container values__container">
        <div className="values__header">
          <p className="section-eyebrow">Our Values</p>
          <h2 className="values__title">
            What Drives <span>Every Project</span>
          </h2>
          <p className="values__intro">
            Our values are the foundation of every project we build and
            every relationship we grow.
          </p>
        </div>

        <div className="values__grid">
          {VALUES.map((value, index) => (
            <div className="value-card" style={{ "--i": index }} key={value.title}>
              <span className="value-card__icon" aria-hidden="true">
                {value.icon}
              </span>
              <h3 className="value-card__title">{value.title}</h3>
              <p className="value-card__text">{value.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default function AboutPage() {
  return (
    <>
      <section className="about-page-hero">
        <span className="about-page-hero__accent" aria-hidden="true" />
        <div className="container">
          <p className="about-page-hero__breadcrumb">
            <Link to="/">Home</Link> / <span>About Us</span>
          </p>
          <h1 className="about-page-hero__title">
            About <span>IHCC</span>
          </h1>
          <p className="about-page-hero__text">
            Forty years of engineering landmarks across Jordan &mdash; from
            a general maintenance provider in 1985 to a trusted first-level
            construction company today.
          </p>
        </div>
      </section>

      <History />
      <MissionVision />
      <Values />
      <OrgChart />
      <CompanyProfile />
    </>
  );
}