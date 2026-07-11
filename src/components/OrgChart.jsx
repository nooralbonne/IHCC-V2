import React, { useEffect, useRef, useState } from "react";
import { GENERAL_MANAGER, DEPARTMENTS } from "./data/orgChart";
import "./OrgChart.css";

/**
 * Organization chart section: General Manager at the top, connected down
 * to each department. Departments render as icon-badge cards; the
 * Operations & Projects Division has a deeper structure (project
 * managers + technical departments) so it gets a wider "featured" card.
 */

const ICONS = {
  briefcase: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="7" width="18" height="13" rx="1.5" />
      <path d="M8 7V5.5A1.5 1.5 0 0 1 9.5 4h5A1.5 1.5 0 0 1 16 5.5V7" />
      <path d="M3 12h18" />
    </svg>
  ),
  drafting: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M4 20 14 4" />
      <path d="M10 20 20 4" />
      <path d="M7.2 15.5h4.6" />
      <circle cx="14" cy="4" r="1.4" />
    </svg>
  ),
  file: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M7 3.5h7l4 4V19a1.5 1.5 0 0 1-1.5 1.5H7A1.5 1.5 0 0 1 5.5 19V5A1.5 1.5 0 0 1 7 3.5Z" />
      <path d="M14 3.5V8h4.5" />
      <path d="M8.5 13h7M8.5 16.5h4.5" />
    </svg>
  ),
  truck: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M2.5 6.5h11v9h-11z" />
      <path d="M13.5 10h3.5l3.5 3v2.5h-7Z" />
      <circle cx="6.5" cy="17.5" r="1.6" />
      <circle cx="16.5" cy="17.5" r="1.6" />
    </svg>
  ),
  calculator: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="5" y="3" width="14" height="18" rx="1.5" />
      <path d="M8 7.5h8" />
      <path d="M8 12h1M11.5 12h1M15 12h1M8 15.5h1M11.5 15.5h1M15 15.5h1" />
    </svg>
  ),
  users: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="9" cy="8" r="3" />
      <path d="M3 20c0-3.3 2.7-6 6-6s6 2.7 6 6" />
      <circle cx="17" cy="9" r="2.4" />
      <path d="M21 20c0-2.6-1.8-4.8-4.2-5.6" />
    </svg>
  ),
  scale: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M12 3v17M8 20h8" />
      <path d="M5 7h5M14 7h5" />
      <path d="M2.5 7 5 12.5a2.6 2.6 0 0 0 5 0L12 7" />
      <path d="M12 7l2.5 5.5a2.6 2.6 0 0 0 5 0L22 7" />
    </svg>
  ),
  monitor: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <rect x="3" y="4.5" width="18" height="12" rx="1.5" />
      <path d="M8.5 20h7M12 16.5V20" />
    </svg>
  ),
  wrench: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <path d="M14.7 6.3a4 4 0 0 0-5.4 4.9L4 16.5V20h3.5l5.3-5.3a4 4 0 0 0 4.9-5.4l-2.6 2.6-2-2Z" />
    </svg>
  ),
  user: (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round">
      <circle cx="12" cy="8" r="3.6" />
      <path d="M4.5 20c0-4.1 3.4-7.5 7.5-7.5s7.5 3.4 7.5 7.5" />
    </svg>
  ),
};

function DepartmentCard({ department, index }) {
  return (
    <article className={`orgchart-card ${department.featured ? "orgchart-card--featured" : ""}`} style={{ "--i": index }}>
      <div className="orgchart-card__icon">{ICONS[department.icon]}</div>
      <h3 className="orgchart-card__title">{department.name}</h3>

      {department.featured ? (
        <div className="orgchart-card__featured-body">
          <div className="orgchart-card__group">
            <p className="orgchart-card__group-label">Project Managers</p>
            <ul className="orgchart-card__members">
              {department.projectManagers.map((name) => (
                <li key={name}>{name}</li>
              ))}
            </ul>
          </div>

          <p className="orgchart-card__group-label orgchart-card__group-label--divider">
            Technical Departments
          </p>
          <div className="orgchart-card__subgrid">
            {department.technicalDepartments.map((sub) => (
              <div className="orgchart-subcard" key={sub.name}>
                <p className="orgchart-subcard__title">{sub.name}</p>
                <ul className="orgchart-card__members">
                  {sub.members.map((name) => (
                    <li key={name}>{name}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <ul className="orgchart-card__members">
          {department.members.map((name) => (
            <li key={name}>{name}</li>
          ))}
        </ul>
      )}
    </article>
  );
}

const AUTO_ROTATE_MS = 5000;

export default function OrgChart() {
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
      { threshold: 0, rootMargin: "0px 0px -10% 0px" }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const mq = window.matchMedia("(max-width: 640px)");
    const update = () => setIsMobile(mq.matches);
    update();
    mq.addEventListener("change", update);
    return () => mq.removeEventListener("change", update);
  }, []);

  const goTo = (index) => {
    const next = (index + DEPARTMENTS.length) % DEPARTMENTS.length;
    setActiveIndex(next);
  };
  const goNext = () => setActiveIndex((current) => (current + 1) % DEPARTMENTS.length);
  const goPrev = () =>
    setActiveIndex((current) => (current - 1 + DEPARTMENTS.length) % DEPARTMENTS.length);

  useEffect(() => {
    if (!isMobile || !isVisible) return undefined;
    const timer = setInterval(() => {
      setActiveIndex((current) => (current + 1) % DEPARTMENTS.length);
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

  return (
    <section
      className={`orgchart ${isVisible ? "orgchart--visible" : ""}`}
      id="organization"
      ref={sectionRef}
    >
      <div className="container orgchart__container">
        <div className="orgchart__header">
          <p className="orgchart__eyebrow">How We're Organized</p>
          <h2 className="orgchart__title">
            <span>Organization</span>
            <span>Chart</span>
          </h2>
          <p className="orgchart__intro">
            A clear chain of command across our divisions and departments,
            built to keep every project moving with accountability at every
            level.
          </p>
        </div>

        <div className="orgchart__gm-wrap">
          <div className="orgchart-card orgchart-card--gm">
            <div className="orgchart-card__icon">{ICONS.user}</div>
            <h3 className="orgchart-card__title">{GENERAL_MANAGER.name}</h3>
            <p className="orgchart-card__role">{GENERAL_MANAGER.title}</p>
          </div>
          <span className="orgchart__trunk" aria-hidden="true" />
          <p className="orgchart__branch-label">Direct Reporting Departments</p>
        </div>

        {isMobile ? (
          <div className="orgchart-carousel">
            <div
              className="orgchart-carousel__track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {DEPARTMENTS.map((department, index) => (
                <div className="orgchart-carousel__slide" key={department.id}>
                  <DepartmentCard department={department} index={index} />
                </div>
              ))}
            </div>

            <div className="orgchart-carousel__controls">
              <button
                type="button"
                className="orgchart-carousel__nav"
                aria-label="Previous department"
                onClick={goPrev}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>

              <div className="orgchart-carousel__dots">
                {DEPARTMENTS.map((department, index) => (
                  <button
                    key={department.id}
                    className={`orgchart-carousel__dot ${
                      index === activeIndex ? "orgchart-carousel__dot--active" : ""
                    }`}
                    aria-label={`Go to ${department.name}`}
                    onClick={() => goTo(index)}
                  />
                ))}
              </div>

              <button
                type="button"
                className="orgchart-carousel__nav"
                aria-label="Next department"
                onClick={goNext}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </div>
          </div>
        ) : (
          <div className="orgchart__grid">
            {DEPARTMENTS.map((department, index) => (
              <DepartmentCard department={department} index={index} key={department.id} />
            ))}
          </div>
        )}
      </div>

      <span className="orgchart__accent" aria-hidden="true" />
    </section>
  );
}
