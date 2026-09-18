import { ArrowRight } from "lucide-react";
import Link from "next/link";

export default function ChildCard({ slug, name, age, image }) {
  return (
    <Link href={`/children/${slug}`}>
      <div className="bg-background rounded-xl border border-border overflow-hidden hover:shadow-md transition-shadow hover:cursor-pointer">
        <img
          src={image}
          alt={name}
          className="w-full h-56 md:h-64 object-cover bg-gray-600"
        />
        <div className="p-5">
          <h3 className="text-lg font-semibold text-text">
            {name}
          </h3>
          <p className="text-sm text-text-secondary">Age {age}</p>
          <button className="mt-3 flex items-center gap-1 text-sm font-medium text-primary hover:text-primary-hover transition-colors">
            View Profile
            <ArrowRight size={15} />
          </button>
        </div>
      </div>
    </Link>
  );
}
