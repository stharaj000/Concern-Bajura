import Link from "next/link";
import { Images } from "lucide-react";

export default function AlbumCard({ slug, title, count, image }) {
  return (
    <Link
      href={`/gallery/${slug}`}
      className="block bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow"
    >
      <img src={image} alt={title} className="w-full h-64 object-cover" />
      <div className="p-5">
        <h3 className="text-lg font-semibold text-[var(--color-text)]">
          {title}
        </h3>
        <p className="mt-1 flex items-center gap-1.5 text-sm text-[var(--color-text-muted)]">
          <Images size={15} />
          {count} Photos
        </p>
      </div>
    </Link>
  );
}
