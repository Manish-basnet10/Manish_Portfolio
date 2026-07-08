// App.jsx
// Root app component: manages dark mode state, routing, navbar, and footer

import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import HomePage from "./pages/HomePage";
import CertificationsPage from "./pages/CertificationsPage";

function ScrollToHashOnNavigate() {
  const location = useLocation();

  useEffect(() => {
    // Handle hash navigation from other pages (e.g. /#projects from /certifications)
    if (location.hash) {
      const id = location.hash.replace("#", "");
      // Use a short delay to let the page render first
      const timeout = setTimeout(() => {
        const el = document.getElementById(id);
        if (el) el.scrollIntoView({ behavior: "smooth" });
      }, 100);
      return () => clearTimeout(timeout);
    }
  }, [location]);

  return null;
}

function App() {
  const [isDark, setIsDark] = useState(false);

  // Apply/remove "dark" class on <html> whenever state changes
  useEffect(() => {
    const html = document.documentElement;
    if (isDark) {
      html.classList.add("dark");
    } else {
      html.classList.remove("dark");
    }
  }, [isDark]);

  const handleToggle = () => setIsDark((prev) => !prev);

  const pageBg = isDark ? "bg-gray-900" : "bg-[#f7f1e8]";

  return (
    <div className={`min-h-screen flex flex-col ${pageBg} transition-colors duration-300`}>
      {/* Skip to content (accessibility) */}
      <a href="#main-content" className="skip-link">
        Skip to main content
      </a>

      {/* Scroll-to-hash handler */}
      <ScrollToHashOnNavigate />

      {/* Navbar — always visible */}
      <Navbar isDark={isDark} onToggle={handleToggle} />

      {/* Page content */}
      <div className="flex-1">
        <Routes>
          <Route path="/" element={<HomePage isDark={isDark} />} />
          <Route
            path="/certifications"
            element={<CertificationsPage isDark={isDark} />}
          />
        </Routes>
      </div>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default App;
