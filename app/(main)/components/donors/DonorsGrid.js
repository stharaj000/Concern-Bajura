import DonorCard from "./DonorCard";

const donors = [
  {
    id: 1,
    name: "Sarah Jenkins",
    contribution: "$500",
    directedTowards: "Education Fund",
    method: "Online Donation",
    image: "https://placehold.co/500x400/e7e5e4/e7e5e4?text=+",
  },
  {
    id: 2,
    name: "GlobalTech Solutions",
    contribution: "100 Laptops",
    directedTowards: "Digital Literacy Program",
    method: "In-Kind Corporate Grant",
    image: "https://placehold.co/500x400/f1f5f9/f1f5f9?text=GlobalTech+Solutions",
  },
  {
    id: 3,
    name: "David Chen",
    contribution: "$1,200",
    directedTowards: "Food Security",
    method: "Bank Transfer",
    image: "https://placehold.co/500x400/a8a29e/a8a29e?text=+",
  },

  {
    id: 4,
    name: "David Chen",
    contribution: "$1,200",
    directedTowards: "Food Security",
    method: "Bank Transfer",
    image: "https://placehold.co/500x400/a8a29e/a8a29e?text=+",
  },
];

export default function DonorsGrid() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-active)] [font-family:var(--font-heading)]">
        Individual &amp; Corporate Donors
      </h2>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        Recognizing recent contributions to our ongoing initiatives.
      </p>

      <hr className="mt-6 border-[var(--color-border)]" />

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {donors.map((donor) => (
          <DonorCard key={donor.id} donor={donor} />
        ))}
      </div>
    </section>
  );
}
