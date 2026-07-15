// Contact.jsx
// Premium 3D contact section with glassmorphism, floating elements, and interactive animations
// EmailJS integration preserved for real email delivery

import React, { useState, useRef, useEffect } from "react";
import emailjs from "@emailjs/browser";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import developerData from "../data/developerData";

// ==================== EMAILJS CONFIGURATION ====================
const EMAILJS_SERVICE_ID = "service_7qozwyc";
const EMAILJS_TEMPLATE_ID = "template_n3korm4";
const EMAILJS_PUBLIC_KEY = "0Tmrc41sJYjESKVGc";

// Icon components
function LocationIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6.29 6.29l.96-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <line x1="22" y1="2" x2="11" y2="13" />
      <polygon points="22 2 15 22 11 13 2 9 22 2" />
    </svg>
  );
}

const contactInfo = [
  {
    id: "address",
    icon: <LocationIcon />,
    label: "Address",
    value: developerData.contact.address,
  },
  {
    id: "phone",
    icon: <PhoneIcon />,
    label: "Phone",
    value: developerData.contact.phone,
  },
  {
    id: "email",
    icon: <MailIcon />,
    label: "Email",
    value: developerData.contact.email,
    href: `mailto:${developerData.contact.email}`,
  },
];

/* ─── Floating 3D Orb ─── */
function FloatingOrb({ size, color, top, left, delay, duration }) {
  return (
    <div
      className="contact-floating-orb"
      style={{
        width: size,
        height: size,
        background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}10, transparent)`,
        top,
        left,
        animationDelay: delay || "0s",
        animationDuration: duration || "8s",
      }}
      aria-hidden="true"
    />
  );
}

function Contact({ isDark }) {
  useScrollAnimation();
  const formRef = useRef();
  const cardRef = useRef();

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [sending, setSending] = useState(false);
  const [sendError, setSendError] = useState("");
  const [mousePos, setMousePos] = useState({ x: 0, y: 0 });
  const [isHovering, setIsHovering] = useState(false);

  // 3D tilt effect on card
  useEffect(() => {
    const card = cardRef.current;
    if (!card) return;

    const handleMouseMove = (e) => {
      const rect = card.getBoundingClientRect();
      const x = (e.clientX - rect.left) / rect.width - 0.5;
      const y = (e.clientY - rect.top) / rect.height - 0.5;
      setMousePos({ x, y });
    };

    const handleMouseEnter = () => setIsHovering(true);
    const handleMouseLeave = () => {
      setIsHovering(false);
      setMousePos({ x: 0, y: 0 });
    };

    card.addEventListener("mousemove", handleMouseMove);
    card.addEventListener("mouseenter", handleMouseEnter);
    card.addEventListener("mouseleave", handleMouseLeave);

    return () => {
      card.removeEventListener("mousemove", handleMouseMove);
      card.removeEventListener("mouseenter", handleMouseEnter);
      card.removeEventListener("mouseleave", handleMouseLeave);
    };
  }, []);

  const validate = () => {
    const newErrors = {};
    if (!formData.name.trim()) newErrors.name = "Name is required.";
    if (!formData.email.trim()) newErrors.email = "Email is required.";
    else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email))
      newErrors.email = "Enter a valid email.";
    if (!formData.subject.trim()) newErrors.subject = "Subject is required.";
    if (!formData.message.trim()) newErrors.message = "Message is required.";
    return newErrors;
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    if (errors[e.target.name]) {
      setErrors((prev) => ({ ...prev, [e.target.name]: undefined }));
    }
    if (sendError) setSendError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }

    setSending(true);
    setSendError("");

    try {
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          subject: formData.subject,
          message: formData.message,
          to_name: developerData.name,
        },
        EMAILJS_PUBLIC_KEY
      );
      setSubmitted(true);
      setFormData({ name: "", email: "", subject: "", message: "" });
    } catch (err) {
      setSendError("Failed to send message. Please try again or email me directly.");
    } finally {
      setSending(false);
    }
  };

  // 3D transform calculation
  const tiltX = isHovering ? mousePos.y * -4 : 0;
  const tiltY = isHovering ? mousePos.x * 4 : 0;

  // Theme tokens
  const sectionBg = isDark
    ? "linear-gradient(180deg, transparent 0%, #0d111a 50%, transparent 100%)"
    : "linear-gradient(180deg, transparent 0%, #f5efe6 50%, transparent 100%)";

  const formPanelBg = isDark
    ? "linear-gradient(135deg, #141b2d 0%, #1a2332 50%, #0f1623 100%)"
    : "linear-gradient(135deg, #1a2538 0%, #1e2a3a 50%, #162030 100%)";

  const infoPanelBg = isDark
    ? "linear-gradient(135deg, #1a1f2e 0%, #1e2536 50%, #161b28 100%)"
    : "linear-gradient(135deg, #faf5ee 0%, #f7f1e8 50%, #f3ece0 100%)";

  const infoPanelHeading = isDark ? "#f3f4f6" : "#1e2a3a";
  const infoPanelMuted = isDark ? "#9ca3af" : "#5c6b7a";
  const cardBorder = isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.08)";
  const inputBg = isDark ? "rgba(255,255,255,0.06)" : "rgba(255,255,255,0.08)";
  const inputBorder = isDark ? "rgba(255,255,255,0.1)" : "rgba(255,255,255,0.12)";
  const iconBgColor = isDark ? "rgba(255,255,255,0.08)" : "rgba(30,42,58,0.08)";
  const iconTextColor = isDark ? "#d1d5db" : "#1e2a3a";

  return (
    <section
      id="contact"
      className="contact-3d-section py-14 md:py-20 lg:py-28 relative overflow-hidden"
      aria-labelledby="contact-heading"
      style={{ background: sectionBg }}
    >
      {/* Floating background orbs */}
      <FloatingOrb size="400px" color="#d97a4a" top="-100px" left="-100px" delay="0s" duration="12s" />
      <FloatingOrb size="300px" color="#6366f1" top="60%" left="85%" delay="2s" duration="10s" />
      <FloatingOrb size="200px" color="#d97a4a" top="80%" left="10%" delay="4s" duration="14s" />

      {/* Grid pattern overlay */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: isDark
            ? "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.03) 1px, transparent 0)"
            : "radial-gradient(circle at 1px 1px, rgba(0,0,0,0.03) 1px, transparent 0)",
          backgroundSize: "40px 40px",
        }}
        aria-hidden="true"
      />

      <div className="container-max relative" style={{ zIndex: 2 }}>
        {/* Section header */}
        <div className="text-center scroll-animate" style={{ marginBottom: "60px" }}>
          {/* Accent badge */}
          <div
            className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
            style={{
              background: isDark ? "rgba(217,122,74,0.12)" : "rgba(217,122,74,0.1)",
              border: "1px solid rgba(217,122,74,0.2)",
            }}
          >
            <span
              className="inline-block rounded-full"
              style={{
                width: "6px",
                height: "6px",
                backgroundColor: "#d97a4a",
                animation: "contact-pulse 2s ease-in-out infinite",
              }}
            />
            <span
              style={{
                fontSize: "12px",
                fontWeight: 600,
                letterSpacing: "4px",
                color: "#d97a4a",
                textTransform: "uppercase",
                fontFamily: "'Inter', sans-serif",
              }}
            >
              GET IN TOUCH
            </span>
          </div>

          {/* Hero heading */}
          <h2
            id="contact-heading"
            style={{
              fontFamily: "'Baloo 2', cursive",
              fontWeight: 800,
              lineHeight: 1.1,
              color: isDark ? "#f3f4f6" : "#1e2a3a",
              maxWidth: "900px",
              margin: "0 auto 16px",
              fontSize: "clamp(34px, 5vw, 60px)",
            }}
          >
            Let's Work{" "}
            <span
              style={{
                background: "linear-gradient(135deg, #d97a4a, #e8956a, #d97a4a)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
              }}
            >
              Together
            </span>
          </h2>

          {/* Description */}
          <p
            style={{
              maxWidth: "600px",
              margin: "0 auto",
              fontSize: "clamp(14px, 1.5vw, 16px)",
              lineHeight: 1.7,
              fontWeight: 400,
              fontFamily: "'Inter', sans-serif",
              color: isDark ? "#9ca3af" : "#5c6b7a",
            }}
          >
            Have a project in mind or want to collaborate? Drop me a message and I'll get back to you soon.
          </p>
        </div>

        {/* ─── 3D Tilting Card Container ─── */}
        <div
          className="contact-3d-perspective"
          style={{ perspective: "1200px", maxWidth: "1100px", margin: "0 auto" }}
        >
          <div
            ref={cardRef}
            className="contact-3d-card scroll-animate"
            style={{
              transform: `rotateX(${tiltX}deg) rotateY(${tiltY}deg)`,
              transition: isHovering ? "transform 0.1s ease-out" : "transform 0.5s ease-out",
              transformStyle: "preserve-3d",
              borderRadius: "24px",
              border: `1px solid ${cardBorder}`,
              overflow: "hidden",
              boxShadow: isDark
                ? `0 25px 80px -12px rgba(0,0,0,0.5), 0 0 40px -10px rgba(217,122,74,0.1), inset 0 1px 0 rgba(255,255,255,0.05)`
                : `0 25px 80px -12px rgba(0,0,0,0.15), 0 0 40px -10px rgba(217,122,74,0.08), inset 0 1px 0 rgba(255,255,255,0.5)`,
            }}
          >
            {/* Shine/glare effect on hover */}
            <div
              className="absolute inset-0 pointer-events-none"
              style={{
                background: isHovering
                  ? `radial-gradient(600px circle at ${(mousePos.x + 0.5) * 100}% ${(mousePos.y + 0.5) * 100}%, rgba(217,122,74,0.06), transparent 40%)`
                  : "none",
                zIndex: 10,
                borderRadius: "24px",
                transition: "opacity 0.3s ease",
              }}
              aria-hidden="true"
            />

            <div className="flex flex-col lg:flex-row" style={{ minHeight: "600px" }}>
              {/* ===== LEFT: Form Panel ===== */}
              <div
                className="flex-1 p-8 sm:p-10 lg:p-14 relative overflow-hidden"
                style={{ background: formPanelBg }}
              >
                {/* Decorative mesh gradient */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: "500px",
                    height: "500px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(217,122,74,0.08) 0%, transparent 70%)",
                    top: "-150px",
                    right: "-150px",
                  }}
                  aria-hidden="true"
                />
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: "300px",
                    height: "300px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(99,102,241,0.06) 0%, transparent 70%)",
                    bottom: "-100px",
                    left: "-50px",
                  }}
                  aria-hidden="true"
                />

                {/* Form heading with icon */}
                <div className="relative mb-8">
                  <div className="flex items-center gap-3 mb-3">
                    <div
                      className="flex items-center justify-center rounded-xl"
                      style={{
                        width: "42px",
                        height: "42px",
                        background: "linear-gradient(135deg, #d97a4a, #e8956a)",
                        boxShadow: "0 8px 24px rgba(217,122,74,0.3)",
                      }}
                    >
                      <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                        <polyline points="22,6 12,13 2,6" />
                      </svg>
                    </div>
                    <div>
                      <h3
                        className="text-xl sm:text-2xl font-extrabold text-white leading-snug"
                        style={{ fontFamily: "'Baloo 2', cursive" }}
                      >
                        Send a Message
                      </h3>
                    </div>
                  </div>
                  <p
                    className="text-sm leading-relaxed"
                    style={{ color: "rgba(255,255,255,0.5)", fontFamily: "'Inter', sans-serif" }}
                  >
                    Fill out the form and I'll respond within 24 hours.
                  </p>
                </div>

                {submitted ? (
                  <div className="flex flex-col items-start gap-5 relative">
                    {/* Success animation */}
                    <div
                      className="contact-success-card w-full p-6 rounded-2xl text-center"
                      style={{
                        background: "rgba(217,122,74,0.08)",
                        border: "1px solid rgba(217,122,74,0.2)",
                        backdropFilter: "blur(10px)",
                      }}
                    >
                      <div
                        className="mx-auto mb-4 flex items-center justify-center rounded-full"
                        style={{
                          width: "64px",
                          height: "64px",
                          background: "linear-gradient(135deg, rgba(217,122,74,0.2), rgba(217,122,74,0.05))",
                          animation: "contact-pulse 2s ease-in-out infinite",
                        }}
                      >
                        <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#d97a4a" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <p className="text-white text-lg font-bold mb-1" style={{ fontFamily: "'Baloo 2', cursive" }}>
                        Message Sent Successfully!
                      </p>
                      <p style={{ color: "rgba(255,255,255,0.5)", fontSize: "13px" }}>
                        I'll get back to you as soon as possible.
                      </p>
                    </div>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="text-sm font-semibold cursor-pointer bg-transparent border-0 flex items-center gap-2 mx-auto"
                      style={{ color: "#d97a4a", transition: "opacity 0.2s" }}
                    >
                      <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
                        <polyline points="1 4 1 10 7 10" />
                        <path d="M3.51 15a9 9 0 1 0 2.13-9.36L1 10" />
                      </svg>
                      Send another message
                    </button>
                  </div>
                ) : (
                  <form ref={formRef} onSubmit={handleSubmit} noValidate aria-label="Contact form" className="relative">
                    <div className="flex flex-col gap-5">
                      {/* Name & Email row */}
                      <div className="flex flex-col sm:flex-row gap-4">
                        <div className="flex-1">
                          <label htmlFor="contact-name" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "2px" }}>
                            Your Name
                          </label>
                          <input
                            id="contact-name"
                            name="name"
                            type="text"
                            placeholder="John Doe"
                            value={formData.name}
                            onChange={handleChange}
                            className="contact-3d-input"
                            style={{
                              width: "100%",
                              background: inputBg,
                              color: "#e5e7eb",
                              border: `1px solid ${inputBorder}`,
                              borderRadius: "12px",
                              padding: "14px 18px",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "14px",
                              outline: "none",
                              transition: "all 0.3s ease",
                              backdropFilter: "blur(10px)",
                            }}
                            autoComplete="name"
                            aria-invalid={!!errors.name}
                            aria-describedby={errors.name ? "name-error" : undefined}
                          />
                          {errors.name && (
                            <p id="name-error" className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#f87171" }} role="alert">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                              {errors.name}
                            </p>
                          )}
                        </div>
                        <div className="flex-1">
                          <label htmlFor="contact-email" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "2px" }}>
                            Your Email
                          </label>
                          <input
                            id="contact-email"
                            name="email"
                            type="email"
                            placeholder="john@example.com"
                            value={formData.email}
                            onChange={handleChange}
                            className="contact-3d-input"
                            style={{
                              width: "100%",
                              background: inputBg,
                              color: "#e5e7eb",
                              border: `1px solid ${inputBorder}`,
                              borderRadius: "12px",
                              padding: "14px 18px",
                              fontFamily: "'Inter', sans-serif",
                              fontSize: "14px",
                              outline: "none",
                              transition: "all 0.3s ease",
                              backdropFilter: "blur(10px)",
                            }}
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            aria-describedby={errors.email ? "email-error" : undefined}
                          />
                          {errors.email && (
                            <p id="email-error" className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#f87171" }} role="alert">
                              <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                              {errors.email}
                            </p>
                          )}
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label htmlFor="contact-subject" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "2px" }}>
                          Subject
                        </label>
                        <input
                          id="contact-subject"
                          name="subject"
                          type="text"
                          placeholder="What's this about?"
                          value={formData.subject}
                          onChange={handleChange}
                          className="contact-3d-input"
                          style={{
                            width: "100%",
                            background: inputBg,
                            color: "#e5e7eb",
                            border: `1px solid ${inputBorder}`,
                            borderRadius: "12px",
                            padding: "14px 18px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px",
                            outline: "none",
                            transition: "all 0.3s ease",
                            backdropFilter: "blur(10px)",
                          }}
                          aria-invalid={!!errors.subject}
                          aria-describedby={errors.subject ? "subject-error" : undefined}
                        />
                        {errors.subject && (
                          <p id="subject-error" className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#f87171" }} role="alert">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            {errors.subject}
                          </p>
                        )}
                      </div>

                      {/* Message */}
                      <div>
                        <label htmlFor="contact-message" className="block text-xs font-semibold uppercase tracking-wider mb-2" style={{ color: "rgba(255,255,255,0.4)", letterSpacing: "2px" }}>
                          Message
                        </label>
                        <textarea
                          id="contact-message"
                          name="message"
                          placeholder="Tell me about your project..."
                          rows={5}
                          value={formData.message}
                          onChange={handleChange}
                          className="contact-3d-input resize-none"
                          style={{
                            width: "100%",
                            background: inputBg,
                            color: "#e5e7eb",
                            border: `1px solid ${inputBorder}`,
                            borderRadius: "12px",
                            padding: "14px 18px",
                            fontFamily: "'Inter', sans-serif",
                            fontSize: "14px",
                            outline: "none",
                            transition: "all 0.3s ease",
                            backdropFilter: "blur(10px)",
                          }}
                          aria-invalid={!!errors.message}
                          aria-describedby={errors.message ? "message-error" : undefined}
                        />
                        {errors.message && (
                          <p id="message-error" className="text-xs mt-1.5 flex items-center gap-1" style={{ color: "#f87171" }} role="alert">
                            <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor"><circle cx="12" cy="12" r="10" opacity="0.2"/><path d="M12 8v5M12 16h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/></svg>
                            {errors.message}
                          </p>
                        )}
                      </div>

                      {/* Error message */}
                      {sendError && (
                        <p className="text-xs flex items-center gap-1.5" style={{ color: "#f87171" }} role="alert">
                          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"/><line x1="15" y1="9" x2="9" y2="15"/><line x1="9" y1="9" x2="15" y2="15"/></svg>
                          {sendError}
                        </p>
                      )}

                      {/* Submit button */}
                      <div className="pt-2">
                        <button
                          type="submit"
                          disabled={sending}
                          className="contact-3d-btn group w-full sm:w-auto px-10 py-4 rounded-xl font-semibold text-sm text-white cursor-pointer border-0 flex items-center justify-center gap-2.5 relative overflow-hidden"
                          style={{
                            background: sending
                              ? "linear-gradient(135deg, #b5633a, #a55830)"
                              : "linear-gradient(135deg, #d97a4a, #e8956a)",
                            minHeight: "48px",
                            fontFamily: "'Inter', sans-serif",
                            letterSpacing: "0.05em",
                            fontWeight: 600,
                            opacity: sending ? 0.8 : 1,
                            transition: "all 0.3s ease",
                            boxShadow: sending
                              ? "none"
                              : "0 8px 30px rgba(217,122,74,0.35), inset 0 1px 0 rgba(255,255,255,0.2)",
                            textTransform: "uppercase",
                          }}
                        >
                          {/* Button shine effect */}
                          <span
                            className="absolute inset-0 pointer-events-none"
                            style={{
                              background: "linear-gradient(105deg, transparent 40%, rgba(255,255,255,0.15) 45%, rgba(255,255,255,0.05) 55%, transparent 60%)",
                              transform: "translateX(-100%)",
                              animation: sending ? "none" : "contact-btn-shine 3s ease-in-out infinite",
                            }}
                          />
                          {sending ? (
                            <>
                              <svg className="animate-spin" width="18" height="18" viewBox="0 0 24 24" fill="none" aria-hidden="true">
                                <circle cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="3" strokeDasharray="32" strokeDashoffset="8" strokeLinecap="round" />
                              </svg>
                              Sending...
                            </>
                          ) : (
                            <>
                              <SendIcon />
                              Send Message
                            </>
                          )}
                        </button>
                      </div>
                    </div>
                  </form>
                )}
              </div>

              {/* ===== RIGHT: Info Panel ===== */}
              <div
                className="flex-1 p-8 sm:p-10 lg:p-14 relative overflow-hidden flex flex-col justify-between"
                style={{ background: infoPanelBg }}
              >
                {/* Decorative elements */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    width: "350px",
                    height: "350px",
                    borderRadius: "50%",
                    background: "radial-gradient(circle, rgba(217,122,74,0.06) 0%, transparent 70%)",
                    bottom: "-100px",
                    right: "-100px",
                  }}
                  aria-hidden="true"
                />
                {/* Decorative line pattern */}
                <div
                  className="absolute pointer-events-none"
                  style={{
                    top: "40px",
                    right: "40px",
                    width: "80px",
                    height: "80px",
                    opacity: isDark ? 0.06 : 0.08,
                  }}
                  aria-hidden="true"
                >
                  {[0, 1, 2, 3].map((i) => (
                    <div
                      key={i}
                      style={{
                        position: "absolute",
                        width: `${80 - i * 20}px`,
                        height: `${80 - i * 20}px`,
                        border: `1px solid ${isDark ? "#fff" : "#1e2a3a"}`,
                        borderRadius: "12px",
                        top: `${i * 10}px`,
                        left: `${i * 10}px`,
                        transform: `rotate(${i * 15}deg)`,
                      }}
                    />
                  ))}
                </div>

                <div className="relative">
                  <h3
                    className="text-xl sm:text-2xl font-bold mb-3"
                    style={{ fontFamily: "'Baloo 2', cursive", color: infoPanelHeading }}
                  >
                    Contact Information
                  </h3>
                  <p
                    className="text-sm leading-relaxed mb-10"
                    style={{ fontFamily: "'Inter', sans-serif", color: infoPanelMuted, maxWidth: "320px" }}
                  >
                    I'm open to freelance work, collaborations, internships, and software opportunities.
                  </p>

                  {/* Info rows with 3D hover cards */}
                  <div className="flex flex-col gap-3 relative">
                    {contactInfo.map((info) => (
                      <div
                        key={info.id}
                        className="contact-info-card flex items-center gap-4 p-4 rounded-2xl transition-all duration-300 group"
                        style={{
                          background: isDark ? "rgba(255,255,255,0.03)" : "rgba(30,42,58,0.03)",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.05)" : "rgba(0,0,0,0.05)"}`,
                        }}
                      >
                        {/* Icon badge */}
                        <div
                          className="flex-shrink-0 flex items-center justify-center rounded-xl transition-all duration-300 group-hover:scale-110"
                          style={{
                            width: "48px",
                            height: "48px",
                            background: isDark
                              ? "linear-gradient(135deg, rgba(217,122,74,0.12), rgba(217,122,74,0.05))"
                              : "linear-gradient(135deg, rgba(217,122,74,0.1), rgba(217,122,74,0.03))",
                            color: "#d97a4a",
                            boxShadow: "0 4px 12px rgba(217,122,74,0.1)",
                          }}
                        >
                          {info.icon}
                        </div>
                        <div>
                          <p
                            className="text-xs font-semibold uppercase tracking-wider mb-0.5"
                            style={{ color: infoPanelMuted, letterSpacing: "2px", fontSize: "10px" }}
                          >
                            {info.label}
                          </p>
                          {info.href ? (
                            <a
                              href={info.href}
                              className="text-sm font-medium no-underline hover:underline"
                              style={{ color: infoPanelHeading, transition: "color 0.2s ease" }}
                            >
                              {info.value}
                            </a>
                          ) : (
                            <p className="text-sm font-medium" style={{ color: infoPanelHeading }}>
                              {info.value}
                            </p>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Social connect */}
                <div
                  className="mt-10 pt-6 relative"
                  style={{ borderTop: `1px solid ${isDark ? "rgba(255,255,255,0.06)" : "rgba(0,0,0,0.06)"}` }}
                >
                  <p
                    className="text-xs font-semibold uppercase tracking-wider mb-4"
                    style={{ color: infoPanelMuted, letterSpacing: "3px", fontSize: "10px" }}
                  >
                    Connect with me
                  </p>
                  <div className="flex gap-3">
                    {developerData.socials.github && (
                      <a
                        href={developerData.socials.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub"
                        className="contact-social-btn flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
                        style={{
                          width: "44px",
                          height: "44px",
                          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,42,58,0.05)",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                          color: iconTextColor,
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                        </svg>
                      </a>
                    )}
                    {developerData.socials.linkedin && (
                      <a
                        href={developerData.socials.linkedin}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="LinkedIn"
                        className="contact-social-btn flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
                        style={{
                          width: "44px",
                          height: "44px",
                          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,42,58,0.05)",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                          color: iconTextColor,
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                        </svg>
                      </a>
                    )}
                    {developerData.socials.twitter && (
                      <a
                        href={developerData.socials.twitter}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Twitter"
                        className="contact-social-btn flex items-center justify-center rounded-xl transition-all duration-300 hover:scale-110"
                        style={{
                          width: "44px",
                          height: "44px",
                          background: isDark ? "rgba(255,255,255,0.05)" : "rgba(30,42,58,0.05)",
                          border: `1px solid ${isDark ? "rgba(255,255,255,0.08)" : "rgba(0,0,0,0.06)"}`,
                          color: iconTextColor,
                        }}
                      >
                        <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                          <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                        </svg>
                      </a>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Component-scoped CSS animations */}
      <style>{`
        .contact-floating-orb {
          position: absolute;
          border-radius: 50%;
          pointer-events: none;
          animation: contact-float ease-in-out infinite;
          z-index: 0;
          filter: blur(60px);
        }

        @keyframes contact-float {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -30px) scale(1.05); }
          50% { transform: translate(-10px, 20px) scale(0.95); }
          75% { transform: translate(15px, 10px) scale(1.02); }
        }

        @keyframes contact-pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.5; transform: scale(1.5); }
        }

        @keyframes contact-btn-shine {
          0% { transform: translateX(-100%); }
          20% { transform: translateX(100%); }
          100% { transform: translateX(100%); }
        }

        .contact-3d-input::placeholder {
          color: rgba(255,255,255,0.25);
        }

        .contact-3d-input:focus {
          border-color: #d97a4a !important;
          box-shadow: 0 0 0 3px rgba(217,122,74,0.15), 0 4px 16px rgba(217,122,74,0.1);
          background: rgba(255,255,255,0.08) !important;
        }

        .contact-info-card:hover {
          background: ${isDark ? "rgba(255,255,255,0.06)" : "rgba(30,42,58,0.06)"} !important;
          border-color: ${isDark ? "rgba(255,255,255,0.1)" : "rgba(0,0,0,0.1)"} !important;
          transform: translateX(4px);
          box-shadow: 0 4px 20px ${isDark ? "rgba(0,0,0,0.2)" : "rgba(0,0,0,0.06)"};
        }

        .contact-social-btn:hover {
          background: rgba(217,122,74,0.12) !important;
          border-color: rgba(217,122,74,0.25) !important;
          color: #d97a4a !important;
          box-shadow: 0 4px 16px rgba(217,122,74,0.15);
        }

        .contact-3d-btn:hover:not(:disabled) {
          transform: translateY(-2px);
          box-shadow: 0 12px 40px rgba(217,122,74,0.45), inset 0 1px 0 rgba(255,255,255,0.2) !important;
        }

        .contact-3d-btn:active:not(:disabled) {
          transform: translateY(0);
        }

        .contact-success-card {
          animation: contact-success-in 0.5s cubic-bezier(0.34, 1.56, 0.64, 1);
        }

        @keyframes contact-success-in {
          0% { opacity: 0; transform: scale(0.9) translateY(10px); }
          100% { opacity: 1; transform: scale(1) translateY(0); }
        }

        @media (max-width: 1024px) {
          .contact-3d-card {
            transform: none !important;
          }
        }
      `}</style>
    </section>
  );
}

export default Contact;
