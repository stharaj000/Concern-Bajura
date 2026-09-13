"use client";

import { useState } from "react";

export default function ContactForm({ data }) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    number: "",
    message: "",
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState("");
  const [error, setError] = useState("");


  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };



  const handleSubmit = async (e) => {
    e.preventDefault();

    setLoading(true);
    setSuccess("");
    setError("");

    try {
      const response = await fetch("/api/contact-messages", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      });

      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error || "Something went wrong.");
      }

      setSuccess(
        "Thank you! Your message has been sent successfully."
      );

      //clear form
      setFormData({
        fullName: "",
        email: "",
        phone: "",
        message: "",
      });
    } catch (error) {
      console.error(error);

      setError(
        error.message || "Failed to send message. Please try again."
      );
    }

    finally {
      setLoading(false);
    }

  }

  const inputClass =
    "w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors";

  const labelClass =
    "block text-sm font-medium text-[var(--color-text)] mb-1.5";

  return (
    <div className="bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] shadow-sm p-6 md:p-8">
      <h2 className="text-2xl font-bold text-center text-[var(--color-text)] [font-family:var(--font-heading)]">
        {data.title}
      </h2>

      <p className="mt-2 text-center text-sm text-[var(--color-text-secondary)] max-w-md mx-auto">
        {data.subtitle}
      </p>

      <form onSubmit={handleSubmit} className="mt-6 space-y-4">
        <div className="grid md:grid-cols-2 gap-4">
          {/* Full Name */}
          <div>
            <label className={labelClass}>
              {data.fields.fullName.label}
            </label>

            <input
              type="text"
              name="fullName"
              required
              placeholder={data.fields.fullName.placeholder}
              value={formData.fullName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>

          {/* Email */}
          <div>
            <label className={labelClass}>
              {data.fields.email.label}
            </label>

            <input
              type="email"
              name="email"
              required
              placeholder={data.fields.email.placeholder}
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        {/* Phone */}
        <div>
          <label className={labelClass}>
            {data.fields.phoneNumber.label}
          </label>

          <input
            type="tel "
            name="phone"
            placeholder={data.fields.phoneNumber.placeholder}
            value={formData.phone}
            onChange={handleChange}
            className={inputClass}
          />
        </div>

        {/* Message */}
        <div>
          <label className={labelClass}>
            {data.fields.message.label}
          </label>

          <textarea
            name="message"
            required
            rows={4}
            placeholder={data.fields.message.placeholder}
            value={formData.message}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>

        {/* Success */}
        {success && (
          <div className="rounded-lg bg-green-50 border border-green-200 px-4 py-3 text-sm text-green-700">
            {success}
          </div>
        )}

        {/* Error */}
        {error && (
          <div className="rounded-lg bg-red-50 border border-red-200 px-4 py-3 text-sm text-red-700">
            {error}
          </div>
        )}

        <div className="pt-2">
          <button
            type="submit"
            disabled={loading}
            className="w-full bg-[var(--color-primary-active)] hover:bg-[var(--color-primary-hover)] disabled:opacity-60 disabled:cursor-not-allowed text-white font-medium py-3 rounded-lg transition-colors"
          >
            {loading ? "Sending..." : data.buttonText}
          </button>
        </div>
      </form>
    </div>
  );
}