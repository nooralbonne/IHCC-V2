import React, { useEffect, useRef, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { PROJECTS } from "./data/projects";
import "./Projects.css";

/**
 * Showcases a curated set of projects on the homepage.
 * Full archive lives on a dedicated "/projects" route — the
 * button below just needs to point at whatever route you use.
 */

function ProjectCard({ project, index }) {
  const poster = project.image || project.images?.[0];

  return (
    <article className="project-card" style={{ "--i": index }}>
      <div className="project-card__media">
        <img src={poster} alt={project.title} loading="lazy" />
        <span
          className={`project-card__status ${
            project.status === "In Progress"
              ? "project-card__status--progress"
              : ""
          }`}
        >
          {project.status}
        </span>
        <span className="project-card__category">{project.category}</span>
      </div>

      <div className="project-card__body">
        <h3 className="project-card__title">{project.title}</h3>

        <ul className="project-card__meta">
          <li>
            <span>Client</span>
            <span>{project.client}</span>
          </li>
          <li>
            <span>Value</span>
            <span>{project.value}</span>
          </li>
          <li>
            <span>Area</span>
            <span>{project.area}</span>
          </li>
        </ul>
      </div>
    </article>
  );
}

const AUTO_ROTATE_MS = 5000;

export default function Projects() {
  const sectionRef = useRef(null);
  const touchStartX = useRef(0);
  const touchDeltaX = useRef(0);
  const [isVisible, setIsVisible] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [activeIndex, setActiveIndex] = useState(0);
  const location = useLocation();
  const isProjectsPage = location.pathname === "/projects";
  const showViewAll = !isProjectsPage;
  const visibleProjects = isProjectsPage ? PROJECTS : PROJECTS.slice(0, 6);
  const showMobileCarousel = isMobile && !isProjectsPage;

  // Reveal-on-scroll, same pattern used across the site
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
    const next = (index + visibleProjects.length) % visibleProjects.length;
    setActiveIndex(next);
  };
  const goNext = () => goTo(activeIndex + 1);
  const goPrev = () => goTo(activeIndex - 1);

  // Auto-rotate the mobile carousel, pausing while the section is offscreen
  useEffect(() => {
    if (!showMobileCarousel || !isVisible) return undefined;
    const timer = setInterval(goNext, AUTO_ROTATE_MS);
    return () => clearInterval(timer);
  }, [showMobileCarousel, isVisible, activeIndex]);

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
      className={`projects ${isVisible ? "projects--visible" : ""}`}
      id="projects"
      ref={sectionRef}
    >
      <div className="container projects__container">
        <div className="projects__header">
          <p className="projects__eyebrow">Our Latest Work</p>
          <h2 className="projects__title">
            <span>Our</span>
            <span>Projects</span>
          </h2>
          <p className="projects__intro">
            A selection of the engineering landmarks we've delivered across
            Jordan — from academic campuses to healthcare and industrial
            facilities, each built on precision, quality, and sustainability.
          </p>
        </div>

        {showMobileCarousel ? (
          <div className="project-carousel">
            <div
              className="project-carousel__track"
              style={{ transform: `translateX(-${activeIndex * 100}%)` }}
              onTouchStart={onTouchStart}
              onTouchMove={onTouchMove}
              onTouchEnd={onTouchEnd}
            >
              {visibleProjects.map((project, index) => (
                <div className="project-carousel__slide" key={project.slug}>
                  <Link to={`/projects/${project.slug}`} className="project-card-link">
                    <ProjectCard project={project} index={index} />
                  </Link>
                </div>
              ))}
            </div>

            <button
              type="button"
              className="project-carousel__nav project-carousel__nav--prev"
              aria-label="Previous project"
              onClick={goPrev}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </button>

            <button
              type="button"
              className="project-carousel__nav project-carousel__nav--next"
              aria-label="Next project"
              onClick={goNext}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </button>

            <div className="project-carousel__dots">
              {visibleProjects.map((project, index) => (
                <button
                  key={project.title}
                  className={`project-carousel__dot ${
                    index === activeIndex ? "project-carousel__dot--active" : ""
                  }`}
                  aria-label={`Go to project ${index + 1}`}
                  onClick={() => goTo(index)}
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="projects__grid">
            {visibleProjects.map((project, index) => (
              <Link
                key={project.slug}
                to={`/projects/${project.slug}`}
                className="project-card-link"
              >
                <ProjectCard project={project} index={index} />
              </Link>
            ))}
          </div>
        )}

        {showViewAll && (
          <div className="projects__cta">
            <Link to="/projects" className="btn btn-accent">
              View All Projects
            </Link>
          </div>
        )}
      </div>

      {/* Quiet diagonal accent, the same signature device used across the
          Company Profile and the Header section */}
      <span className="projects__accent" aria-hidden="true" />
    </section>
  );
}