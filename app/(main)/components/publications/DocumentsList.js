
import DocumentRow from "./DocumentRow";


export default function DocumentsList({data}) {
  return (
    <section className="max-w-4xl mx-auto px-4 md:px-6 py-16 md:py-20">
      <h2 className="text-2xl md:text-3xl font-bold text-center text-[var(--color-text)] [font-family:var(--font-heading)]">
        Downloadable Documents
      </h2>

      <div className="mt-10 space-y-5">
        {data.items.map((doc) => (
          <DocumentRow
            key={doc.id}
            title={doc.title}
            description={doc.description}
            linkText={doc.linkText}
            href={doc.link}
          />
        ))}
      </div>
    </section>
  );
}
