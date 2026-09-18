
import Link from "next/link";

export default function ChildrenCTA({ data }) {
  return (
    <section className="bg-primary-active">
      <div className="max-w-3xl mx-auto px-4 md:px-6 py-16 md:py-20 text-center">
        <h2 className="text-2xl md:text-3xl font-bold text-text-white">
          {data.title}
        </h2>

        <div className="mt-8 flex flex-wrap gap-4 justify-center">
          <Link href={data.button1Link}>
            <button className="bg-secondary hover:bg-secondary-hover text-text-white font-medium px-6 py-3 rounded-full transition-colors">
              {data.button1Text}
            </button>
          </Link>

          <Link href={data.button2Link}>
            <button className="border border-border text-text-white font-medium px-6 py-3 rounded-full hover:bg-buttonhover/20 transition-colors">
              {data.button2Text}
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
