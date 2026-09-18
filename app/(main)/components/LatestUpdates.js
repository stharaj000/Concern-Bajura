import Link from "next/link";

export default function LatestUpdates({ data }) {
  return (
    <section className="md:max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <h1 className="text-2xl md:text-3xl md:text-3xl font-bold text-center text-text-secondary">
        {data.title}
      </h1>


      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {data.cards.map((update, index) => (
          <div
            key={index + 1}
            className="bg-white shadow-xl  rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >

            <div className="imgcont w-full h-64 overflow-hidden relative">
              <img className='w-full h-full hover:scale-105 transition-all object-cover object-top'
                src={update.image}
                alt={update.title} />

              <div className="whiteShade bg-white opacity-8 h-74 w-18 absolute top-[-25px] right-0 z-20 animate-shine"></div>
              <div className="whiteShade bg-white opacity-4 h-74 w-12 absolute top-0 right-10 z-20 animate-shine"></div>


            </div>


            <div className="p-5">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.05em]">
                {update.tag}
              </span>
              <h3 className="mt-2 text-lg text-text font-semibold">{update.title}</h3>
              <p className="mt-2 text-sm text-text-secondary">{update.description}</p>
              <p className="mt-3 text-xs text-text-secondary">{update.date}</p>
            </div>

          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <Link href={data.buttonLink}>
          <button className="border border-border bg-background text-text font-medium px-6 py-3 rounded-lg hover:bg-buttonhover transition-colors">
            {data.buttonText}
          </button>
        </Link>
      </div>
    </section>

  );
}
