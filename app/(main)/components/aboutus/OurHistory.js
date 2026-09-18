
export default function OurHistory({ data }) {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 pb-16 md:pb-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-text-secondary [font-family:var(--font-heading)]">
        {data.title}
      </h2>
      <p className="mt-2 text-center text-text-secondary">
        {data.subtitle}
      </p>

      <div className="mt-10">
        {data.timeline.map((entry) => (
          <div key={entry.year} className="flex gap-6">
            <div className="w-16 md:w-20 shrink-0 font-bold text-lg text-primary">
              {entry.year}
            </div>
            <div className="flex-1 border-l-2 border-[var(--color-border)] pl-6 pb-8 space-y-2.5">
              {entry.events.map((item, i) => (
                <div key={i} className="relative">
                  <span className="absolute -left-[30px] top-1.5 w-2.5 h-2.5 rounded-full bg-[var(--color-background)] border-2 border-primary" />
                  <p className="text-sm text-text leading-relaxed">
                    {item}
                  </p>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
