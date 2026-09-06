const styles = {
  milestone: "bg-[var(--color-primary-active)]",
  "field update": "bg-[#92400E]",
  "upcoming event": "bg-[var(--color-secondary)]",
};

export default function StatusBadge({ label }) {
  const colorClass = styles[label.toLowerCase()] || "bg-[var(--color-primary-active)]";

  return (
    <span
      className={`absolute top-3 left-3 ${colorClass} text-white text-xs font-medium px-3 py-1.5 rounded-full`}
    >
      {label}
    </span>
  );
}
