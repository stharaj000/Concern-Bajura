import { CheckCircle2 } from "lucide-react";


export default function WhyConcernBajura({ data }) {
  return (
    <section className="bg-[var(--color-primary-light)]">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-16 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <h2 className="text-2xl md:text-3xl font-bold text-[var(--color-text-secondary)] [font-family:var(--font-heading)]">
            {data.title}
          </h2>

          {data.paragraphs?.map((paragraph, index) => (
            <p key={index}
              className="mt-5 text-[var(--color-text-secondary)] leading-relaxed">
              {paragraph}
            </p>
          ))}

          <div className="mt-6 space-y-3">
            {data.points.map((point) => (
              <div key={point} className="flex items-center gap-3">
                <CheckCircle2
                  size={20}
                  className="text-[var(--color-secondary)] shrink-0"
                />
                <span className="text-[var(--color-text)]">{point}</span>
              </div>
            ))}
          </div>
        </div>

        <img
          src={data.image}
          alt={data.title || "Children in concern Bajura Classroom"}
          className="w-full h-72 md:h-[420px] object-cover rounded-xl"
        />
      </div>
    </section>
  );
}
