"use client";

import { Landmark, Copy } from "lucide-react";
import { useState } from "react";

export default function BankOptionCard({ label, bank, swift, name, account }) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(account);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  return (
    <div
      className="bg-background rounded-lg border border-border border-l-4 border-l-primary p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark size={20} className="text-primary" />
          <h3 className="text-lg font-semibold text-text">
            {label}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          title="Copy account number"
          className="text-text hover:text-primary transition-colors"
        >
          <Copy size={16} />
        </button>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="w-16 shrink-0 font-medium text-text">
            Bank:
          </span>
          <span className="text-text">{bank}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-16 shrink-0 font-medium text-text">
            SWIFT:
          </span>
          <span className="bg-surface-alt px-2 py-0.5 rounded text-text">
            {swift}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="w-16 shrink-0 font-medium text-text">
            Name:
          </span>
          <span className="text-text">{name}</span>
        </div>
        <div className="flex gap-2">
          <span className="w-16 shrink-0 font-medium text-text">
            Account:
          </span>
          <span className="font-semibold text-primary">
            {copied ? "Copied!" : account}
          </span>
        </div>
      </div>
    </div>
  );
}
