import ChildCard from "./ChildCard";
import { children } from "@/lib/childrenData";


export default function MeetChildren() {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-primary-active)] [font-family:var(--font-heading)]">
        Meet Our Children
      </h2>
      <p className="mt-2 text-center text-[var(--color-text-secondary)]">
        The incredible young minds we support.
      </p>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-3 gap-6">
        {children.map((child) => (
          <ChildCard
            key={child.id}  
            slug={child.slug}
            name={child.name}
            age={child.age}
            image={child.image}
          />
        ))}
      </div>
    </section>
  );
}
