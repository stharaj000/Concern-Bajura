"use client";

import { useState } from "react";
import { Image, CreditCard, Wallet } from "lucide-react";

export default function DonateForm({ data }) {

  // const [donationAmount, setdonationAmount] = useState("");

  const [formData, setFormData] = useState({
    donorName: "",
    email: "",
    phone: "",
    amount: "",
    remarks: "",
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: hook this up to the backend / email service
    console.log(formData);
    alert("Thanks! We will confirm your donation shortly.");
  };

  const inputClass =
    "w-full border border-[var(--color-border)] rounded-lg px-4 py-2.5 text-sm text-[var(--color-text)] placeholder:text-[var(--color-text-muted)] focus:outline-none focus:border-[var(--color-primary)] focus:ring-1 focus:ring-[var(--color-primary)] transition-colors";

  const labelClass = "block text-sm font-medium text-[var(--color-text)] mb-1.5";

  const handleEsewaPayment = async () => {
    try {
      const amount = formData.amount;

      if (!amount || Number(amount) <= 0) {
        alert("Please enter a valid donation amount.");
        return;
      }

      const response = await fetch("/api/payment/esewa", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          donorName: formData.donorName,
          email: formData.email,
          phone: formData.phone,
          amount: Number(amount),
          remarks: formData.remarks,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || "Payment initialization failed");
      }

      const form = document.createElement("form");

      form.method = "POST";
      form.action = "https://rc-epay.esewa.com.np/api/epay/main/v2/form";

      Object.entries(data).forEach(([key, value]) => {
        const input = document.createElement("input");

        input.type = "hidden";
        input.name = key;
        input.value = String(value);

        form.appendChild(input);
      });

      document.body.appendChild(form);

      form.submit();

    } catch (error) {
      console.error("The error is: ", error);

      alert("Unable to start eSewa payment.");
    }
  };



  const handleKhaltiPayment = () => {

    alert("This feature is comming soon...")

  }


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
          <div>
            <label className={labelClass}>{data.fields.fullName.label}</label>
            <input
              type="text"
              name="donorName"
              placeholder={data.fields.fullName.placeholder}
              value={formData.donorName}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
          <div>
            <label className={labelClass}>{data.fields.email.label}</label>
            <input
              type="email"
              name="email"
              placeholder={data.fields.email.placeholder}
              value={formData.email}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div className="grid md:grid-cols-2 gap-4">
          <div>
            <label className={labelClass}>{data.fields.donationAmount.label}</label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 -translate-y-1/2 text-sm text-[var(--color-text-muted)]">
                NPR
              </span>
              <input
                type="number"
                name="amount"
                placeholder={data.fields.donationAmount.placeholder}
                value={formData.amount}
                onChange={handleChange}
                className={`${inputClass} pl-12`}
              />
            </div>
          </div>
          <div>
            <label className={labelClass}>{data.fields.phoneNumber.label} (Optional)</label>
            <input
              type="tel"
              name="phone"
              placeholder={data.fields.phoneNumber.placeholder}
              value={formData.phone}
              onChange={handleChange}
              className={inputClass}
            />
          </div>
        </div>

        <div>
          <label className={labelClass}>{data.fields.remarks.label}</label>
          <textarea
            name="remarks"
            rows={4}
            placeholder={data.fields.remarks.placeholder}
            value={formData.remarks}
            onChange={handleChange}
            className={`${inputClass} resize-none`}
          />
        </div>

        <div className="pt-2 space-y-3">
          <button
            type="button"
            onClick={handleEsewaPayment}
            className="w-full flex items-center justify-center gap-2 bg-[#4CAF50] hover:bg-[#43A047] text-white font-medium py-3 rounded-lg transition-colors"
          >
            <img src="/img/esewa.jpeg" alt="esewa-img" width={30} />
            Donate with eSewa
          </button>
          <button
            onClick={handleKhaltiPayment}
            type="button"
            className="w-full flex items-center justify-center gap-2 bg-[#db1f26] hover:bg-[#98161b] text-white font-medium py-3 rounded-lg transition-colors"
          >
            <div className="bg-white">
              <img src="/img/khalti.png" alt="esewa-img" width={30} />
            </div>
            Donate with Khalti
          </button>
          <button
            type="submit"
            className="w-full flex items-center justify-center gap-2 bg-[#142C8E] hover:bg-[#0F2170] text-white font-medium py-3 rounded-lg transition-colors"
          >
            <div className="bg-white">
              <img src="/img/paypal.png" alt="esewa-img" width={40} />
            </div>
            Donate with PayPal
          </button>
        </div>
      </form>
    </div>
  );
}
