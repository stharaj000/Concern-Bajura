
export default function LatestUpdates({ data }) {
  return (
    <section className="md:max-w-7xl mx-auto px-4 md:px-6 py-14 md:py-20">
      <h2 className="text-2xl text-text-muted md:text-3xl font-semibold text-center tracking-[-0.01em]">
        {data.title}
      </h2>


      <div className="mt-10 grid md:grid-cols-3 gap-6">
        {data.cards.map((update, index) => (
          <div
            key={index + 1}
            className="bg-white shadow-xl hover:cursor-pointer rounded-2xl overflow-hidden hover:shadow-md transition-shadow"
          >

            <div className="imgcont bg-gray-600 w-full h-64 overflow-hidden relative">
              <img className='w-full h-full hover:scale-105 transition-all object-cover object-top'
                src={update.image}
                alt={update.title} />


                {console.log("updateimage: ", update.image)}

              <div className="whiteShade bg-white opacity-8 h-74 w-18 absolute top-[-25px] right-0 z-20 animate-shine"></div>
              <div className="whiteShade bg-white opacity-4 h-74 w-12 absolute top-0 right-10 z-20 animate-shine"></div>


            </div>


            <div className="p-5">
              <span className="text-xs font-medium text-primary uppercase tracking-[0.05em]">
                {update.tag}
              </span>
              <h3 className="mt-2 text-lg font-semibold">{update.title}</h3>
              <p className="mt-2 text-sm text-gray-600">{update.description}</p>
              <p className="mt-3 text-xs text-gray-400">{update.date}</p>
            </div>
            
          </div>
        ))}
      </div>

      <div className="mt-10 flex justify-center">
        <button className="border border-border cursor-pointer bg-background text-text font-medium px-6 py-3 rounded-lg hover:bg-primary-light transition-colors">
          {data.buttonText}
        </button>
      </div>
    </section>

  );
}
