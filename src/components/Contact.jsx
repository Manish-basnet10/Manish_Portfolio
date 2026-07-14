// Contact.jsx
// Two-panel contact section: dark navy form panel (left/top) + info panel (right/bottom)
// Balanced layout with EmailJS integration for real email delivery

import React, { useState, useRef } from "react";
import emailjs from "@emailjs/browser";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import developerData from "../data/developerData";

// ==================== EMAILJS CONFIGURATION ====================
// Replace these with your actual EmailJS credentials:
// 1. Sign up at https://www.emailjs.com
// 2. Create an Email Service (e.g., Gmail) → copy SERVICE_ID
// 3. Create an Email Template → copy TEMPLATE_ID
// 4. Go to Account → copy PUBLIC_KEY
const EMAILJS_SERVICE_ID = "YOUR_SERVICE_ID";
const EMAILJS_TEMPLATE_ID = "YOUR_TEMPLATE_ID";
const EMAILJS_PUBLIC_KEY = "YOUR_PUBLIC_KEY";

// Icon components
function LocationIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M21 10c0 7-9 13-9 13s-9-6-9-13a9 9 0 0 1 18 0z" />
      <circle cx="12" cy="10" r="3" />
    </svg>
  );
}

function PhoneIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07A19.5 19.5 0 0 1 4.69 12a19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 3.61 1h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L7.91 8.59a16 16 0 0 0 6.29 6.29l.96-.86a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92z" />
    </svg>
  );
}

function MailIcon() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
      <polyline points="22,6 12,13 2,6" />
    </svg>
  );
}

function SendIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

function Contact({ isDark }) {
  useScrollAnimation();
  const formRef = useRef();

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

  // Theme-aware styles
  const infoPanelBg = isDark ? "#1a1f2e" : "#f7f1e8";
  const infoPanelHeading = isDark ? "text-gray-100" : "text-[#1e2a3a]";
  const infoPanelMuted = isDark ? "text-gray-400" : "text-[#5c6b7a]";
  const iconBg = isDark ? "bg-gray-700" : "bg-[#e4ddd2]";
  const iconColor = isDark ? "text-gray-300" : "text-[#1e2a3a]";
  const dividerColor = isDark ? "border-gray-700/50" : "border-[#e4ddd2]";

  return (
    <section
      id="contact"
      className="py-14 md:py-20 lg:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="container-max">
        {/* Section header */}
        <div className="scroll-animate text-center mb-12">
          <p
            className="text-xs font-bold tracking-widest uppercase mb-3"
            style={{ color: "#d97a4a" }}
          >
            GET IN TOUCH
          </p>
          <h2
            id="contact-heading"
            className={`text-3xl sm:text-4xl lg:text-5xl font-extrabold mb-4 ${isDark ? "text-gray-100" : "text-[#1e2a3a]"}`}
            style={{ fontFamily: "'Baloo 2', cursive" }}
          >
            Let's Work Together
          </h2>
          <p
            className={`text-sm sm:text-base max-w-lg mx-auto ${isDark ? "text-gray-400" : "text-[#5c6b7a]"}`}
            style={{ fontFamily: "'Inter', sans-serif" }}
          >
            Have a project in mind or want to collaborate? Drop me a message and I'll get back to you soon.
          </p>
        </div>

        {/* Two-panel card */}
        <div
          className="scroll-animate overflow-hidden shadow-2xl rounded-3xl flex flex-col lg:flex-row max-w-5xl mx-auto"
          style={{ minHeight: "520px" }}
        >
          {/* ===== LEFT / TOP: Form Panel (dark navy) ===== */}
          <div
            className="flex-1 p-8 sm:p-10 lg:p-12 relative overflow-hidden"
            style={{ backgroundColor: "#1e2a3a" }}
          >
            {/* Decorative gradient orb */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "300px",
                height: "300px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #d97a4a15 0%, transparent 70%)",
                top: "-80px",
                right: "-80px",
              }}
              aria-hidden="true"
            />

            {/* Heading */}
            <h3
              className="text-xl sm:text-2xl font-extrabold text-white mb-2 leading-snug relative"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              Send a Message
            </h3>
            <p className="text-sm text-gray-400 mb-6 relative" style={{ fontFamily: "'Inter', sans-serif" }}>
              Fill out the form and I'll respond within 24 hours.
            </p>

            {submitted ? (
              <div className="flex flex-col items-start gap-4 relative">
                <div
                  className="flex items-center gap-3 px-5 py-4 rounded-2xl w-full"
                  style={{ backgroundColor: "#d97a4a15", border: "1px solid #d97a4a30" }}
                >
                  <div
                    className="flex items-center justify-center flex-shrink-0 rounded-full"
                    style={{ width: "40px", height: "40px", backgroundColor: "#d97a4a25" }}
                  >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97a4a" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                      <polyline points="20 6 9 17 4 12" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-white text-sm font-semibold mb-0.5">Message Sent!</p>
                    <p className="text-gray-400 text-xs">I'll get back to you as soon as possible.</p>
                  </div>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm font-medium cursor-pointer bg-transparent border-0 flex items-center gap-1.5"
                  style={{ color: "#d97a4a" }}
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
                <div className="flex flex-col gap-4">
                  {/* Name & Email row */}
                  <div className="flex flex-col sm:flex-row gap-4">
                    <div className="flex-1">
                      <label htmlFor="contact-name" className="sr-only">Your name</label>
                      <input
                        id="contact-name"
                        name="name"
                        type="text"
                        placeholder="Your Name"
                        value={formData.name}
                        onChange={handleChange}
                        className="form-input"
                        autoComplete="name"
                        aria-invalid={!!errors.name}
                        aria-describedby={errors.name ? "name-error" : undefined}
                      />
                      {errors.name && (
                        <p id="name-error" className="text-xs mt-1" style={{ color: "#f87171" }} role="alert">{errors.name}</p>
                      )}
                    </div>
                    <div className="flex-1">
                      <label htmlFor="contact-email" className="sr-only">Your email</label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        placeholder="Your Email"
                        value={formData.email}
                        onChange={handleChange}
                        className="form-input"
                        autoComplete="email"
                        aria-invalid={!!errors.email}
                        aria-describedby={errors.email ? "email-error" : undefined}
                      />
                      {errors.email && (
                        <p id="email-error" className="text-xs mt-1" style={{ color: "#f87171" }} role="alert">{errors.email}</p>
                      )}
                    </div>
                  </div>

                  {/* Subject */}
                  <div>
                    <label htmlFor="contact-subject" className="sr-only">Subject</label>
                    <input
                      id="contact-subject"
                      name="subject"
                      type="text"
                      placeholder="Subject"
                      value={formData.subject}
                      onChange={handleChange}
                      className="form-input"
                      aria-invalid={!!errors.subject}
                      aria-describedby={errors.subject ? "subject-error" : undefined}
                    />
                    {errors.subject && (
                      <p id="subject-error" className="text-xs mt-1" style={{ color: "#f87171" }} role="alert">{errors.subject}</p>
                    )}
                  </div>

                  {/* Message */}
                  <div>
                    <label htmlFor="contact-message" className="sr-only">Message</label>
                    <textarea
                      id="contact-message"
                      name="message"
                      placeholder="Write your message here..."
                      rows={5}
                      value={formData.message}
                      onChange={handleChange}
                      className="form-input resize-none"
                      aria-invalid={!!errors.message}
                      aria-describedby={errors.message ? "message-error" : undefined}
                    />
                    {errors.message && (
                      <p id="message-error" className="text-xs mt-1" style={{ color: "#f87171" }} role="alert">{errors.message}</p>
                    )}
                  </div>

                  {/* Error message */}
                  {sendError && (
                    <p className="text-xs" style={{ color: "#f87171" }} role="alert">{sendError}</p>
                  )}

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      disabled={sending}
                      className="btn-primary w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-sm text-white cursor-pointer border-0 flex items-center justify-center gap-2"
                      style={{
                        backgroundColor: sending ? "#b5633a" : "#d97a4a",
                        minHeight: "44px",
                        fontFamily: "'Inter', sans-serif",
                        letterSpacing: "0.03em",
                        opacity: sending ? 0.8 : 1,
                        transition: "all 0.2s ease",
                      }}
                    >
                      {sending ? (
                        <>
                          <svg className="animate-spin" width="16" height="16" viewBox="0 0 24 24" fill="none" aria-hidden="true">
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

          {/* ===== RIGHT / BOTTOM: Info Panel ===== */}
          <div
            className="flex-1 p-8 sm:p-10 lg:p-12 relative overflow-hidden"
            style={{ backgroundColor: infoPanelBg }}
          >
            {/* Decorative gradient orb */}
            <div
              className="absolute pointer-events-none"
              style={{
                width: "250px",
                height: "250px",
                borderRadius: "50%",
                background: "radial-gradient(circle, #d97a4a10 0%, transparent 70%)",
                bottom: "-60px",
                left: "-60px",
              }}
              aria-hidden="true"
            />

            <h3
              className={`text-xl sm:text-2xl font-bold mb-2 relative ${infoPanelHeading}`}
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              Contact Information
            </h3>
            <p
              className={`text-sm leading-relaxed mb-8 relative ${infoPanelMuted}`}
              style={{ fontFamily: "'Inter', sans-serif" }}
            >
              I'm open to freelance work, collaborations, internships, and software opportunities.
            </p>

            {/* Info rows */}
            <div className="flex flex-col gap-0 relative">
              {contactInfo.map((info, idx) => (
                <React.Fragment key={info.id}>
                  <div className="flex items-start gap-4 py-5 group">
                    {/* Icon badge */}
                    <div
                      className={`flex-shrink-0 flex items-center justify-center rounded-full ${iconBg} ${iconColor} transition-transform duration-200 group-hover:scale-110`}
                      style={{ width: "44px", height: "44px" }}
                    >
                      {info.icon}
                    </div>
                    <div>
                      <p className={`text-xs font-semibold uppercase tracking-widest mb-0.5 ${infoPanelMuted}`}>
                        {info.label}
                      </p>
                      {info.href ? (
                        <a
                          href={info.href}
                          className={`text-sm font-medium no-underline hover:underline ${infoPanelHeading}`}
                          style={{ transition: "color 0.2s ease" }}
                        >
                          {info.value}
                        </a>
                      ) : (
                        <p className={`text-sm font-medium ${infoPanelHeading}`}>
                          {info.value}
                        </p>
                      )}
                    </div>
                  </div>
                  {idx < contactInfo.length - 1 && (
                    <hr className={`border-t ${dividerColor} m-0`} />
                  )}
                </React.Fragment>
              ))}
            </div>

            {/* Social connect prompt */}
            <div className="mt-8 pt-6 relative" style={{ borderTop: `1px solid ${isDark ? "#ffffff10" : "#e4ddd2"}` }}>
              <p
                className={`text-xs font-semibold uppercase tracking-widest mb-3 ${infoPanelMuted}`}
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
                    className={`flex items-center justify-center rounded-full ${iconBg} ${iconColor} transition-all duration-200 hover:scale-110`}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                    className={`flex items-center justify-center rounded-full ${iconBg} ${iconColor} transition-all duration-200 hover:scale-110`}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
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
                    className={`flex items-center justify-center rounded-full ${iconBg} ${iconColor} transition-all duration-200 hover:scale-110`}
                    style={{ width: "40px", height: "40px" }}
                  >
                    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                      <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                    </svg>
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
