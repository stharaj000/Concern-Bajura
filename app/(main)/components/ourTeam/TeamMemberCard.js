export default function TeamMemberCard({ name, role, image }) {
  return (
    <div className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden">
      <img src={image} alt={name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-[var(--color-text)]">{name}</h3>
        <p className="text-sm text-[var(--color-primary-active)]">{role}</p>
      </div>
    </div>
  );
}
