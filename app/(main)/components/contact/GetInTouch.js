import { MapPin, Mail, Phone } from "lucide-react";


export default function GetInTouch({ data }) {
  return (
    <div>
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] [font-family:var(--font-heading)]">
        {data.title}
      </h2>
      <p className="mt-3 text-[var(--color-text-secondary)] max-w-md">
        {data.description}
      </p>

      <div className="mt-8 space-y-6">

        <div className="flex gap-4">
          <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
            <MapPin size={18} className="text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
              {data.office.label}
            </p>
            <p className="text-[var(--color-text)]">
              {data.office.address.map((line, index) => (
                <span key={index} className="block">
                  {line}
                </span>
              ))}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
            <Mail size={18} className="text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
              {data.email.label}
            </p>
            <p className="text-[var(--color-text)]">
              {data.email.value}
            </p>
          </div>
        </div>

        <div className="flex gap-4">
          <div className="w-11 h-11 shrink-0 rounded-full bg-[var(--color-surface-alt)] flex items-center justify-center">
            <Phone size={18} className="text-[var(--color-primary)]" />
          </div>
          <div>
            <p className="text-xs font-semibold text-[var(--color-text-muted)] uppercase tracking-[0.05em]">
              {data.phone.label}
            </p>
            <p className="text-[var(--color-text)]">
              {data.phone.value}
            </p>
          </div>
        </div>


      </div>
    </div>
  );
}
