import { Play } from "lucide-react";
import Link from "next/link";

export default function VideoCard({ title, description, image, videoLink }) {
  return (
    <Link href={videoLink}>
      <div className="block bg-[var(--color-background)] rounded-xl border border-[var(--color-border)] overflow-hidden hover:shadow-md transition-shadow">
        <button className="relative w-full block rounded-t-xl overflow-hidden group">
          <img
            src={image}
            alt={title}
            className="w-full h-64 md:h-72 object-cover"
          />
          <div className="absolute inset-0 bg-black/10 group-hover:bg-black/20 transition-colors" />
          <span className="absolute inset-0 flex items-center justify-center">
            <span className="w-14 h-14 rounded-full bg-white flex items-center justify-center shadow-md">
              <Play
                size={22}
                className="text-[var(--color-primary-active)] ml-0.5"
                fill="currentColor"
              />
            </span>
          </span>
        </button>

        <div className="p-5">
          <h3 className="mt-4 text-lg font-semibold text-[var(--color-text)]">
            {title}
          </h3>
          <p className="mt-1 text-sm text-[var(--color-text-secondary)]">
            {description}
          </p>
        </div>
      </div>
    </Link>
  );
}
