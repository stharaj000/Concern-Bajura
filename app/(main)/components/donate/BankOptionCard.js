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
      className="bg-[var(--color-background)] rounded-lg border border-[var(--color-border)] border-l-4 border-l-[var(--color-primary)] p-5"
    >
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Landmark size={20} className="text-[var(--color-primary)]" />
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            {label}
          </h3>
        </div>
        <button
          onClick={handleCopy}
          title="Copy account number"
          className="text-[var(--color-text-muted)] hover:text-[var(--color-primary)] transition-colors"
        >
          <Copy size={16} />
        </button>
      </div>

      <div className="mt-4 space-y-2 text-sm">
        <div className="flex gap-2">
          <span className="w-16 shrink-0 font-medium text-[var(--color-text)]">
            Bank:
          </span>
          <span className="text-[var(--color-text-secondary)]">{bank}</span>
        </div>
        <div className="flex gap-2 items-center">
          <span className="w-16 shrink-0 font-medium text-[var(--color-text)]">
            SWIFT:
          </span>
          <span className="bg-[var(--color-surface-alt)] px-2 py-0.5 rounded text-[var(--color-text-secondary)]">
            {swift}
          </span>
        </div>
        <div className="flex gap-2">
          <span className="w-16 shrink-0 font-medium text-[var(--color-text)]">
            Name:
          </span>
          <span className="text-[var(--color-text-secondary)]">{name}</span>
        </div>
        <div className="flex gap-2">
          <span className="w-16 shrink-0 font-medium text-[var(--color-text)]">
            Account:
          </span>
          <span className="font-semibold text-[var(--color-primary)]">
            {copied ? "Copied!" : account}
          </span>
        </div>
      </div>
    </div>
  );
}
