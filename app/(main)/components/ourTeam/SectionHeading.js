export default function SectionHeading({ title, subtitle }) {
  return (
    <div className="border-l-4 border-primary pl-4">
      <h2 className="text-2xl font-bold text-text-secondary">
        {title}
      </h2>
      <p className="mt-1 text-text-secondary">{subtitle}</p>
    </div>
  );
}
