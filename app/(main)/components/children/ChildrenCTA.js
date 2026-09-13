export default function ChildrenCTA({data}) {
  return (
    <section className="bg-[var(--color-primary-active)]">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-white [font-family:var(--font-heading)]">
          {data.title}
        </h2>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <button className="bg-[var(--color-secondary)] hover:bg-[var(--color-secondary-hover)] text-white font-medium px-6 py-3 rounded-full transition-colors">
            {data.button1Text}
          </button>
          <button className="border border-white/70 text-white font-medium px-6 py-3 rounded-full hover:bg-white/10 transition-colors">
            {data.button2Text}
          </button>
        </div>
      </div>
    </section>
  );
}
