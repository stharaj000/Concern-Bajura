import SectionHeading from "./SectionHeading";
import TeamMemberCard from "./TeamMemberCard";

export default function StaffMembers({ data }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-16">
      <SectionHeading title={data.title} subtitle={data.subtitle} />

      <div className="mt-8 grid sm:grid-cols-2 md:grid-cols-4 gap-6">
        {data.items.map((member) => (
          <TeamMemberCard
            key={member.id}
            name={member.name}
            role={member.role}
            image={member.image}
          />
        ))}
      </div>
    </section>
  );
}