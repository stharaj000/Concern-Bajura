export default function StoryCard({ child }) {
  const firstName = child.name.split(" ")[0];

  return (
    <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl p-6 md:p-8">
      <h2 className="text-lg font-semibold text-[var(--color-primary-active)]">
        {firstName}&apos;s Story
      </h2>

      <div className="mt-4 space-y-4">
        {child.story.map((paragraph, i) => (
          <p
            key={i}
            className="text-[var(--color-text-secondary)] leading-relaxed"
          >
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
