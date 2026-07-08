// Footer.jsx
// Full-width dark navy footer with centered copyright text

import React from "react";

function Footer() {
  return (
    <footer
      className="w-full py-6 px-4"
      style={{ backgroundColor: "#1e2a3a" }}
      role="contentinfo"
    >
      <div className="container-max">
        <p
          className="text-center text-sm text-gray-400 leading-relaxed"
          style={{ fontFamily: "'Inter', sans-serif" }}
        >
          © 2026 Manish Basnet. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
