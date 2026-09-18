const rows = [
  { label: "Name", value: (child) => child.name },
  { label: "Date of Birth", value: (child) => child.details.dateOfBirth },
  { label: "Birth Place", value: (child) => child.details.birthPlace },
  { label: "Father's Name", value: (child) => child.details.fatherName },
  { label: "Mother's Name", value: (child) => child.details.motherName },
];

export default function ChildDetailsCard({ child }) {
  return (
    <div className="grid md:grid-cols-[300px_1fr] gap-6">
      <img
        src={child.image}
        alt={child.name}
        className="w-full h-80 md:h-96 object-cover rounded-xl"
      />

      <div className="bg-background border border-border rounded-xl px-6">
        <h2 className="text-lg font-semibold text-primary pt-6 pb-3 border-b border-border">
          Child Details
        </h2>

        {rows.map((row) => (
          <div
            key={row.label}
            className="flex items-center justify-between py-4 border-b border-border last:border-b-0"
          >
            <span className="text-text-secondary">
              {row.label}
            </span>
            <span className="font-semibold text-text">
              {row.value(child)}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}
