// Projects.jsx
// Projects section — cards with 16:9 image, description, and action buttons

import React from "react";
import projectsData from "../data/projectsData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

// External link icon
function ExternalLinkIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
      <polyline points="15 3 21 3 21 9" />
      <line x1="10" y1="14" x2="21" y2="3" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="13" height="13" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
      <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
    </svg>
  );
}

function ProjectCard({ project, isDark }) {
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const titleColor = isDark ? "text-gray-100" : "text-[#1e2a3a]";
  const mutedText = isDark ? "text-gray-400" : "text-[#5c6b7a]";
  const imgBg = isDark ? "bg-gray-700" : "bg-[#e4ddd2]";

  return (
    <article
      className={`card-hover ${cardBg} rounded-2xl overflow-hidden shadow-sm flex flex-col`}
      aria-label={`Project: ${project.name}`}
    >
      {/* Image — 16:9 */}
      <div
        className={`relative overflow-hidden ${imgBg}`}
        style={{ paddingBottom: "56.25%" }}
      >
        <img
          src={project.image}
          alt={`Screenshot of ${project.name} project`}
          loading="lazy"
          className="img-zoom absolute inset-0 w-full h-full object-cover"
          onError={(e) => {
            e.target.style.display = "none";
            e.target.nextSibling.style.display = "flex";
          }}
        />
        {/* Fallback */}
        <div
          className="absolute inset-0 items-center justify-center"
          style={{ display: "none", background: isDark ? "#374151" : "#d4c9b8" }}
        >
          <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#6b7280" : "#9a8a78"} strokeWidth="1.5" aria-hidden="true">
            <rect x="3" y="3" width="18" height="18" rx="2" />
            <circle cx="8.5" cy="8.5" r="1.5" />
            <polyline points="21 15 16 10 5 21" />
          </svg>
        </div>
      </div>

      {/* Card Body */}
      <div className="p-5 flex flex-col flex-1 gap-3 text-center items-center">
        <h3
          className={`font-bold text-base sm:text-lg leading-snug text-center w-full ${titleColor}`}
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          {project.name}
        </h3>
        <p className={`text-sm leading-relaxed flex-1 text-center ${mutedText}`}>
          {project.description}
        </p>

        {/* Action buttons */}
        <div className="flex flex-col sm:flex-row gap-2 pt-1 flex-wrap">
          <a
            href={project.liveDemoLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-primary flex items-center justify-center gap-1.5 flex-1 px-4 py-2.5 rounded-full text-sm font-semibold text-white no-underline"
            style={{ backgroundColor: "#d97a4a", minHeight: "44px" }}
            aria-label={`Live demo of ${project.name}`}
          >
            <ExternalLinkIcon /> Live Demo
          </a>
          <a
            href={project.githubLink}
            target="_blank"
            rel="noopener noreferrer"
            className="btn-secondary flex items-center justify-center gap-1.5 flex-1 px-4 py-2.5 rounded-full text-sm font-semibold no-underline"
            style={{
              backgroundColor: isDark ? "#374151" : "#e4ddd2",
              color: isDark ? "#f3f4f6" : "#1e2a3a",
              minHeight: "44px",
            }}
            aria-label={`GitHub repository for ${project.name}`}
          >
            <GitHubIcon /> GitHub
          </a>
        </div>
      </div>
    </article>
  );
}

function Projects({ isDark }) {
  useScrollAnimation();

  const mutedText = isDark ? "text-gray-400" : "text-[#5c6b7a]";

  return (
    <section
      id="projects"
      className="py-14 md:py-20 lg:py-24"
      aria-labelledby="projects-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12 scroll-animate">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "#d97a4a" }}
          >
            PORTFOLIO
          </p>
          <h2
            id="projects-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3"
            style={{ fontFamily: "'Baloo 2', cursive", color: isDark ? "#f3f4f6" : "#1e2a3a" }}
          >
            Projects and Recent Work
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto ${mutedText}`}>
            A selection of projects that showcase my problem-solving approach, technical breadth,
            and attention to detail.
          </p>
        </div>

        {/* Projects Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {projectsData.map((project, idx) => (
            <div
              key={project.id}
              className="scroll-animate"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <ProjectCard project={project} isDark={isDark} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Projects;
