import { ShieldCheck } from "lucide-react";
import BankOptionCard from "./BankOptionCard";

export default function BankTransfer() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] [font-family:var(--font-heading)]">
        Direct Bank Transfer
      </h2>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        For secure, direct contributions, please use one of our official
        accounts below.
      </p>

      <div className="mt-6 space-y-5">
        <BankOptionCard
          label="Option A"
          bank="Rastriya Banijya Bank"
          swift="RBBANPKA"
          name="Ravins Pokhrel"
          account="347000808610"
        />
        <BankOptionCard
          label="Option B"
          bank="Rastriya Banijya Bank"
          swift="RBBANPKA"
          name="Ganesh Thapa"
          account="12255288888"
        />
      </div>

      <div className="mt-6 bg-[var(--color-primary-light)] border border-[var(--color-primary)]/20 rounded-lg p-4 flex gap-3">
        <ShieldCheck
          size={20}
          className="text-[var(--color-primary)] shrink-0 mt-0.5"
        />
        <p className="text-sm text-[var(--color-primary-active)]">
          Make sure that you handover your donations to Concern Bajura and
          its authorized representative only.
        </p>
      </div>
    </div>
  );
}
