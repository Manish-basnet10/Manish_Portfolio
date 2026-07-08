// HomePage.jsx
// Home page ("/") — assembles all home sections in sequence

import React from "react";
import Hero from "../components/Hero";
import Skills from "../components/Skills";
import Services from "../components/Services";
import Projects from "../components/Projects";
import Contact from "../components/Contact";

function HomePage({ isDark }) {
  return (
    <main id="main-content">
      <Hero isDark={isDark} />
      <Skills isDark={isDark} />
      <Services isDark={isDark} />
      <Projects isDark={isDark} />
      <Contact isDark={isDark} />
    </main>
  );
}

export default HomePage;
