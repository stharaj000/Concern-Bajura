import { MapPin, Mail, Phone } from "lucide-react";

const contactItems = [
  {
    id: 1,
    icon: MapPin,
    label: "Office Location",
    lines: [
      "Concern Bajura Head Office",
      "Budhiganga Municipality, Bajura",
      "Sudurpashchim Province, Nepal",
    ],
  },
  {
    id: 2,
    icon: Mail,
    label: "Email Address",
    lines: ["info@concernbajura.org.np"],
  },
  {
    id: 3,
    icon: Phone,
    label: "Phone Number",
    lines: ["+977-98-XXXXXXX"],
  },
];

export default function GetInTouch() {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] [font-family:var(--font-heading)]">
        Get in Touch
      </h2>
      <p className="mt-3 text-[var(--color-text-secondary)] max-w-md">
        Whether you have a question about our programs, want to partner
        with us, or simply wish to learn more about our work in Bajura, our
        team is ready to connect.
      </p>

      <div className="mt-8 space-y-6">
        {contactItems.map((item) => {
          const Icon = item.icon;
          return (
            <div key={item.id} className="flex gap-4">
              <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
                <Icon size={18} className="text-[var(--color-primary)]" />
              </div>
              <div>
                <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
                  {item.label}
                </p>
                {item.lines.map((line, i) => (
                  <p key={i} className="text-[var(--color-text)]">
                    {line}
                  </p>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
