import Link from "next/link";


export default function Hero({ data }) {
  return (
    <section className=" text-white h-screen relative  flex">


      <div className="bg-white/10 rounded-2xl h-1/3 md:h-screen md:h-full w-full flex justify-center absolute z-10">
        <video autoPlay loop muted controls controlsList="nodownload noplaybackrate" playsInline className="w-full brightness-50 h-full inset-0 object-cover" >
          <source src={data.video} type="video/mp4" />
        </video>
      </div>

      {/* <div className="absolute z-20 inset-0 bg-black/50 top-0"/> */}


      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center relative top-24 md:top-2 z-20">
        {/* left side - text content */}
        <div className="md:flex flex-col gap-4">
          <h1 className="text-2xl md:text-5xl md:w-full font-bold leading-tight tracking-[-0.02em] text-text md:text-white md:text-shadow-black md:text-shadow-md">
            {data.title}
          </h1>
          <p className="mt-5 text-base md:text-lg text-text md:text-white/100 md:text-shadow-black">
            {data.subtitle}
          </p>

          <div className="mt-7 flex md:flex-wrap gap-4">
            <Link href={"/contact"}><button className="bg-primary text-shadow-md text-white font-medium px-2 md:px-6 py-3 rounded-lg hover:bg-primary-hover cursor-pointer transition-colors">
              {data.button1Text}
            </button>
            </Link>

            <Link href={"/children"}>
              <button className="border border-border text-black md:text-white font-medium px-2 md:px-6 py-3 rounded-lg hover:bg-white/10 cursor-pointer transition-colors md:text-shadow-md">
                {data.button2Text}
              </button>
            </Link>
          </div>

          {/* stats */}
          <div className="mt-10 flex gap-10">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-shadow-black text-text md:text-white md:text-shadow-md">2015</p>
              <p className="text-sm md:text-white/70 uppercase tracking-[0.05em] text-shadow-black text-text-secondary md:text-shadow-sm">
                Established
              </p>
            </div>
            <div>
              <p className="text-2xl md:text-3xl font-bold text-shadow-black text-text md:text-white md:text-shadow-md">14+</p>
              <p className="text-sm text-text-secondary md:text-white/70 uppercase tracking-[0.05em] text-shadow-black md:text-shadow-sm">
                Served Orphans
              </p>
            </div>
          </div>
        </div>

      </div>


    </section>
  );
}
