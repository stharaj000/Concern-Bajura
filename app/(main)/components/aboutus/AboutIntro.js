export default function AboutIntro({ data }) {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
      <h2 className="text-2xl md:text-3xl font-bold text-text-secondary">
        {data.title}
      </h2>
      <p className="mt-6 text-text leading-relaxed text-justify md:text-justify">
        {data.description}.
      </p>
    </section>
  );
}
