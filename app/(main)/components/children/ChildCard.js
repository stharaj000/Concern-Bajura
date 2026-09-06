import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ChildCard({ slug, name, age, image }) {
  return (
    <Link href={`/children/${slug}`}>
      <div className="bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer">
        <img
          src={image}
          alt={name}
          className="w-full h-56 md:h-64 object-cover"
        />
        <div className="p-5">
          <h3 className="text-lg font-semibold text-[var(--color-text)]">
            {name}
          </h3>
          <p className="text-sm text-[var(--color-text-muted)]">Age {age}</p>
          <button className="mt-3 flex items-center gap-1 text-sm font-medium text-[var(--color-primary-active)] hover:text-[var(--color-primary-hover)] transition-colors">
            View Profile
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </Link>
  );
}
