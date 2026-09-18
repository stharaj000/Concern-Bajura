"use client";

import { useRef, useState } from "react";
import Link from "next/link";
import { Speaker } from "lucide-react";

export default function Hero({ data }) {
  const videoRef = useRef(null);
  const [soundEnabled, setSoundEnabled] = useState(false);

  const toggleSound = async () => {
    const video = videoRef.current;

    if (!video) return;

    try {
      if (video.muted) {
        // Enable sound
        video.muted = false;
        await video.play();
        setSoundEnabled(true);
      } else {
        // Disable sound
        video.muted = true;
        setSoundEnabled(false);
      }
    } catch (error) {
      console.error("Could not toggle video sound:", error);
    }
  };

  return (
    <section className="text-text-white h-screen relative flex">
      {/* Sound toggle */}
      <button
        onClick={toggleSound}
        className={`absolute top-8 right-8 z-20 ${!soundEnabled && 'bg-black/60'} text-white px-5 py-3 cursor-pointer rounded-full backdrop-blur-sm hover:bg-black/80 transition`}
        aria-label={soundEnabled ? "Mute video" : "Enable video sound"}
      >
        {soundEnabled ? "🔇 Mute" : "🔊 Enable sound"}
      </button>

      {/* Background video */}
      <div className="bg-white/10 rounded-2xl h-1/3 md:h-screen w-full flex justify-center absolute z-10">
        <video
          ref={videoRef}
          autoPlay
          muted
          loop
          playsInline
          controls
          controlsList="nodownload noplaybackrate"
          className="w-full brightness-50 h-full inset-0 object-cover"
        >
          <source src={data.video} type="video/mp4" />
        </video>
      </div>

      {/* Content */}
      <div className="max-w-6xl mx-auto px-4 md:px-6 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center relative top-24 md:top-0 z-20">
        <div className="md:flex flex-col gap-4">
          <h1 className="text-2xl md:text-5xl md:w-full font-bold leading-tight tracking-[-0.02em] text-text md:text-text-white md:text-shadow-black md:text-shadow-md">
            {data.title}
          </h1>

          <p className="mt-5 text-base md:text-lg text-text md:text-text-white md:text-shadow-black">
            {data.subtitle}
          </p>

          <div className="mt-7 flex md:flex-wrap gap-4">
            <Link href={data.button1Link}>
              <button className="bg-primary text-shadow-md text-text-white font-medium px-2 md:px-6 py-3 rounded-lg hover:bg-primary-hover cursor-pointer transition-colors">
                {data.button1Text}
              </button>
            </Link>

            <Link href={data.button2Link}>
              <button className="border border-border text-black md:text-text-white font-medium px-2 md:px-6 py-3 rounded-lg hover:bg-buttonhover/30 cursor-pointer transition-colors md:text-shadow-md">
                {data.button2Text}
              </button>
            </Link>
          </div>

          {/* Stats */}
          <div className="mt-10 flex gap-10">
            <div>
              <p className="text-2xl md:text-3xl font-bold text-shadow-black text-text md:text-text-white md:text-shadow-md">
                {data.helper1Value}
              </p>

              <p className="text-sm md:text-text-white uppercase tracking-[0.05em] text-shadow-black text-text-secondary md:text-shadow-sm">
                {data.helper1Title}
              </p>
            </div>

            <div>
              <p className="text-2xl md:text-3xl font-bold text-shadow-black text-text md:text-text-white md:text-shadow-md">
                {data.helper2Value}
              </p>

              <p className="text-sm text-text-secondary md:text-text-white uppercase tracking-[0.05em] text-shadow-black md:text-shadow-sm">
                {data.helper2Title}
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
