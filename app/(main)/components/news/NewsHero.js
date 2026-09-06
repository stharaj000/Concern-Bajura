export default function NewsHero() {
  return (
    <section className="relative h-72 md:h-80 w-full overflow-hidden">
      <img
        src="https://placehold.co/1600x550/57534e/57534e?text=+"
        alt="Bajura mountains"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* dark overlay so the white text stays readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white [font-family:var(--font-heading)]">
          News &amp; Events
        </h1>
        <p className="mt-4 text-white/90 text-lg md:text-xl max-w-2xl">
          Stay updated with our latest initiatives, community milestones,
          and upcoming events in Bajura.
        </p>
      </div>
    </section>
  );
}
