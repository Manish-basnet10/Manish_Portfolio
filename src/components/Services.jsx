// Services.jsx
// Services / Expertise section — gradient cards with overlay text and tags

import React from "react";
import servicesData from "../data/servicesData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function ServiceCard({ service }) {
  return (
    <div
      className="service-card relative rounded-2xl overflow-hidden border border-transparent cursor-default"
      style={{ minHeight: "220px", backgroundColor: "#1f2937" }}
      aria-label={`Service: ${service.title}`}
    >
      {/* Service AI image background */}
      <div
        className="service-img absolute inset-0"
        style={{ 
          backgroundImage: `url(${service.image})`,
          backgroundSize: "cover",
          backgroundPosition: "center"
        }}
        aria-hidden="true"
      />

      {/* Dark overlay for text contrast */}
      <div
        className="absolute inset-0"
        style={{ background: "linear-gradient(to top, rgba(0,0,0,0.85) 0%, rgba(0,0,0,0.4) 60%, rgba(0,0,0,0.2) 100%)" }}
        aria-hidden="true"
      />

      {/* Content */}
      <div className="relative z-10 p-5 flex flex-col h-full" style={{ minHeight: "220px" }}>
        {/* Tag pill */}
        <span
          className="self-start px-3 py-1 rounded-full text-xs font-bold tracking-widest mb-auto"
          style={{ backgroundColor: "rgba(255,255,255,0.2)", color: "#fff", backdropFilter: "blur(4px)" }}
        >
          {service.tag}
        </span>

        {/* Title + Description at bottom */}
        <div className="mt-8">
          <h3
            className="text-base sm:text-lg font-bold text-white mb-1.5 leading-snug"
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            {service.title}
          </h3>
          <p className="text-sm text-white/80 leading-relaxed line-clamp-2">
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
        <div className="text-center mb-12 scroll-animate">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-2"
            style={{ color: "#d97a4a" }}
          >
            EXPERTISE
          </p>
          <h2
            id="services-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3"
            style={{ fontFamily: "'Baloo 2', cursive", color: isDark ? "#f3f4f6" : "#1e2a3a" }}
          >
            Services I Offer
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto ${mutedText}`}>
            From ideation to deployment — I bring full-cycle engineering expertise to every project.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
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
