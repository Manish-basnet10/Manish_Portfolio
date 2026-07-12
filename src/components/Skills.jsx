// Skills.jsx
// Skills section: category cards, each with a responsive grid of skill badges

import React from "react";
import skillsData from "../data/skillsData";
import { useScrollAnimation } from "../hooks/useScrollAnimation";

function SkillBadge({ skill, isDark }) {
  const badgeBg = isDark ? "bg-gray-700" : "bg-[#f7f1e8]";
  const iconBg = isDark ? "bg-gray-600" : "bg-white";
  const textColor = isDark ? "text-gray-200" : "text-[#1e2a3a]";

  return (
    <div
      className={`${badgeBg} rounded-xl flex flex-col items-center gap-2 p-3 sm:p-4 transition-transform duration-200 active:scale-95`}
      title={skill.name}
    >
      <div
        className={`${iconBg} rounded-full p-2 shadow-sm flex items-center justify-center`}
        style={{ width: "48px", height: "48px" }}
      >
        <img
          src={skill.icon}
          alt={`${skill.name} logo`}
          width="28"
          height="28"
          loading="lazy"
          className="w-7 h-7 object-contain"
          style={
            // Invert GitHub icon in dark mode (it's black SVG)
            skill.name === "GitHub" && isDark
              ? { filter: "invert(1)" }
              : {}
          }
          onError={(e) => {
            e.target.src = `https://placehold.co/28x28/d97a4a/fff?text=${skill.name[0]}`;
          }}
        />
      </div>
      <span className={`text-xs font-semibold text-center leading-tight ${textColor}`}>
        {skill.name}
      </span>
    </div>
  );
}

function Skills({ isDark }) {
  useScrollAnimation();

  const cardBg = isDark ? "bg-gray-800" : "bg-white";
  const headingColor = isDark ? "text-gray-100" : "text-[#1e2a3a]";
  const mutedText = isDark ? "text-gray-400" : "text-[#5c6b7a]";
  const categoryLabelColor = isDark ? "text-gray-300" : "text-[#1e2a3a]";

  return (
    <section
      id="skills"
      className="py-14 md:py-20 lg:py-24"
      aria-labelledby="skills-heading"
    >
      <div className="container-max">
        {/* Section Header */}
        <div className="text-center mb-12 scroll-animate">
          <h2
            id="skills-heading"
            className="text-2xl sm:text-3xl lg:text-4xl font-extrabold mb-3"
            style={{ fontFamily: "'Baloo 2', cursive", color: isDark ? "#f3f4f6" : "#1e2a3a" }}
          >
            Skills That Power My Work
          </h2>
          <p className={`text-sm sm:text-base max-w-xl mx-auto ${mutedText}`}>
            A curated set of technologies and tools I use to build, ship, and scale software.
          </p>
        </div>

        {/* Category Cards */}
        <div className="flex flex-col gap-6">
          {skillsData.map((category, idx) => (
            <div
              key={category.category}
              className={`${cardBg} rounded-2xl shadow-sm p-6 sm:p-8 scroll-animate`}
              style={{ transitionDelay: `${idx * 80}ms` }}
            >
              {/* Category Heading */}
              <h3
                className={`text-base sm:text-lg font-bold mb-5 pb-3 border-b text-center ${
                  isDark ? "border-gray-700" : "border-[#e4ddd2]"
                } ${categoryLabelColor}`}
                style={{ fontFamily: "'Baloo 2', cursive" }}
              >
                {category.category}
              </h3>

              {/* Skill Badges Grid */}
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3">
                {category.skills.map((skill) => (
                  <SkillBadge key={skill.name} skill={skill} isDark={isDark} />
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
