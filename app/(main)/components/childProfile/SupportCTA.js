import Link from "next/link";
import { HeartHandshake } from "lucide-react";

export default function SupportCTA() {
  return (
    <section className="bg-[var(--color-primary-hover)]">
      <div className="max-w-2xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
        <HeartHandshake size={34} className="mx-auto text-white" />

        <h2 className="mt-4 text-xl md:text-2xl font-semibold text-white">
          Support Our Mission
        </h2>
        <p className="mt-3 text-white/85">
          Your contribution directly empowers children across Bajura with
          education, healthcare, and the opportunity for a brighter future.
        </p>

        <Link
          href="/donate"
          className="mt-7 inline-flex items-center gap-2 bg-secondary hover:bg-secondary-hover text-white font-medium px-6 py-3 rounded-full transition-colors"
        >
          Donate to Our Mission
          <span aria-hidden="true">&rarr;</span>
        </Link>

        <p className="mt-5 text-sm text-white/70">100% Secure &amp; Transparent.</p>
      </div>
    </section>
  );
}
