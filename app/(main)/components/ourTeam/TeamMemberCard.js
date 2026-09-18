export default function TeamMemberCard({ name, role, image }) {
  return (
    <div className="bg-background rounded-xl border border-border overflow-hidden">
      <img src={image} alt={name} className="w-full h-56 object-cover" />
      <div className="p-4">
        <h3 className="font-semibold text-text">{name}</h3>
        <p className="text-sm text-primary">{role}</p>
      </div>
    </div>
  );
}