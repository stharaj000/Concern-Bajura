import { GraduationCap, Cross, Utensils, Home } from "lucide-react";


const iconMap = {
  graduation_cap: GraduationCap,
  cross: Cross,
  utensils: Utensils,
  home: Home,
}


export default function Objectives({ data }) {
  return (
    <section className="max-w-6xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-text-secondary">
        {data.title}
      </h2>

      <div className="mt-10 grid sm:grid-cols-2 md:grid-cols-4 gap-5">
        {data.items.map((obj) => {
          const Icon = iconMap[obj.icon] || GraduationCap;
          return (
            <div
              key={obj.id}
              className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6"
            >
              {/* <Icon size={26} className="text-primary" /> */}
              <h3 className="mt-4 text-lg font-semibold text-text">
                {obj.title}
              </h3>
              <p className="mt-2 text-sm text-text-secondary   leading-relaxed">
                {obj.description}
              </p>
            </div>
          );
        })}
      </div>
    </section>
  );
}
  