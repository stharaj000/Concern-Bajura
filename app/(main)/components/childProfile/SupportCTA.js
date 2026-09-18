import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function SupportCTA({ data }) {
  return (
    <section className="bg-primary-active">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
        <HeartHandshake size={34} className="mx-auto text-text-white" />

        <h2 className="mt-4 text-xl md:text-2xl font-semibold text-text-white">
          {data.title}
        </h2>
        <p className="mt-3 text-white/85">
          {data.subtitle}
        </p>

        <Link
          href={data.buttonLink}
          className="mt-7 inline-flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          {data.buttonText}
          <span aria-hidden="true">&rarr;</span>
        </Link>

        <p className="mt-5 text-sm text-text-white-secondary">100% Secure &amp; Transparent.</p>
      </div>
    </section>
  );
}
