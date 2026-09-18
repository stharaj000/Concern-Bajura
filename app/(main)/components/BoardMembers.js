"use client"

import Image from "next/image";

import { useState } from "react";


export default function BoardMembers({ data }) {

  const [paused, setpaused] = useState(false);


  return (
    <section className=" relative overflow-x-hidden">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <h1 className="text-2xl md:text-3xl md:text-3xl font-bold text-center text-text-secondary">
          {data.title}
        </h1>


        <div
          className={`flex justify-around animate-marquee w-full gap-56 ${paused ? "[animation-play-state:paused]" : "animate-marquee"
            }`}
          style={{
            animationPlayState: paused ? "paused" : "running",
          }}
        >

          <div className="mt-10 flex shrink-0 gap-36 md:gap-56 justify-around min-w-full ">
            {data.members.map((member, index) => (
              <div key={index + 1} className="flex flex-col items-center text-center transition-transform duration-300 ease-out hover:scale-110"
                onMouseEnter={() => setpaused(true)}
                onMouseLeave={() => setpaused(false)}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="w-28 h-34 md:w-42 md:h-48 rounded-lg object-cover"
                />
                <p className="mt-3 text-md font-bold text-text uppercase tracking-[0.05em]">
                  {member.name}
                </p>
                <p className="mt-3 text-sm font-medium text-text-secondary uppercase trackin42g-[0.05em]">
                  {member.role}
                </p>
              </div>
            ))}
          </div>


          <div className="mt-10 flex shrink-0 gap-56 justify-around min-w-full">
            {data.members.map((member) => (
              <div key={member.id} className="flex flex-col items-center text-center transition-transform duration-300 ease-out hover:scale-110"
                onMouseEnter={() => setpaused(true)}
                onMouseLeave={() => setpaused(false)}
              >
                <Image
                  src={member.image}
                  alt={member.name}
                  width={500}
                  height={500}
                  className="w-28 h-48 md:w-42 md:h-48 rounded-lg object-cover"
                />
                <p className="mt-3 text-md font-bold text-text uppercase tracking-[0.05em]">
                  {member.name}
                </p>
                <p className="mt-3 text-sm font-medium text-text-secondary uppercase tracking-[0.05em]">
                  {member.role}
                </p>
              </div>
            ))}
          </div>




        </div>





      </div>
    </section>
  );
}
