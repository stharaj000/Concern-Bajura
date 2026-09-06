export default function DonateHero() {
  return (
    <section className="relative h-64 md:h-72 w-full overflow-hidden">
      <img
        src="https://placehold.co/1600x500/475569/475569?text=+"
        alt="Community rebuilding in Bajura"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* dark overlay so the white text stays readable */}
      <div className="absolute inset-0 bg-black/45" />

      <div className="relative h-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white [font-family:var(--font-heading)]">
          Donate – Make a Difference
        </h1>
        <p className="mt-4 text-white/90 text-base md:text-lg max-w-xl">
          Your contribution brings hope and tangible change to the
          communities of Bajura.
        </p>
      </div>
    </section>
  );
}
