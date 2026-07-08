import React, { useEffect, useRef, useState } from "react";
import { useParams } from "react-router-dom";
import { PROJECTS } from "../../data/projects";
import "./ProjectDetails.css";

/**
 * Project Details page — sits under the Header/nav like any other route.
 * Shares the site's signature system: Poppins display type, the navy /
 * luxury-blue palette, diagonal-cut seam, and the same scroll-reveal
 * animation pattern used in About / Projects / Clients.
 *
 * USAGE
 * -----
 * Pass a single `project` object as a prop (e.g. from a route param /
 * fetched data). The shape below is just a placeholder so the page
 * renders on its own — swap PLACEHOLDER_PROJECT for real data, or wire
 * this component up to receive `project` from your router.
 *
 *   <ProjectDetails project={theRealProjectObject} />
 */
const PLACEHOLDER_PROJECT = {
  title: "Prince Abdullah bin Ghazi Faculty of Communications, IT & AI",
  category: "Education",
  status: "In Progress",
  description: [
    "A purpose-built academic facility designed to bring together classrooms, research labs, and collaborative studios under a single campus identity for Al-Balqa Applied University.",
    "The scope spans structural works, electromechanical systems, and full interior fit-out, delivered in phases to keep the surrounding campus fully operational throughout construction.",
  ],
  images: [
    "https://images.unsplash.com/photo-1541888946425-d81bb19240f5?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1487958449943-2429e8be8625?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1503387762-592deb58ef4e?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
    "https://images.unsplash.com/photo-1541971875076-8f970d573be6?q=80&w=1600&auto=format&fit=crop&ixlib=rb-4.1.0",
  ],
  meta: [
    { label: "Client", value: "Aqaba Development Corporation" },
    { label: "Supervisor", value: "Holy Rock Consultant Engineers" },
    { label: "Value", value: "JD 1,698,150.125" },
    { label: "Area", value: "5,500 m²" },
    { label: "Started", value: "April 2021" },
  ],
};

export default function ProjectDetails({ project: propProject }) {
  const sectionRef = useRef(null);
  const { slug } = useParams();
  const [isVisible, setIsVisible] = useState(false);
  const [activeImage, setActiveImage] = useState(0);

  const project = propProject || PROJECTS.find((item) => item.slug === slug) || PLACEHOLDER_PROJECT;

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
    setActiveImage(0);
  }, [project?.slug]);

  const images = project.images || [];
  const goTo = (index) => {
    const next = (index + images.length) % images.length;
    setActiveImage(next);
  };
  const goNext = () => goTo(activeImage + 1);
  const goPrev = () => goTo(activeImage - 1);

  return (
    <section
      className={`project-details ${isVisible ? "project-details--visible" : ""}`}
      id="project-details"
      ref={sectionRef}
    >
      {/* Diagonal seam picking up where the Header's cut left off */}
      <svg
        className="project-details__seam"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon className="project-details__seam-fill" points="0,0 1440,0 1440,60 0,0" />
        <line className="project-details__seam-line" x1="0" y1="0" x2="1440" y2="60" />
      </svg>

      {/* --- Gallery: contained, NOT full-bleed. Title and thumbnails
          both live below the image, never overlaid on top of it. --- */}
      <div className="container project-details__gallery-wrap">
        <div className="project-details__gallery">
          {images.map((src, index) => (
            <img
              key={src}
              src={src}
              alt={`${project.title} — photo ${index + 1}`}
              className={`project-details__slide ${
                index === activeImage ? "project-details__slide--active" : ""
              }`}
            />
          ))}

          <div className="project-details__chips">
            <span
              className={`project-details__chip ${
                project.status === "In Progress" ? "project-details__chip--progress" : ""
              }`}
            >
              {project.status}
            </span>
            <span className="project-details__chip">{project.category}</span>
          </div>

          {images.length > 1 && (
            <>
              <button
                type="button"
                className="project-details__nav project-details__nav--prev"
                aria-label="Previous photo"
                onClick={goPrev}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M15 18l-6-6 6-6" />
                </svg>
              </button>
              <button
                type="button"
                className="project-details__nav project-details__nav--next"
                aria-label="Next photo"
                onClick={goNext}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M9 18l6-6-6-6" />
                </svg>
              </button>
            </>
          )}
        </div>

        {images.length > 1 && (
          <div className="project-details__thumbs">
            {images.map((src, index) => (
              <button
                key={src}
                type="button"
                className={`project-details__thumb ${
                  index === activeImage ? "project-details__thumb--active" : ""
                }`}
                aria-label={`View photo ${index + 1}`}
                onClick={() => goTo(index)}
              >
                <img src={src} alt="" aria-hidden="true" />
              </button>
            ))}
          </div>
        )}

        {/* Title sits under the image + thumbnails, not on top of the photo */}
        <div className="project-details__heading">
          <p className="project-details__eyebrow">Project Overview</p>
          <h1 className="project-details__title">{project.title}</h1>
        </div>
      </div>

      {/* --- Description + basic info, below the gallery block --- */}
      <div className="container project-details__container">
        <div className="project-details__grid">
          <div className="project-details__content">
            <p className="project-details__section-label">Description</p>
            {(project.description || []).map((paragraph, index) => (
              <p className="project-details__text" key={index}>
                {paragraph}
              </p>
            ))}

            <div className="project-details__cta">
              <a href="/projects" className="btn btn-outline">
                <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M19 12H5" />
                  <path d="m12 19-7-7 7-7" />
                </svg>
                Back to Projects
              </a>
              <a href="#contact" className="btn btn-accent">
                Discuss a Similar Project
              </a>
            </div>
          </div>

          <div className="project-details__meta-card">
            {(project.meta || []).map((row) => (
              <div className="project-details__meta-row" key={row.label}>
                <span className="project-details__meta-label">{row.label}</span>
                <span className="project-details__meta-value">{row.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}