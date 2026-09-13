export default function StoryCard({ child }) {

  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 md:p-8">
      <h2 className="text-lg font-semibold text-[var(--color-primary-active)]">
        {child.story.title}
      </h2>

      <div className="mt-4">
        {child.story.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-[var(--color-text-secondary)] leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
