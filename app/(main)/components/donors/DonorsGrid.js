import DonorCard from "./DonorCard";



export default function DonorsGrid({ data }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <div className="w-full flex flex-col items-center">
        <h2 className="text-2xl md:text-3xl font-bold text-text-secondary [font-family:var(--font-heading)]">
          {data.title}
        </h2>
        <p className="mt-2 text-text-secondary">
          {data.subtitle}
        </p>
      </div>

      <hr className="my-10 border-border" />

      <div className="mt-8 grid md:grid-cols-3 gap-6">
        {data.items.map((donor) => (
          <DonorCard key={donor.id} donor={donor} />
        ))}
      </div>
    </section>
  );
}
