export default function GalleryHero() {
  return (
    <section className="relative h-64 md:h-72 w-full overflow-hidden">
      <img
        src="https://placehold.co/1600x500/78716c/78716c?text=+"
        alt="Community building a school in Bajura"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* dark overlay so the white text stays readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full max-w-4xl mx-auto px-4 flex items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-white [font-family:var(--font-heading)]">
          Gallery
        </h1>
      </div>
    </section>
  );
}
