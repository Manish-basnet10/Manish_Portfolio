// Skills.jsx
// Premium Skills section: three-tier header, large category containers,
// grouped skill cards with uniform sizing and smooth hover animations

import React from "react";
import skillsData from "../data/skillsData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

/* ─── Single or Grouped Icon Circle ─── */
function SkillIconCircle({ skill, isDark }) {
  const isGrouped = Array.isArray(skill.icons);
  const borderColor = isDark ? "border-gray-600" : "border-gray-200";
  const bgColor = isDark ? "bg-gray-600" : "bg-[#f0e8db]";

  // Determine if any icon in this card needs inversion (GitHub in dark mode)
  const needsInvert = (name) =>
    isDark && (name === "GitHub" || name === "Git & GitHub");

  if (isGrouped) {
    // Two overlapping circles for grouped skills
    return (
      <div className="flex items-center justify-center -space-x-3">
        {skill.icons.map((iconUrl, i) => (
          <div
            key={i}
            className={`skill-icon-circle ${bgColor} ${borderColor} rounded-full border shadow-sm flex items-center justify-center`}
            style={{
              width: "68px",
              height: "68px",
              zIndex: skill.icons.length - i,
            }}
          >
            <img
              src={iconUrl}
              alt=""
              width="32"
              height="32"
              loading="lazy"
              className="w-8 h-8 object-contain"
              style={needsInvert(skill.name) && i === 1 ? { filter: "invert(1)" } : {}}
              onError={(e) => {
                e.target.src = `https://placehold.co/32x32/d97a4a/fff?text=${skill.name[0]}`;
              }}
            />
          </div>
        ))}
      </div>
    );
  }

  // Single icon circle
  return (
    <div
      className={`skill-icon-circle ${bgColor} ${borderColor} rounded-full border shadow-sm flex items-center justify-center`}
      style={{ width: "84px", height: "84px" }}
    >
      <img
        src={skill.icon}
        alt={`${skill.name} logo`}
        width="38"
        height="38"
        loading="lazy"
        className="w-[38px] h-[38px] object-contain"
        style={
          skill.name === "GitHub" && isDark
            ? { filter: "invert(1)" }
            : skill.name === "Next.js" && isDark
            ? { filter: "invert(1)" }
            : skill.name === "Express.js" && isDark
            ? { filter: "invert(1)" }
            : {}
        }
        onError={(e) => {
          e.target.src = `https://placehold.co/38x38/d97a4a/fff?text=${skill.name[0]}`;
        }}
      />
    </div>
  );
}

/* ─── Skill Card ─── */
function SkillCard({ skill, isDark }) {
  const cardBg = isDark ? "bg-gray-700" : "bg-[#f7f2eb]";
  const borderColor = isDark ? "border-gray-600" : "border-gray-200";
  const textColor = isDark ? "text-gray-200" : "text-[#1e2a3a]";

  return (
    <div
      className={`skill-card ${cardBg} ${borderColor} rounded-[20px] border flex flex-col items-center justify-center gap-5 shadow-sm cursor-default`}
      style={{ height: "170px" }}
      title={skill.name}
    >
      <SkillIconCircle skill={skill} isDark={isDark} />
      <span className={`text-sm font-semibold text-center leading-tight ${textColor}`}>
        {skill.name}
      </span>
    </div>
  );
}

/* ─── Main Skills Section ─── */
function Skills({ isDark }) {
  useScrollAnimation();

  const containerBg = isDark ? "bg-gray-800" : "bg-white";
  const containerBorder = isDark ? "border-gray-700" : "border-gray-100";
  const containerShadow = isDark
    ? "shadow-[0_4px_24px_rgba(0,0,0,0.3)]"
    : "shadow-[0_4px_24px_rgba(0,0,0,0.06)]";
  const categoryTitleColor = isDark ? "text-gray-100" : "text-[#1e2a3a]";
  const mutedText = isDark ? "text-gray-400" : "text-[#5c6b7a]";

  return (
    <section
      id="skills"
      aria-labelledby="skills-heading"
      style={{ paddingTop: "100px", paddingBottom: "120px" }}
    >
      <div className="container-max">
        {/* ─── Section Header: Three-tier centered layout ─── */}
        <div className="text-center scroll-animate" style={{ marginBottom: "80px" }}>
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
            Capabilities
          </p>

          {/* Hero heading */}
          <h2
            id="skills-heading"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              lineHeight: 1.1,
              color: isDark ? "#f3f4f6" : "#1e2a3a",
              maxWidth: "900px",
              margin: "0 auto 18px",
              fontSize: "clamp(34px, 5vw, 60px)",
            }}
          >
            Skills That Power My Work
          </h2>

          {/* Description */}
          <p
            className={mutedText}
            style={{
              maxWidth: "700px",
              margin: "0 auto",
              fontSize: "clamp(16px, 2vw, 20px)",
              lineHeight: 1.7,
              fontWeight: 400,
            }}
          >
            I work across software engineering, backend systems, cloud
            foundations, and practical product delivery.
          </p>
        </div>

        {/* ─── Category Cards ─── */}
        <div className="flex flex-col" style={{ gap: "48px" }}>
          {skillsData.map((category, idx) => (
            <div
              key={category.category}
              className={`${containerBg} ${containerBorder} ${containerShadow} border scroll-animate`}
              style={{
                borderRadius: "28px",
                padding: "clamp(24px, 4vw, 48px)",
                transitionDelay: `${idx * 80}ms`,
              }}
            >
              {/* Category Title — Left-aligned */}
              <h3
                className={categoryTitleColor}
                style={{
                  fontFamily: "'Baloo 2', cursive",
                  fontSize: "clamp(22px, 3vw, 30px)",
                  fontWeight: 700,
                  marginBottom: "36px",
                }}
              >
                {category.category}
              </h3>

              {/* Skills Grid — 5 columns desktop */}
              <div
                className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-5"
              >
                {category.skills.map((skill) => (
                  <SkillCard key={skill.name} skill={skill} isDark={isDark} />
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

export default Skills;
