export default function DonorsHero() {
  return (
    <section className="relative h-72 md:h-96 w-full overflow-hidden">
      <img
        src="https://placehold.co/1600x650/93c5fd/93c5fd?text=+"
        alt="Classroom in Bajura"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* light overlay, unlike the dark ones on other hero banners */}
      <div className="absolute inset-0 bg-white/70" />

      <div className="relative h-full max-w-3xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-[var(--color-primary-active)] [font-family:var(--font-heading)]">
          Our Donors &amp; Partners
        </h1>
        <p className="mt-4 text-[var(--color-text-secondary)] text-lg max-w-xl">
          Transparency and gratitude for the individuals and organizations
          powering our mission.
        </p>
      </div>
    </section>
  );
}
