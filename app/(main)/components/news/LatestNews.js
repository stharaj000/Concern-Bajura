import { Calendar, MapPin, ArrowRight } from "lucide-react";
import StatusBadge from "./StatusBadge";

const newsItems = [
  {
    id: 1,
    badge: "Milestone",
    date: "October 12, 2024",
    location: "Budhiganga",
    title: "New Learning Center Opens in Budhiganga",
    excerpt:
      "After months of community effort, we have officially opened the doors to a new learning facility, providing access to education for over 50 local children.",
    image: "https://placehold.co/500x400/78716c/78716c?text=+",
  },
  {
    id: 2,
    badge: "Field Update",
    date: "September 28, 2024",
    location: "Triveni",
    title: "Monsoon Relief Distribution Completed",
    excerpt:
      "Our teams successfully delivered essential supplies and construction materials to families affected by the recent heavy monsoon rains.",
    image: "https://placehold.co/500x400/78716c/78716c?text=+",
  },
  {
    id: 3,
    badge: "Field Update",
    date: "September 28, 2024",
    location: "Triveni",
    title: "Monsoon Relief Distribution Completed",
    excerpt:
      "Our teams successfully delivered essential supplies and construction materials to families affected by the recent heavy monsoon rains.",
    image: "https://placehold.co/500x400/78716c/78716c?text=+",
  },
  {
    id: 4,
    badge: "Field Update",
    date: "September 28, 2024",
    location: "Triveni",
    title: "Monsoon Relief Distribution Completed",
    excerpt:
      "Our teams successfully delivered essential supplies and construction materials to families affected by the recent heavy monsoon rains.",
    image: "https://placehold.co/500x400/78716c/78716c?text=+",
  },
];

export default function LatestNews() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] [font-family:var(--font-heading)]">
        Latest News
      </h2>

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {newsItems.map((item) => (
          <div
            key={item.id}
            className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow"
          >
            <div className="relative">
              <img
                src={item.image}
                alt={item.title}
                className="w-full h-52 object-cover"
              />
              <StatusBadge label={item.badge} />
            </div>

            <div className="p-5">
              <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)]">
                <span className="flex items-center gap-1">
                  <Calendar size={13} />
                  {item.date}
                </span>
                <span className="flex items-center gap-1">
                  <MapPin size={13} />
                  {item.location}
                </span>
              </div>

              <h3 className="mt-3 text-lg font-semibold text-[var(--color-text)]">
                {item.title}
              </h3>
              <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                {item.excerpt}
              </p>

              <button className="mt-4 flex items-center gap-1 text-sm font-medium text-[var(--color-primary-active)] hover:text-[var(--color-primary-hover)] transition-colors">
                Read More
                <ArrowRight size={15} />
              </button>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
