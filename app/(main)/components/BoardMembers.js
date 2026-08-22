"use client"

import Image from "next/image";
// import m1 from "@/app/img/ourTeam/m1.jpeg"
// import m2 from "@/app/img/ourTeam/m2.jpeg"
// import m3 from "@/app/img/ourTeam/m3.jpeg"
// import m4 from "@/app/img/ourTeam/m4.jpeg"
// import m5 from "@/app/img/ourTeam/m5.jpeg"
// import m6 from "@/app/img/ourTeam/m6.jpeg"
// import m7 from "@/app/img/ourTeam/m7.jpg"
// import m8 from "@/app/img/ourTeam/m8.jpg"
// import m9 from "@/app/img/ourTeam/m9.jpg"

import { useState } from "react";


// const members = [
//   { id: 1, name: "Ganesh Thapa", role: "Founder & President", image: m1 },
//   { id: 2, name: "Padam Thapa", role: "Vice-President", image: m2 },
//   { id: 3, name: "Arjun Thapa", role: "Secretary", image: m3 },
//   { id: 4, name: "Kavita Bista Thapa", role: "Treasurer", image: m4 },
//   { id: 5, name: "Bhim Khadka", role: "Advisor", image: m5 },
//   { id: 6, name: "Sendlinger Leon", role: "International Advisor", image: m6 },
//   { id: 7, name: "Manish Kafle", role: "Australian Representative", image: m7 },
//   { id: 8, name: "Ravins Pokhrel", role: "IT Admin", image: m8 },
//   { id: 9, name: "Sahil Nepal", role: "Program Co-ordinator & Technical Advisor", image: m9 },
// ];

export default function BoardMembers({ data }) {

  const [paused, setpaused] = useState(false);


  return (
    <section className=" relative overflow-x-hidden bg-surface-alt">
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20">
        <h2 className="text-2xl md:text-3xl font-semibold text-center text-text-muted tracking-[-0.01em]">
          {data.title}
        </h2>


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
                <p className="mt-3 text-sm font-medium text-text-muted uppercase trackin42g-[0.05em]">
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
                <p className="mt-3 text-sm font-medium text-text-muted uppercase tracking-[0.05em]">
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
