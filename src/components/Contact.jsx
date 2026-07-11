import React, { useEffect, useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import "./Contact.css";

/**
 * Contact Us — sits after Clients, before the Footer.
 * Dark background to bookend the Header, same scroll-reveal pattern
 * used across every other section on the page.
 */
const DEFAULT_EMAILJS_SERVICE_ID = "service_3f5sv6f";
const DEFAULT_EMAILJS_TEMPLATE_ID = "template_05yhrcn";
const DEFAULT_EMAILJS_PUBLIC_KEY = "6V2_ZLQ2IzGEDboLY";

const CONTACT_INFO = [
  {
    label: "Visit Us",
    value: "Amman, Jordan",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" />
        <circle cx="12" cy="10" r="3" />
      </svg>
    ),
  },
  {
    label: "Call Us",
    value: "+962 6 560 7140",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72c.127.96.361 1.903.7 2.81a2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45c.907.339 1.85.573 2.81.7A2 2 0 0 1 22 16.92Z" />
      </svg>
    ),
  },
  {
    label: "Email Us",
    value: "info@ihcc-jo.com",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <rect x="2" y="4" width="20" height="16" rx="2" />
        <path d="m22 6-10 7L2 6" />
      </svg>
    ),
  },
  {
    label: "Working Hours",
    value: "Sun \u2013 Thu, 8:00 AM \u2013 5:00 PM",
    icon: (
      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M12 6v6l4 2" />
      </svg>
    ),
  },
];

export default function Contact() {
  const sectionRef = useRef(null);
  const formRef = useRef(null);
  const [isVisible, setIsVisible] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState("idle");
  const [submitMessage, setSubmitMessage] = useState("");

  useEffect(() => {
    const node = sectionRef.current;
    if (!node) return undefined;

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.15 }
    );

    observer.observe(node);
    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_ID || process.env.REACT_APP_EMAILJS_PUBLIC_KEY || DEFAULT_EMAILJS_PUBLIC_KEY;
    if (publicKey) {
      emailjs.init(publicKey);
    }
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const serviceId = process.env.REACT_APP_EMAILJS_SERVICE_ID || DEFAULT_EMAILJS_SERVICE_ID;
    const templateId = process.env.REACT_APP_EMAILJS_TEMPLATE_ID || DEFAULT_EMAILJS_TEMPLATE_ID;
    const publicKey = process.env.REACT_APP_EMAILJS_PUBLIC_KEY || DEFAULT_EMAILJS_PUBLIC_KEY;

    if (!serviceId || !templateId || !publicKey) {
      setSubmitStatus("error");
      setSubmitMessage("EmailJS is not configured yet. Please add your service, template, and public key.");
      return;
    }

    setIsSubmitting(true);
    setSubmitStatus("idle");
    setSubmitMessage("");

    try {
      const formData = new FormData(formRef.current);
      const name = formData.get("from_name")?.toString() || "";
      const email = formData.get("from_email")?.toString() || "";
      const phone = formData.get("phone")?.toString() || "";
      const message = formData.get("message")?.toString() || "";

      const templateParams = {
        from_name: name,
        name,
        user_name: name,
        from_email: email,
        email,
        user_email: email,
        phone,
        user_phone: phone,
        message,
        user_message: message,
        subject: `New contact request from ${name || "website visitor"}`,
        to_email: "noorbonne8@gmail.com",
        to_name: "Noor",
        reply_to: email,
      };

      await emailjs.send(serviceId, templateId, templateParams, publicKey);
      setSubmitStatus("success");
      setSubmitMessage("Your message was sent successfully. We will get back to you shortly.");
      formRef.current?.reset();
    } catch (error) {
      const errorMessage = error?.text || error?.message || "Unknown error";
      console.error("EmailJS submission failed:", error);
      setSubmitStatus("error");
      setSubmitMessage(`Sorry, your message could not be sent right now. Please verify your EmailJS Service ID, Template ID, and Public Key. ${errorMessage}`);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section
      className={`contact ${isVisible ? "contact--visible" : ""}`}
      id="contact"
      ref={sectionRef}
    >
      {/* Diagonal seam picking up where the previous section's cut left off */}
      <svg
        className="contact__seam"
        viewBox="0 0 1440 60"
        preserveAspectRatio="none"
        aria-hidden="true"
      >
        <polygon className="contact__seam-fill" points="0,0 1440,0 0,60" />
        <line className="contact__seam-line" x1="0" y1="0" x2="1440" y2="0" />
      </svg>

      <span className="contact__accent" aria-hidden="true" />

      <div className="container contact__container">
        <div className="contact__header">
          <p className="contact__eyebrow">Get In Touch</p>
          <h2 className="contact__title">
            Contact <span>Us</span>
          </h2>
          <p className="contact__intro">
            Have a project in mind or a question about our work? Reach out
            and our team will get back to you within one business day.
          </p>
        </div>

        <div className="contact__grid">
          <div className="contact__info">
            {CONTACT_INFO.map((item) => (
              <div className="contact-info__item" key={item.label}>
                <span className="contact-info__icon" aria-hidden="true">
                  {item.icon}
                </span>
                <div>
                  <p className="contact-info__label">{item.label}</p>
                  <p className="contact-info__value">{item.value}</p>
                </div>
              </div>
            ))}

            <div className="contact__social">
              <a href="https://www.facebook.com/" className="contact__social-link" aria-label="Facebook">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M13.5 21v-8h2.7l.4-3.1h-3.1V7.9c0-.9.25-1.5 1.55-1.5H16.8V3.6c-.28-.04-1.25-.12-2.38-.12-2.36 0-3.97 1.44-3.97 4.08V9.9H7.7V13h2.75v8h3.05Z" />
                </svg>
              </a>
              <a href="https://www.instagram.com/" className="contact__social-link" aria-label="Instagram">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <rect x="3" y="3" width="18" height="18" rx="5" />
                  <circle cx="12" cy="12" r="3.6" />
                  <circle cx="17.4" cy="6.6" r="1" fill="currentColor" stroke="none" />
                </svg>
              </a>
              <a href="https://www.linkedin.com/in/ismail-al-hersh-contracting-co-71b2b2417/" className="contact__social-link" aria-label="LinkedIn">
                <svg viewBox="0 0 24 24" fill="currentColor">
                  <path d="M6.94 8.5H3.56V21h3.38V8.5ZM5.25 3a1.97 1.97 0 1 0 0 3.94A1.97 1.97 0 0 0 5.25 3ZM20.44 21h-3.37v-6.36c0-1.52-.03-3.47-2.11-3.47-2.12 0-2.44 1.65-2.44 3.36V21H9.15V8.5h3.24v1.7h.05c.45-.86 1.56-1.77 3.22-1.77 3.44 0 4.08 2.27 4.08 5.22V21Z" />
                </svg>
              </a>
            </div>
          </div>

          <div className="contact__form-wrap">
            <form className="contact__form" onSubmit={handleSubmit} ref={formRef}>
              <div className="contact__field">
                <label htmlFor="contact-name">Full Name</label>
                <input id="contact-name" name="from_name" type="text" placeholder="Your name" required />
              </div>

              <div className="contact__field">
                <label htmlFor="contact-phone">Phone</label>
                <input id="contact-phone" name="phone" type="tel" placeholder="Your phone number" />
              </div>

              <div className="contact__field contact__field--full">
                <label htmlFor="contact-email">Email</label>
                <input id="contact-email" name="from_email" type="email" placeholder="you@example.com" required />
              </div>

              <div className="contact__field contact__field--full">
                <label htmlFor="contact-message">Message</label>
                <textarea id="contact-message" name="message" placeholder="Tell us about your project" required />
              </div>

              <div className="contact__submit-row">
                <button type="submit" className="btn btn-accent" disabled={isSubmitting}>
                  {isSubmitting ? "Sending..." : "Send Message"}
                </button>
                {submitMessage ? (
                  <p className={`contact__status ${submitStatus === "success" ? "contact__status--success" : "contact__status--error"}`}>
                    {submitMessage}
                  </p>
                ) : null}
              </div>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
