export default function ChildrenHero({data}) {
  return (
    <section className="relative h-72 md:h-80 w-full overflow-hidden">
      <img
        src={data.image}
        alt="Bajura village"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* dark overlay so the white text stays readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full max-w-4xl mx-auto px-4 flex flex-col items-center justify-center text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-text-white [font-family:var(--font-heading)]">
          {data.title}
        </h1>
        <p className="mt-4 text-text-white-secondary text-lg md:text-xl">
          {data.subtitle}
        </p>
      </div>
    </section>
  );
}
