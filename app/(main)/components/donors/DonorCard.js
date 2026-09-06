import { CreditCard, Package, Target, Landmark, Tag } from "lucide-react";

// pick a fitting icon depending on the type of contribution / method
const contributionIcon = (contribution) =>
  contribution.includes("$") ? CreditCard : Package;

const methodIcon = (method) =>
  method.toLowerCase().includes("grant") ? Tag : Landmark;

export default function DonorCard({ donor }) {
  const ContributionIcon = contributionIcon(donor.contribution);
  const MethodIcon = methodIcon(donor.method);

  const rows = [
    {
      icon: ContributionIcon,
      label: "Contribution",
      value: donor.contribution,
    },
    {
      icon: Target,
      label: "Directed Towards",
      value: donor.directedTowards,
    },
    {
      icon: MethodIcon,
      label: "Method",
      value: donor.method,
    },
  ];

  return (
    <div className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      <img
        src={donor.image}
        alt={donor.name}
        className="w-full h-52 object-cover"
      />

      <div className="p-6">
        <h3 className="text-xl font-semibold text-[var(--color-text)]">
          {donor.name}
        </h3>

        <div className="mt-4 space-y-4">
          {rows.map((row) => {
            const Icon = row.icon;
            return (
              <div key={row.label} className="flex gap-3">
                <Icon
                  size={17}
                  className="text-[var(--color-text-muted)] shrink-0 mt-0.5"
                />
                <div>
                  <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                    {row.label}
                  </p>
                  <p className="text-[var(--color-text)] font-medium">
                    {row.value}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
