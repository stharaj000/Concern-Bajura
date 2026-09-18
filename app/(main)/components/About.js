import Image from "next/image";
import Link from "next/link";


export default function About({ data }) {
  return (
    <section className="w-full md:py-20 md:px-12">
      <div className="relative">
        <Image
          src={data.image}
          width={500}
          height={500}
          alt="Children of Bajura"
          className="aboutImage w-full h-full md:w-2/3 md:h-[700px] object-cover"
        />

        {/* text card overlapping the image, like in the wireframe */}
        <div className="bg-white rounded-2xl shadow-xl p-6 md:p-8 md:absolute md:right-0 md:top-1/2 md:-translate-y-1/2 md:w-[620px] mt-[0] md:mt-0 mx-4 md:mx-0">

          <h1 className="text-2xl md:text-3xl font-bold mb-5 text-text-secondary">{data.title}</h1>
          <p className="text-base leading-relaxed text-text">
            {data.description}
          </p>

          <Link href={"/aboutus"}>
            <button className="mt-5 text-primary hover:cursor-pointer font-medium hover:underline">
              Learn more
            </button>
          </Link>
        </div>
      </div>
    </section>
  );
}
