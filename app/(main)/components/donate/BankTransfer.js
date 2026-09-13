import { ShieldCheck } from "lucide-react";
import BankOptionCard from "./BankOptionCard";

export default function BankTransfer({ data }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary)] [font-family:var(--font-heading)]">
        {data.title}
      </h2>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        {data.subtitle}
      </p>


      <div className="mt-6 space-y-5">

        {data.accounts.map((account) => {

          return (

            <BankOptionCard
              label={account.option}
              bank={account.bank}
              swift={account.swift}
              name={account.name}
              account={account.account}
            />

          );
        }
        )}


      </div>

      <div className="mt-6 bg-[var(--color-primary-light)] border border-[var(--color-primary)]/20 rounded-lg p-4 flex gap-3">
        <ShieldCheck
          size={20}
          className="text-[var(--color-primary)] shrink-0 mt-0.5"
        />
        <p className="text-sm text-[var(--color-primary-active)]">
          {data.notice}
        </p>
      </div>
    </div>
  );
}
