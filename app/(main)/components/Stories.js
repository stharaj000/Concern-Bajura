"use client"


import Image from "next/image";
import childerns from "@/app/img/childerns.jpg"
import useEmblaCarousel from "embla-carousel-react";
import { useState, useEffect, useRef } from "react";
import Autoplay from "embla-carousel-autoplay";



export default function Stories({ ourChildren, storiesOfOurChildren }) {


  const firstAutoplay = useRef(Autoplay({
    delay: 6000,

  })
  );



  const thirdAutoplay = useRef(Autoplay({
    delay: 6000,

  })
  );






  const [firstEmblaRef, firstEmblaApi] = useEmblaCarousel({

    loop: true,
    align: "center",

  }, [firstAutoplay.current])


  const [secondEmblaRef, secondEmblaApi] = useEmblaCarousel({

    loop: true,
    align: "center",

  })


  const [thirdEmblaRef, thirdEmblaApi] = useEmblaCarousel({

    loop: true,
    align: "center",

  }, [thirdAutoplay.current])



  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedSecondIndex, setSelectedSecondIndex] = useState(0);
  const [selectedThirdIndex, setSelectedThirdIndex] = useState(0);




  useEffect(() => {

    if (!secondEmblaApi) return;

    const interval = setInterval(() => {
      secondEmblaApi.scrollPrev();
    }, 6000)

    return () => clearInterval(interval);

  }, [secondEmblaApi])






  useEffect(() => {

    if (!firstEmblaApi) {
      return;
    }

    const onSelect = () => {
      setSelectedIndex(firstEmblaApi.selectedScrollSnap());
    }

    onSelect();
    firstEmblaApi.on("select", onSelect);


    return () => firstEmblaApi.off("select", onSelect);

  }, [firstEmblaApi])




  useEffect(() => {

    if (!secondEmblaApi) {
      return;
    }

    const onSelect = () => {
      setSelectedSecondIndex(secondEmblaApi.selectedScrollSnap());
    }

    onSelect();
    secondEmblaApi.on("select", onSelect);


    return () => secondEmblaApi.off("select", onSelect);

  }, [secondEmblaApi])




  useEffect(() => {

    if (!thirdEmblaApi) {
      return;
    }

    const onSelect = () => {
      setSelectedThirdIndex(thirdEmblaApi.selectedScrollSnap());
    }

    onSelect();
    thirdEmblaApi.on("select", onSelect);


    return () => thirdEmblaApi.off("select", onSelect);

  }, [thirdEmblaApi])




  return (
    <section className=" mx-auto py-14 md:py-20 bg-surface">

      <h1 className="text-2xl md:text-3xl md:text-3xl font-bold text-center text-text-muted">
        {ourChildren.title}
      </h1>
      <Image src={ourChildren.image || childerns}
      width={500}
      height={500}
        className="mt-6 md:mt-10 w-screen rounded-2xl transition-all duration-500 hover:scale-105 pb-8"
      />






      <h1 className="text-2xl md:text-3xl md:text-3xl font-bold text-center pt-14 text-text-muted">
        {storiesOfOurChildren.title}
      </h1>

      {/* ------------------------------------------------------------------------------------------------------------- */}






      <div className="mt-10 embla overflow-hidden hover:cursor-grab" ref={firstEmblaRef}


      >
        <div className="embla__container flex mx-2 md:mx-0">
          {storiesOfOurChildren.groups[0].children.map((story, index) => {

            // alternate image side on desktop, just like the wireframe
            // const imageOnRight = index % 2 === 1;

            return (
              <div
                key={story.id}
                className={`stories flex flex-col md:flex md:flex-row justify-center gap-8 md:gap-18 items-center embla__slide flex-[0_0_100%] md:flex-[0_0_75%] min-w-0 ${index === selectedIndex ? "is-selected" : "not-selected"}`}

              >
                <div className="imaged w-56 h-56 md:w-86 md:h-86 overflow-hidden rounded-4xl ">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={500}
                    height={500}
                    className="storiesImg aspect-[1/1] object-cover transition-all duration-700"
                  />
                </div>

                <div className="storiesText transition-all duration-500 w-96 px-8">
                  <h3 className="text-xl font-bold text-text">{story.name}</h3>
                  <p className="text-sm text-text-secondary uppercase tracking-[0.05em] mt-1">
                    {story.date}
                  </p>
                  <p className="mt-3 text-text leading-relaxed max-h-57">
                    {story.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>




      <div className="my-30 embla overflow-hidden hover:cursor-grab" ref={secondEmblaRef}


      >
        <div className="embla__container flex mx-2 md:mx-0">
          {storiesOfOurChildren.groups[1].children.map((story, index) => {

            // alternate image side on desktop, just like the wireframe
            // const imageOnRight = index % 2 === 1;

            return (
              <div
                key={story.id}
                className={`stories flex flex-col md:flex md:flex-row justify-center gap-8 md:gap-18 items-center embla__slide flex-[0_0_100%] md:flex-[0_0_75%] min-w-0 ${index === selectedSecondIndex ? "is-selected" : "not-selected"}`}

              >

                <div className="storiesText transition-all duration-500 w-96 px-8 ">
                  <h3 className="text-xl font-bold text-text">{story.name}</h3>
                  <p className="text-sm text-text-secondary uppercase tracking-[0.05em] mt-1">
                    {story.date}
                  </p>
                  <p className="mt-3 text-text leading-relaxed max-h-57">
                    {story.description}
                  </p>
                </div>


                <div className="imaged w-56 h-56 md:w-86 md:h-86 overflow-hidden rounded-4xl ">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={500}
                    height={500}
                    className="storiesImg aspect-[1/1] object-cover transition-all duration-700"
                  />
                </div>


              </div>
            );
          })}
        </div>
      </div>



      <div className="mt-10 embla overflow-hidden hover:cursor-grab" ref={thirdEmblaRef}


      >
        <div className="embla__container flex mx-2 md:mx-0">
          {storiesOfOurChildren.groups[2].children.map((story, index) => {

            // alternate image side on desktop, just like the wireframe
            // const imageOnRight = index % 2 === 1;

            return (
              <div
                key={story.id}
                className={`stories flex flex-col md:flex md:flex-row justify-center gap-8 md:gap-18 items-center embla__slide flex-[0_0_100%] md:flex-[0_0_75%] min-w-0 ${index === selectedThirdIndex ? "is-selected" : "not-selected"}`}

              >
                <div className="imaged w-56 h-56 md:w-86 md:h-86 overflow-hidden rounded-4xl">
                  <Image
                    src={story.image}
                    alt={story.name}
                    width={500}
                    height={500}
                    className="storiesImg aspect-[1/1] object-cover transition-all duration-700"
                  />
                </div>

                <div className="storiesText transition-all duration-500 w-96 px-8">
                  <h3 className="text-xl font-bold text-text">{story.name}</h3>
                  <p className="text-sm text-text-secondary uppercase tracking-[0.05em] mt-1">
                    {story.date}
                  </p>
                  <p className="mt-3 text-text leading-relaxed max-h-57">
                    {story.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>







      {/* ------------------------------------------------------------------------------------------------------------- */}


      <div className="mt-30 flex justify-center">
        <button className="border border-border cursor-pointer bg-background text-text font-medium px-6 py-3 rounded-lg hover:bg-primary-light transition-colors">
          {storiesOfOurChildren.buttonText}
        </button>
      </div>
    </section>
  );
}
