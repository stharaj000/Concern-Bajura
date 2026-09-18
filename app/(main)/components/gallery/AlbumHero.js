import Link from "next/link";
import { ChevronRight } from "lucide-react";

export default function AlbumHero({ title }) {
  return (
    <section className="relative h-40 md:h-48 w-full overflow-hidden">
      <img
        src="https://placehold.co/1600x350/78716c/78716c?text=+"
        alt="Community building a school in Bajura"
        className="absolute inset-0 w-full h-full object-cover"
      />
      {/* dark overlay so the white text stays readable */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="relative h-full max-w-6xl mx-auto px-4 md:px-6 flex items-center">
        <h1 className="flex items-center gap-2 text-2xl md:text-4xl font-bold text-text-white [font-family:var(--font-heading)]">
          <Link href="/gallery" className="hover:underline">
            Gallery
          </Link>
          <ChevronRight size={26} className="text-text-white-secondary" />
          <span>{title}</span>
        </h1>
      </div>
    </section>
  );
}
