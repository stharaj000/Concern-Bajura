import { CreditCard, Package, Target, Landmark, Tag } from "lucide-react";

// pick a fitting icon depending on the type of contribution / method


export default function DonorCard({ donor }) {

  const rows = [
    {
      label: "Contribution",
      value: donor.contribution,
    },
    {
      label: "Directed Towards",
      value: donor.directedTowards,
    },
    {
      label: "Method",
      value: donor.method,
    },
  ];

  return (
    <div className="bg-background shadow-md rounded-2xl overflow-hidden transition-shadow relative">
      <img
        src={donor.image}
        alt={donor.name}
        className="w-full h-52 object-cover"
      />

      <div className="whiteShade bg-white opacity-8 h-74 w-18 absolute top-[-25px] right-0 z-20 animate-shine"></div>
      <div className="whiteShade bg-white opacity-4 h-74 w-12 absolute top-0 right-10 z-20 animate-shine"></div>

      <div className="p-6">
        <h3 className="text-xl font-semibold text-text">
          {donor.name}
        </h3>

        <div className="mt-4 space-y-4">
          {rows.map((row) => {

            return (
              <div key={row.label} className="flex gap-3">

                <div>
                  <p className="text-xs font-semibold text-text-muted uppercase tracking-[0.05em]">
                    {row.label}
                  </p>
                  <p className="text-text font-medium">
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
