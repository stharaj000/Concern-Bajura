"use client";

import { useState } from "react";

export default function ContactForm() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    subject: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook this up to the backend / email service
    console.log(formData);
    alert("Thanks! We will get back to you soon.");
  };

  const inputClass =
    "w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors";

  const labelClass = "block text-sm font-medium text-[var(--color-text)] mb-1.5";

  return (
    <div className="bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-center text-[var(--color-text)] [font-family:var(--font-heading)]">
        Notify Us of Your Transfer
      </h2>
      <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
        Please provide your details so we can acknowledge your contribution
        and confirm receipt of your invaluable donation.
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>Full Name</label>
            <input
              type="text"
              name="fullName"
              placeholder="John Doe"
              value={formData.fullName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>Email Address</label>
            <input
              type="email"
              name="email"
              placeholder="john@example.com"
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>Subject</label>
          <input
            type="text"
            name="subject"
            placeholder="+977 ..."
            value={formData.subject}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        <div>
          <label className={labelClass}>Message</label>
          <textarea
            name="message"
            rows={4}
            placeholder="Any specific instructions or message..."
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="pt-2">
          <button
            type="submit"
            className="w-full bg-[var(--color-primary-active)] hover:bg-[var(--color-primary-hover)] text-white font-medium py-3 rounded-lg transition-colors"
          >
            Send Message
          </button>
        </div>
      </form>
    </div>
  );
}
