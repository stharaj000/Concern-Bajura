import DonorCard from "./DonorCard";



export default function DonorsGrid({ data }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-primary-active)] [font-family:var(--font-heading)]">
        {data.title}
      </h2>
      <p className="mt-2 text-[var(--color-text-secondary)]">
        {data.subtitle}
      </p>

      <hr className="mt-6 border-[var(--color-border)]" />

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {data.items.map((donor) => (
          <DonorCard key={donor.id} donor={donor} />
        ))}
      </div>
    </section>
  );
}
