const rows = [
  { label: "Name", key: "name" },
  { label: "Date of Birth", key: "dob" },
  { label: "Birth Place", key: "birthPlace" },
  { label: "Father's Name", key: "fatherName" },
  { label: "Mother's Name", key: "motherName" },
];

export default function ChildDetailsCard({ child }) {
  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6">
      <img
        src={child.image}
        alt={child.name}
        className="w-full h-80 md:h-96 object-cover rounded-xl"
      />

      <div className="bg-[var(--color-background)] border border-[var(--color-border)] rounded-xl px-6">
        <h2 className="text-lg font-semibold text-[var(--color-primary-active)] pt-6 pb-3 border-b border-[var(--color-border)]">
          Child Details
        </h2>

        {rows.map((row) => (
          <div
            key={row.key}
            className="flex items-center justify-between py-4 border-b border-[var(--color-border)] last:border-b-0"
          >
            <span className="text-[var(--color-text-secondary)]">
              {row.label}
            </span>
            <span className="font-semibold text-[var(--color-text)]">
              {child[row.key]}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
