import { Calendar, MapPin, ArrowRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

const events = Array.from({ length: 6 }).map((_, i) => ({
  id: i + 1,
  badge: "Upcoming Event",
  date: "November 15, 2024",
  location: "Martadi",
  title: "Annual Community Health Camp",
  excerpt:
    "Join us for our yearly health initiative providing free check-ups, basic medicines, and health education to remote communities.",
  image: "https://placehold.co/500x400/78716c/78716c?text=+",
}));

export default function OurEvents() {
  return (
    <section className="bg-[var(--color-surface-alt)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] [font-family:var(--font-heading)]">
          Our Events
        </h2>

        <div className="mt-8 grid md:grid-cols-3 gap-6">
          {events.map((event) => (
            <div
              key={event.id}
              className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow"
            >
              <div className="relative">
                <img
                  src={event.image}
                  alt={event.title}
                  className="w-full h-52 object-cover"
                />
                <StatusBadge label={event.badge} />
              </div>

              <div className="p-5">
                <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                  <span className="flex items-center gap-1">
                    <Calendar size={13} />
                    {event.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <MapPin size={13} />
                    {event.location}
                  </span>
                </div>

                <h3 className="mt-3 text-lg font-semibold text-[var(--color-text)]">
                  {event.title}
                </h3>
                <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                  {event.excerpt}
                </p>

                <button className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--color-primary-active)] hover:text-[var(--color-primary-hover)] transition-colors">
                  View Event
                  <ArrowRight size={15} />
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
