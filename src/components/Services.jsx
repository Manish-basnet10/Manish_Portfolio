// Services.jsx
// Services / Expertise section — gradient cards with overlay text and tags

import React from "react";
import servicesData from "../data/servicesData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function ServiceCard({ service }) {
  return (
    <div
      className="service-card relative rounded-3xl overflow-hidden border border-white/5 cursor-default shadow-md group"
      style={{ minHeight: "320px", backgroundColor: "#1f2937" }}
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
      <div className="relative z-10 p-6 flex flex-col justify-between h-full items-center text-center" style={{ minHeight: "320px" }}>
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
            className="text-lg sm:text-xl font-bold text-white mb-2 leading-snug text-center justify-center w-full"
            style={{ 
              fontFamily: "'Baloo 2', cursive",
              minHeight: "3.5rem",
              display: "flex",
              alignItems: "flex-end",
              justifyContent: "center"
            }}
          >
            {service.title}
          </h3>
          <p className="text-sm text-white/80 leading-relaxed line-clamp-3 text-center">
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
      className="py-14 md:py-20 lg:py-24"
      aria-labelledby="services-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-16 scroll-animate">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "#d97a4a" }}
          >
            EXPERTISE
          </p>
          <h2
            id="services-heading"
            className="text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4"
            style={{ fontFamily: "'Baloo 2', cursive", color: isDark ? "#f3f4f6" : "#1e2a3a" }}
          >
            Services I Offer
          </h2>
          <p className={`text-base sm:text-lg max-w-2xl mx-auto leading-relaxed ${mutedText}`}>
            From ideation to deployment — I bring full-cycle engineering expertise to every project.
          </p>
        </div>

        {/* Cards Grid: 3 columns on desktop for larger, more unique cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
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
