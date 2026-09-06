export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="border-l-4 border-[var(--color-primary-active)] pl-4">
      <h2 className="text-2xl font-bold text-[var(--color-primary-active)] [font-family:var(--font-heading)]">
        {title}
      </h2>
      <p className="mt-1 text-[var(--color-text-secondary)]">{subtitle}</p>
    </div>
  );
}
