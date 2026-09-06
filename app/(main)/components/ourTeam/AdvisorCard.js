export default function AdvisorCard({ name, role, image }) {
  return (
    <div className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] p-6 text-center">
      <img
        src={image}
        alt={name}
        className="w-20 h-20 rounded-full object-cover mx-auto"
      />
      <h3 className="mt-4 font-semibold text-[var(--color-text)]">{name}</h3>
      <p className="mt-1 text-xs font-semibold text-[var(--color-primary-active)] uppercase tracking-[0.05em]">
        {role}
      </p>
    </div>
  );
}
