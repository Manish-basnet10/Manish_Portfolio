// Navbar.jsx
// Sticky top navbar with:
// - Colorful letter-tile logo ("MANISH")
// - Desktop nav links (anchor links + router link to /certifications)
// - Mobile hamburger menu with slide-in drawer
// - Dark mode toggle
// - Active link detection

import React, { useState, useEffect, useCallback } from "react";
import { Link, useLocation } from "react-router-dom";
import DarkModeToggle from "./DarkModeToggle";

// ==================== LOGO ====================
const LETTER_TILES = [
  { letter: "M", color: "#e63946", rotate: "-3deg" },
  { letter: "A", color: "#457b9d", rotate: "2deg" },
  { letter: "N", color: "#c9b458", rotate: "-2deg" },
  { letter: "I", color: "#6a4c93", rotate: "3deg" },
  { letter: "S", color: "#e8823a", rotate: "-1deg" },
  { letter: "H", color: "#e63946", rotate: "2deg" },
];

function Logo() {
  return (
    <Link
      to="/"
      className="flex items-center gap-0.5 sm:gap-1 no-underline"
      aria-label="Manish Basnet — go to home page"
    >
      {LETTER_TILES.map(({ letter, color, rotate }) => (
        <span
          key={letter + color}
          style={{
            backgroundColor: color,
            transform: `rotate(${rotate})`,
            display: "inline-flex",
            alignItems: "center",
            justifyContent: "center",
            width: "clamp(24px, 6vw, 34px)",
            height: "clamp(24px, 6vw, 34px)",
            borderRadius: "6px",
            fontFamily: "'Baloo 2', cursive",
            fontWeight: "800",
            fontSize: "clamp(12px, 3vw, 17px)",
            color: "#fff",
            flexShrink: 0,
            lineHeight: 1,
            userSelect: "none",
          }}
        >
          {letter}
        </span>
      ))}
    </Link>
  );
}

// ==================== NAV LINKS CONFIG ====================
function getNavLinks(pathname) {
  if (pathname === "/certifications") {
    return [
      { label: "Home", to: "/", type: "route" },
      { label: "Projects", to: "/#projects", type: "anchor" },
      { label: "Contact", to: "/#contact", type: "anchor" },
    ];
  }
  return [
    { label: "Home", to: "/", type: "route", anchor: "top" },
    { label: "Certifications", to: "/certifications", type: "route" },
    { label: "Skills", to: "#skills", type: "anchor" },
    { label: "Services", to: "#services", type: "anchor" },
    { label: "Projects", to: "#projects", type: "anchor" },
    { label: "Contact", to: "#contact", type: "anchor" },
  ];
}

// ==================== HAMBURGER ICON ====================
function HamburgerIcon({ isOpen }) {
  return (
    <svg
      width="22"
      height="22"
      viewBox="0 0 22 22"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      aria-hidden="true"
    >
      {isOpen ? (
        <>
          <line x1="4" y1="4" x2="18" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="18" y1="4" x2="4" y2="18" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </>
      ) : (
        <>
          <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
        </>
      )}
    </svg>
  );
}

// ==================== MAIN NAVBAR ====================
function Navbar({ isDark, onToggle }) {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [activeSection, setActiveSection] = useState("top");
  const location = useLocation();
  const navLinks = getNavLinks(location.pathname);

  // Close drawer on route change
  useEffect(() => {
    setDrawerOpen(false);
  }, [location]);

  // Prevent body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [drawerOpen]);

  // Active section via IntersectionObserver
  useEffect(() => {
    if (location.pathname !== "/") return;
    const sectionIds = ["skills", "services", "projects", "contact"];
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) setActiveSection(entry.target.id);
        });
      },
      { rootMargin: "-80px 0px -60% 0px", threshold: 0 }
    );
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) observer.observe(el);
    });
    return () => observer.disconnect();
  }, [location.pathname]);

  const handleAnchorClick = useCallback((e, href) => {
    if (href.startsWith("#")) {
      e.preventDefault();
      const id = href.replace("#", "");
      const el = document.getElementById(id);
      if (el) el.scrollIntoView({ behavior: "smooth" });
      setDrawerOpen(false);
    } else if (href.startsWith("/#")) {
      setDrawerOpen(false);
    }
  }, []);

  const isActive = (link) => {
    if (link.type === "route") {
      return location.pathname === link.to;
    }
    if (link.type === "anchor") {
      const sectionId = link.to.replace("#", "").replace("/#", "");
      return activeSection === sectionId;
    }
    return false;
  };

  const navBg = isDark
    ? "bg-gray-900/80 border-gray-800/80 backdrop-blur-md shadow-sm"
    : "bg-white/80 border-[#e4ddd2]/60 backdrop-blur-md shadow-sm";

  const textColor = isDark ? "text-gray-100" : "text-[#1e2a3a]";

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 ${navBg} border-b transition-all duration-300`}
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="container-max">
          <div className="flex items-center justify-between h-16 sm:h-18">
            {/* Logo */}
            <Logo />

            {/* Desktop Nav Links */}
            <ul className="hidden lg:flex items-center gap-1 list-none m-0 p-0">
              {navLinks.map((link) => {
                const active = isActive(link);
                return (
                  <li key={link.label}>
                    {link.type === "route" ? (
                      <Link
                        to={link.to}
                        className={`nav-link-animated px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 no-underline ${
                          active
                            ? "bg-[#d97a4a]/15 text-[#d97a4a] font-semibold"
                            : `${textColor} hover:text-[#d97a4a]`
                        }`}
                        aria-current={active ? "page" : undefined}
                      >
                        {link.label}
                      </Link>
                    ) : (
                      <a
                        href={link.to}
                        onClick={(e) => handleAnchorClick(e, link.to)}
                        className={`nav-link-animated px-3 py-1.5 rounded-full text-sm font-medium transition-all duration-200 no-underline cursor-pointer ${
                          active
                            ? "bg-[#d97a4a]/15 text-[#d97a4a] font-semibold"
                            : `${textColor} hover:text-[#d97a4a]`
                        }`}
                      >
                        {link.label}
                      </a>
                    )}
                  </li>
                );
              })}
            </ul>

            {/* Right controls */}
            <div className="flex items-center gap-2">
              <DarkModeToggle isDark={isDark} onToggle={onToggle} />

              {/* Hamburger (mobile/tablet) */}
              <button
                className={`lg:hidden flex items-center justify-center w-10 h-10 rounded-lg transition-colors duration-200 cursor-pointer ${
                  isDark ? "text-gray-100 hover:bg-gray-700" : "text-[#1e2a3a] hover:bg-[#e4ddd2]"
                }`}
                style={{ minWidth: "44px", minHeight: "44px" }}
                onClick={() => setDrawerOpen((v) => !v)}
                aria-label={drawerOpen ? "Close navigation menu" : "Open navigation menu"}
                aria-expanded={drawerOpen}
                aria-controls="mobile-drawer"
              >
                <HamburgerIcon isOpen={drawerOpen} />
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Drawer Overlay */}
      <div
        className={`fixed inset-0 z-40 transition-opacity duration-300 lg:hidden ${
          drawerOpen ? "opacity-100 pointer-events-auto" : "opacity-0 pointer-events-none"
        }`}
        style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
        onClick={() => setDrawerOpen(false)}
        aria-hidden="true"
      />

      {/* Mobile Drawer */}
      <div
        id="mobile-drawer"
        role="dialog"
        aria-modal="true"
        aria-label="Navigation menu"
        className={`fixed top-0 right-0 z-50 h-full w-72 max-w-[85vw] transition-transform duration-300 ease-in-out lg:hidden ${
          drawerOpen ? "translate-x-0" : "translate-x-full"
        } ${isDark ? "bg-gray-900" : "bg-[#f7f1e8]"}`}
      >
        {/* Drawer Header */}
        <div
          className={`flex items-center justify-between px-6 py-4 border-b ${
            isDark ? "border-gray-700" : "border-[#e4ddd2]"
          }`}
        >
          <Logo />
          <button
            onClick={() => setDrawerOpen(false)}
            aria-label="Close navigation menu"
            className={`flex items-center justify-center w-10 h-10 rounded-lg cursor-pointer ${
              isDark ? "text-gray-100 hover:bg-gray-700" : "text-[#1e2a3a] hover:bg-[#e4ddd2]"
            }`}
            style={{ minWidth: "44px", minHeight: "44px" }}
          >
            <svg width="20" height="20" viewBox="0 0 20 20" fill="none" aria-hidden="true">
              <line x1="4" y1="4" x2="16" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
              <line x1="16" y1="4" x2="4" y2="16" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            </svg>
          </button>
        </div>

        {/* Drawer Links */}
        <ul className="flex flex-col gap-1 p-4 list-none m-0">
          {navLinks.map((link) => {
            const active = isActive(link);
            const commonClass = `flex items-center px-4 py-3 rounded-xl text-base font-medium no-underline transition-all duration-200 cursor-pointer min-h-[44px] ${
              active
                ? "bg-[#d97a4a]/15 text-[#d97a4a] font-semibold"
                : isDark
                ? "text-gray-200 hover:bg-gray-700"
                : "text-[#1e2a3a] hover:bg-[#e4ddd2]"
            }`;
            return (
              <li key={link.label}>
                {link.type === "route" ? (
                  <Link
                    to={link.to}
                    className={commonClass}
                    onClick={() => setDrawerOpen(false)}
                    aria-current={active ? "page" : undefined}
                  >
                    {link.label}
                  </Link>
                ) : (
                  <a
                    href={link.to}
                    className={commonClass}
                    onClick={(e) => handleAnchorClick(e, link.to)}
                  >
                    {link.label}
                  </a>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </>
  );
}

export default Navbar;
