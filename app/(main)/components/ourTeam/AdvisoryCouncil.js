import SectionHeading from "./SectionHeading";
import AdvisorCard from "./AdvisorCard";


export default function AdvisoryCouncil({data}) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-16">
      <SectionHeading
        title={data.title}
        subtitle={data.subtitle}
      />

      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {data.items.map((advisor) => (
          <AdvisorCard
            key={advisor.id}
            name={advisor.name}
            role={advisor.role}
            image={advisor.image}
          />
        ))}
      </div>
    </section>
  );
}
