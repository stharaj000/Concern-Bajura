export default function StoryCard({ child }) {

  return (
    <div className="bg-background border border-border rounded-xl p-6 md:p-8">
      <h2 className="text-lg font-semibold text-primary">
        {child.story.title}
      </h2>

      <div className="mt-4">
        {child.story.paragraphs.map((paragraph, i) => (
          <p
            key={i}
            className="text-text leading-relaxed">
            {paragraph}
          </p>
        ))}
      </div>
    </div>
  );
}
