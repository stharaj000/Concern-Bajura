import { ShieldCheck } from "lucide-react";
import BankOptionCard from "./BankOptionCard";

export default function BankTransfer({ data }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-text-secondary">
        {data.title}
      </h2>
      <p className="mt-2 text-text-secondary">
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

      <div className="mt-6 bg-background border border-primary/20 rounded-lg p-4 flex gap-3">
        <ShieldCheck
          size={20}
          className="text-primary shrink-0 mt-0.5"
        />
        <p className="text-sm text-text">
          {data.notice}
        </p>
      </div>
    </div>
  );
}
