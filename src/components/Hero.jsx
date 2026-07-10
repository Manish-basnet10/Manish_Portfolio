// Hero.jsx
// Two-column hero section (text left / image right on desktop; stacked on mobile)
// Contains: overline, greeting, name heading, bio, CTA buttons, stat cards, social icons

import React from "react";
import developerData from "../data/developerData";

// ==================== SOCIAL ICONS ====================
const socialLinks = [
  {
    label: "LinkedIn",
    href: developerData.socials.linkedin,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z" />
        <rect x="2" y="9" width="4" height="12" />
        <circle cx="4" cy="4" r="2" />
      </svg>
    ),
  },
  {
    label: "Instagram",
    href: developerData.socials.instagram,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="5" ry="5" />
        <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z" />
        <line x1="17.5" y1="6.5" x2="17.51" y2="6.5" />
      </svg>
    ),
  },
  {
    label: "GitHub",
    href: developerData.socials.github,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M9 19c-5 1.5-5-2.5-7-3m14 6v-3.87a3.37 3.37 0 0 0-.94-2.61c3.14-.35 6.44-1.54 6.44-7A5.44 5.44 0 0 0 20 4.77 5.07 5.07 0 0 0 19.91 1S18.73.65 16 2.48a13.38 13.38 0 0 0-7 0C6.27.65 5.09 1 5.09 1A5.07 5.07 0 0 0 5 4.77a5.44 5.44 0 0 0-1.5 3.78c0 5.42 3.3 6.61 6.44 7A3.37 3.37 0 0 0 9 18.13V22" />
      </svg>
    ),
  },
  {
    label: "Facebook",
    href: developerData.socials.facebook,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z" />
      </svg>
    ),
  },
  {
    label: "WhatsApp",
    href: developerData.socials.whatsapp,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 0 1-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 0 1-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 0 1 2.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0 0 12.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 0 0 5.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 0 0-3.48-8.413Z" />
      </svg>
    ),
  },
  {
    label: "Twitter / X",
    href: developerData.socials.twitter,
    icon: (
      <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
      </svg>
    ),
  },
];

// ==================== STAT CARDS ====================
const statCards = [
  {
    title: "Full Stack",
    description: "Web apps, backend systems, and end-to-end deployment",
  },
  {
    title: "Cloud & Ops",
    description: "AWS foundations, APIs, and scalable delivery pipelines",
  },
];

// ==================== HERO COMPONENT ====================
function Hero({ isDark }) {
  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const cardText = isDark ? "text-gray-100" : "text-[#1e2a3a]";
  const mutedText = isDark ? "text-gray-400" : "text-[#5c6b7a]";
  const iconBg = isDark ? "bg-gray-700" : "bg-white";
  const imageBg = isDark ? "bg-gray-700" : "bg-[#e4ddd2]";

  return (
    <section
      className="relative pt-24 pb-14 md:pt-28 md:pb-20 lg:pt-32 lg:pb-24"
      aria-label="Hero introduction"
    >
      <div className="container-max">
        <div className="flex flex-col-reverse lg:flex-row items-center gap-10 lg:gap-16">
          {/* ===== TEXT BLOCK ===== */}
          <div className="flex-1 text-center lg:text-left scroll-animate">
            {/* Overline */}
            <p
              className="text-xs sm:text-sm font-semibold tracking-widest uppercase mb-3"
              style={{ color: "#1e2a3a", opacity: isDark ? 0.8 : 1 }}
            >
              {developerData.title}
            </p>

            {/* Greeting */}
            <p className={`text-base sm:text-lg mb-1 font-medium ${mutedText}`}>
              Hi, it's me
            </p>

            {/* Name Heading */}
            <h1
              className="font-extrabold leading-tight mb-5"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              <span
                className="text-4xl sm:text-5xl lg:text-6xl"
                style={{ color: isDark ? "#f3f4f6" : "#1e2a3a" }}
              >
                I'm{" "}
              </span>
              <span
                className="text-4xl sm:text-5xl lg:text-6xl"
                style={{ color: "#d97a4a" }}
              >
                {developerData.name}
              </span>
            </h1>

            {/* Bio */}
            <p className={`text-sm sm:text-base leading-relaxed max-w-lg mx-auto lg:mx-0 mb-7 ${mutedText}`}>
              {developerData.bio}
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center lg:justify-start gap-3 mb-8 flex-wrap">
              <a
                href={developerData.resumeUrl}
                className="btn-primary w-full sm:w-auto px-7 py-3 rounded-full font-semibold text-sm text-white text-center no-underline"
                style={{ backgroundColor: "#d97a4a", minHeight: "44px", display: "flex", alignItems: "center", justifyContent: "center" }}
                aria-label={`View ${developerData.name}'s resume (PDF)`}
                target="_blank"
                rel="noopener noreferrer"
              >
                View Resume
              </a>
              <a
                href={developerData.socials.whatsapp}
                className="btn-secondary w-full sm:w-auto px-7 py-3 rounded-full font-semibold text-sm text-center no-underline"
                style={{
                  backgroundColor: isDark ? "#374151" : "#e4ddd2",
                  color: isDark ? "#f3f4f6" : "#1e2a3a",
                  minHeight: "44px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                }}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Hire ${developerData.name} via WhatsApp`}
              >
                Hire Me
              </a>
            </div>

            {/* Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8 max-w-md mx-auto lg:mx-0">
              {statCards.map((card) => (
                <div
                  key={card.title}
                  className={`${cardBg} rounded-2xl p-4 shadow-sm text-left`}
                >
                  <p
                    className="font-bold text-sm mb-0.5"
                    style={{ color: "#d97a4a", fontFamily: "'Baloo 2', cursive" }}
                  >
                    {card.title}
                  </p>
                  <p className={`text-xs leading-snug ${mutedText}`}>{card.description}</p>
                </div>
              ))}
            </div>

            {/* Social Icons */}
            <div className="flex items-center justify-center lg:justify-start gap-3 flex-wrap">
              {socialLinks.map((s) => (
                <a
                  key={s.label}
                  href={s.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={`${developerData.name} on ${s.label}`}
                  className={`social-icon flex items-center justify-center rounded-full ${iconBg} shadow-sm`}
                  style={{
                    width: "44px",
                    height: "44px",
                    color: isDark ? "#d1d5db" : "#1e2a3a",
                  }}
                >
                  {s.icon}
                </a>
              ))}
            </div>
          </div>

          {/* ===== IMAGE BLOCK ===== */}
          <div className="flex-shrink-0 w-full lg:w-auto flex justify-center scroll-animate">
            <div className="relative">
              {/* Offset backdrop */}
              <div
                className={`absolute rounded-3xl ${imageBg}`}
                style={{
                  width: "clamp(220px, 50vw, 380px)",
                  height: "clamp(260px, 60vw, 460px)",
                  top: "16px",
                  left: "16px",
                }}
                aria-hidden="true"
              />
              {/* Portrait container */}
              <div
                className="relative rounded-3xl overflow-hidden shadow-2xl"
                style={{
                  width: "clamp(220px, 50vw, 380px)",
                  height: "clamp(260px, 60vw, 460px)",
                  backgroundColor: isDark ? "#374151" : "#c8bfb2",
                }}
              >
                <img
                  src="/images/hero/portrait.jpg"
                  alt={`${developerData.name} — ${developerData.title}`}
                  className="w-full h-full object-cover object-top"
                  onError={(e) => {
                    // Fallback placeholder when image not yet added
                    e.target.style.display = "none";
                    e.target.nextSibling.style.display = "flex";
                  }}
                />
                {/* Fallback placeholder */}
                <div
                  className="absolute inset-0 items-center justify-center flex-col gap-2"
                  style={{ display: "none", backgroundColor: isDark ? "#374151" : "#d4c9b8" }}
                >
                  <svg width="64" height="64" viewBox="0 0 24 24" fill="none" stroke={isDark ? "#9ca3af" : "#8a7a6a"} strokeWidth="1.5" aria-hidden="true">
                    <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2" />
                    <circle cx="12" cy="7" r="4" />
                  </svg>
                  <p style={{ color: isDark ? "#9ca3af" : "#8a7a6a", fontSize: "12px", textAlign: "center", padding: "0 16px" }}>
                    Add your photo to<br />/public/images/hero/portrait.jpg
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Hero;
