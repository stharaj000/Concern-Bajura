import { ArrowRight } from "lucide-react";
import Link from "next/link";
// import CategoryBadge from "./CategoryBadge";


export default function CurrentProjects({ data }) {
  return (
    <section className="bg-[var(--color-surface-alt)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20">
        <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text)] [font-family:var(--font-heading)]">
          {data.title}
        </h2>
        <p className="mt-3 text-[var(--color-text-secondary)] max-w-2xl">
          {data.description}
        </p>

        <div className="mt-8 space-y-6 flex flex-col gap-4">
          {data.items.map((project) => (
            <Link href={project.link}>
              <div
                key={project.id}
                className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden md:flex hover:shadow-md transition-shadow"
              >
                <div className="relative md:w-2/5 shrink-0">
                  <img
                    src={project.image}
                    alt={project.title}
                    className="w-full h-48 md:h-full object-cover"
                  />
                  <div className="absolute top-3 left-3">
                  </div>
                </div>

                <div className="p-6 flex flex-col justify-center">
                  <span className=" py-4 text-xs font-medium text-primary uppercase tracking-[0.05em]">
                    {project.category}
                  </span>
                  <h3 className="text-lg font-semibold text-[var(--color-text)]">
                    {project.title}
                  </h3>
                  <p className="mt-2 text-sm text-[var(--color-text-secondary)] leading-relaxed">
                    {project.description}
                  </p>
                  <button className="mt-4 w-fit flex items-center gap-1 text-sm font-medium text-[var(--color-primary-active)] hover:text-[var(--color-primary-hover)] transition-colors">
                    {project.linkText}
                    <ArrowRight size={15} />
                  </button>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </section>
  );
}
