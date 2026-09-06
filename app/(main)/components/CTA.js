import Link from "next/link";

export default function CTA({ volunteer, donateNow }) {
  return (
    <>
      {/* become part of the change */}
      <section className="bg-black text-white overflow-hidden">
        <div className="w-screen h-[400px] md:h-[600px] relative mx-auto overflow-hidden py-14 flex md:justify-start gap-8 items-center">
          <div className="relative z-10 w-full md:w-1/3 md:left-48 flex flex-col gap-2 overflow-hidden items-center md:items-start mx-6 md:mx-0">
            <h2 className="text-2xl md:text-4xl text-shadow-md font-bold tracking-[-0.01em]">
              {volunteer.title}
            </h2>
            <p className="mt-4 text-white/85 text-md md:text-lg text-shadow-md">
              {volunteer.description}
            </p>
            <button className=" w-fit mt-6 shadow-md bg-primary text-white font-medium px-10 py-4 rounded-lg hover:bg-primary-hover transition-colors text-shadow-md cursor-pointer">
              {volunteer.buttonText}
            </button>
          </div>
          <img
            src={volunteer.image}
            alt="Volunteers with children"
            className="w-full h-full object-cover absolute z-0 object-right opacity-50 hover:scale-105 transition-all duration-500"
          />
        </div>
      </section>


      {/* donate now */}
      <section className="donateSection bg-primary my-36">
        <div className="max-w-6xl h-[400px] md:h-[600px] gap-6 flex justify-center items-center flex-col mx-auto px-4 md:px-6 md:py-14 text-center">
          <h2 className="text-2xl md:text-5xl font-bold text-text tracking-[-0.01em]">
            {donateNow.title}
          </h2>
          <p className="mt-4 text-gray-700 text-md md:text-xl max-w-3xl mx-auto ">
            {donateNow.description}
          </p>
          <Link href="/donate">
            <button className="mt-6 w-fit shadow-lg text-md md:text-2xl bg-warning text-white font-medium px-10 py-5 rounded-lg hover:opacity-90 transition-opacity text-shadow-md hover:cursor-pointer relative overflow-hidden">
              {donateNow.buttonText}
              <div className="w-full h-full px-2 py-20 absolute bg-white/12 top-0 right-0 animate-ping blur-md"></div>
            </button>
          </Link>

        </div>
      </section>
    </>
  );
}
