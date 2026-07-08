// CertificationsPage.jsx
// Full certifications page at route "/certifications"
// Certificate cards with full-bleed image + dark gradient overlay + overlay text

import React, { useEffect } from "react";
import certificationsData from "../data/certificationsData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function CertCard({ cert, isDark }) {
  return (
    <article
      className="cert-card rounded-2xl overflow-hidden shadow-md relative cursor-default"
      style={{ aspectRatio: "4 / 3", backgroundColor: isDark ? "#374151" : "#d4c9b8" }}
      aria-label={`Certificate: ${cert.title}. ${cert.description}`}
    >
      {/* Certificate image (full bleed) */}
      <img
        src={cert.image}
        alt={`${cert.title} certificate — ${cert.description}`}
        loading="lazy"
        className="cert-img absolute inset-0 w-full h-full object-cover"
        onError={(e) => {
          e.target.style.display = "none";
          e.target.nextSibling.style.display = "flex";
        }}
      />

      {/* Fallback when no image yet */}
      <div
        className="absolute inset-0 items-center justify-center flex-col gap-3"
        style={{ display: "none", background: isDark ? "#374151" : "#c8bfb2" }}
      >
        <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#9ca3af" : "#8a7a6a"} strokeWidth="1.5" aria-hidden="true">
          <circle cx="12" cy="8" r="3" />
          <path d="M6.168 18.849A4 4 0 0 1 10 16h4a4 4 0 0 1 3.834 2.855" />
          <rect x="3" y="3" width="18" height="18" rx="2" />
        </svg>
        <p style={{ color: isDark ? "#9ca3af" : "#8a7a6a", fontSize: "11px", textAlign: "center", padding: "0 12px" }}>
          Add certificate scan to<br />/public/images/certifications/
        </p>
      </div>

      {/* Dark gradient overlay for text legibility */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.80) 0%, rgba(0,0,0,0.3) 50%, rgba(0,0,0,0.05) 100%)" }}
        aria-hidden="true"
      />

      {/* Text overlay */}
      <div className="absolute bottom-0 left-0 right-0 p-4 sm:p-5">
        <h3
          className="font-bold text-white text-sm sm:text-base leading-snug mb-1"
          style={{ fontFamily: "'Baloo 2', cursive" }}
        >
          {cert.title}
        </h3>
        <p className="text-xs sm:text-sm text-white/80 leading-snug line-clamp-2">
          {cert.description}
        </p>
      </div>
    </article>
  );
}

function CertificationsPage({ isDark }) {
  useScrollAnimation();

  // Scroll to top on mount
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, []);

  const mutedText = isDark ? "text-gray-400" : "text-[#5c6b7a]";

  return (
    <main id="main-content" className="min-h-screen pt-20 pb-16">
      <div className="container-max">
        {/* Page Header */}
        <div className="text-center mb-12 pt-8 scroll-animate">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "#d97a4a" }}
          >
            ACHIEVEMENTS
          </p>
          <h1
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{
              fontFamily: "'Baloo 2', cursive",
              color: isDark ? "#f3f4f6" : "#1e2a3a",
            }}
          >
            Certificate Gallery
          </h1>
          <p className={`text-sm sm:text-base max-w-2xl mx-auto ${mutedText}`}>
            A collection of professional certifications and achievements that reflect my
            commitment to continuous learning and technical excellence.
          </p>
        </div>

        {/* Certifications Grid: 1 col → 2 col → 4 col */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5 sm:gap-6">
          {certificationsData.map((cert, idx) => (
            <div
              key={cert.id}
              className="scroll-animate"
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              <CertCard cert={cert} isDark={isDark} />
            </div>
          ))}
        </div>

        {/* Empty state */}
        {certificationsData.length === 0 && (
          <div className={`text-center py-20 ${mutedText}`}>
            <p className="text-lg font-medium mb-2">No certificates yet</p>
            <p className="text-sm">Add entries to src/data/certificationsData.js to populate this gallery.</p>
          </div>
        )}
      </div>
    </main>
  );
}

export default CertificationsPage;
