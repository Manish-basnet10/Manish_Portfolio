// Contact.jsx
// Two-panel contact section: dark navy form panel (left/top) + cream info panel (right/bottom)
// Stacks vertically on mobile; side-by-side on desktop

import React, { useState } from "react";
import { useScrollAnimation } from "../hooks/useScrollAnimation";
import developerData from "../data/developerData";

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

  const [formData, setFormData] = useState({
    name: "",
    email: "",
    subject: "",
    message: "",
  });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

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
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const validation = validate();
    if (Object.keys(validation).length > 0) {
      setErrors(validation);
      return;
    }
    // TODO: Wire up to your backend / email service
    setSubmitted(true);
    setFormData({ name: "", email: "", subject: "", message: "" });
  };

  const infoPanelBg = isDark ? "bg-gray-800" : "bg-[#f7f1e8]";
  const infoPanelHeading = isDark ? "text-gray-100" : "text-[#1e2a3a]";
  const infoPanelMuted = isDark ? "text-gray-400" : "text-[#5c6b7a]";
  const iconBg = isDark ? "bg-gray-700" : "bg-[#e4ddd2]";
  const iconColor = isDark ? "text-gray-300" : "text-[#1e2a3a]";
  const dividerColor = isDark ? "border-gray-700" : "border-[#e4ddd2]";

  return (
    <section
      id="contact"
      className="py-14 md:py-20 lg:py-24"
      aria-labelledby="contact-heading"
    >
      <div className="container-max">
        {/* Combined card wrapper */}
        <div
          className="scroll-animate overflow-hidden shadow-2xl rounded-3xl flex flex-col lg:flex-row"
          style={{ minHeight: "520px" }}
        >
          {/* ===== LEFT / TOP: Form Panel (dark navy) ===== */}
          <div
            className="flex-1 p-8 sm:p-10 lg:p-12"
            style={{ backgroundColor: "#1e2a3a" }}
          >
            {/* Overline */}
            <p
              className="text-xs font-bold tracking-widest uppercase mb-3"
              style={{ color: "#d97a4a" }}
            >
              CONTACT
            </p>

            {/* Heading */}
            <h2
              id="contact-heading"
              className="text-xl sm:text-2xl lg:text-3xl font-extrabold text-white mb-6 leading-snug"
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              Let's Build Something Useful
            </h2>

            {submitted ? (
              <div className="flex flex-col items-start gap-3">
                <div
                  className="flex items-center gap-2 px-4 py-3 rounded-xl"
                  style={{ backgroundColor: "#d97a4a20" }}
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="#d97a4a" strokeWidth="2.5" strokeLinecap="round" aria-hidden="true">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                  <p className="text-white text-sm font-medium">
                    Message sent! I'll get back to you soon.
                  </p>
                </div>
                <button
                  onClick={() => setSubmitted(false)}
                  className="text-sm text-gray-400 underline mt-2 cursor-pointer bg-transparent border-0"
                >
                  Send another message
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} noValidate aria-label="Contact form">
                <div className="flex flex-col gap-4">
                  {/* Name */}
                  <div>
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

                  {/* Email */}
                  <div>
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
                      placeholder="Your message..."
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

                  {/* Submit */}
                  <div>
                    <button
                      type="submit"
                      className="btn-primary w-full sm:w-auto px-8 py-3 rounded-full font-semibold text-sm text-white cursor-pointer border-0"
                      style={{ backgroundColor: "#d97a4a", minHeight: "44px" }}
                    >
                      Send Message
                    </button>
                  </div>
                </div>
              </form>
            )}
          </div>

          {/* ===== RIGHT / BOTTOM: Info Panel (cream) ===== */}
          <div
            className={`flex-shrink-0 lg:w-80 xl:w-96 p-8 sm:p-10 lg:p-12 ${infoPanelBg}`}
          >
            <h3
              className={`text-lg sm:text-xl font-bold mb-3 ${infoPanelHeading}`}
              style={{ fontFamily: "'Baloo 2', cursive" }}
            >
              Contact Information
            </h3>
            <p className={`text-sm leading-relaxed mb-8 ${infoPanelMuted}`}>
              I'm open to freelance work, collaborations, internships, and software opportunities.
            </p>

            {/* Info rows */}
            <div className="flex flex-col gap-0">
              {contactInfo.map((info, idx) => (
                <React.Fragment key={info.id}>
                  <div className="flex items-start gap-4 py-5">
                    {/* Icon badge */}
                    <div
                      className={`flex-shrink-0 flex items-center justify-center rounded-full ${iconBg} ${iconColor}`}
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
          </div>
        </div>
      </div>
    </section>
  );
}

export default Contact;
