// Services.jsx
// Services / Expertise section — gradient cards with overlay text and tags

import React from "react";
import servicesData from "../data/servicesData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function ServiceCard({ service }) {
  return (
    <div
      className="service-card relative rounded-3xl overflow-hidden border border-white/5 cursor-default shadow-md group"
      style={{ aspectRatio: "3 / 4", backgroundColor: "#1f2937" }}
      aria-label={`Service: ${service.title}`}
    >
      {/* Service AI image background */}
      <div
        className="service-img absolute inset-0 transition-transform duration-500 ease-out group-hover:scale-105"
        style={{ 
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        aria-hidden="true"
      />

      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0 transition-opacity duration-300"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.92) 0%, rgba(0,0,0,0.50) 60%, rgba(0,0,0,0.15) 100%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col justify-between h-full items-center text-center">
        {/* Tag pill */}
        <span
          className="self-center px-3 py-1.5 rounded-full text-[10px] font-bold tracking-widest uppercase"
          style={{ backgroundColor: "rgba(255,255,255,0.15)", color: "#fff", backdropFilter: "blur(4px)" }}
        >
          {service.tag}
        </span>

        {/* Title + Description at bottom */}
        <div className="mt-auto w-full flex flex-col items-center">
          <h3
            className="text-base sm:text-lg font-bold text-white mb-2 leading-snug text-center justify-center w-full"
            style={{ 
              fontFamily: "'Baloo 2', cursive",
              minHeight: "3rem",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center"
            }}
          >
            {service.title}
          </h3>
          <p className="text-xs sm:text-sm text-white/80 leading-relaxed line-clamp-3 text-center">
            {service.description}
          </p>
        </div>
      </div>
    </div>
  );
}

function Services({ isDark }) {
  useScrollAnimation();

  const mutedText = isDark ? "text-gray-400" : "text-[#5c6b7a]";

  return (
    <section
      id="services"
      aria-labelledby="services-heading"
      style={{ paddingTop: "70px", paddingBottom: "80px" }}
    >
      <div className="container-max">
        {/* ─── Section Header: Three-tier centered layout (matches Skills) ─── */}
        <div className="text-center scroll-animate" style={{ marginBottom: "50px" }}>
          {/* Small accent label */}
          <p
            className="uppercase font-medium"
            style={{
              fontSize: "14px",
              letterSpacing: "6px",
              color: "#d97a4a",
              marginBottom: "18px",
            }}
          >
            EXPERTISE
          </p>

          {/* Hero heading */}
          <h2
            id="services-heading"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              lineHeight: 1.1,
              color: isDark ? "#f3f4f6" : "#1e2a3a",
              maxWidth: "900px",
              margin: "0 auto 12px",
              fontSize: "clamp(34px, 5vw, 60px)",
            }}
          >
            Services I Offer
          </h2>

          {/* Description */}
          <p
            className={mutedText}
            style={{
              maxWidth: "900px",
              margin: "0 auto",
              fontSize: "clamp(13px, 1.5vw, 15px)",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            From ideation to deployment — I bring full-cycle engineering expertise to every project.
          </p>
        </div>

        {/* Cards Grid: 4 columns on desktop for balanced card sizing */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5 sm:gap-6">
          {servicesData.map((service, idx) => (
            <div
              key={service.id}
              className="scroll-animate"
              style={{ transitionDelay: `${idx * 70}ms` }}
            >
              <ServiceCard service={service} />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Services;
