"use client";

import Image from "next/image";

const row1Logos = [
  "B.jpg",
  "Farzi cafe.png",
  "Hashtag pub bar kitchen.jpg",
  "INVINCIBLE.jpg",
  "Opal Bar & Cafe.png",
  "Penthouse NIBM.jpg",
  "Perfect place in town.png",
  "Playboy club mumbai.jpg",
  "Privee The ecstasy.jpg",
  "Raasta.jpg",
];

const row2Logos = [
  "SOHO delhi.jpg",
  "Sin city.png",
  "Tea (hindi typograhy).jpg",
  "The Dugout.png",
  "Toy goa beach club.jpg",
  "Transol The fuel for desire.jpg",
  "dhunki.jpg",
  "heart cup coffee.png",
  "lord of the drinks.jpg",
  "ohh pitara.jpg",
];

export function TrustedBy() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden border-t border-border bg-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-black sm:text-5xl text-center">
          Trusted <span className="text-primary text-stroke-black">By.</span>
        </h2>
      </div>

      <div className="relative flex flex-col gap-10 w-full max-w-[100vw] overflow-hidden">
        {/* Top/Bottom gradient masks for smooth fade in/out on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] sm:w-1/4 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] sm:w-1/4 z-10 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 */}
        <div className="flex w-fit animate-marquee hover:[animation-play-state:paused]">
          {[...row1Logos, ...row1Logos].map((logo, idx) => (
            <div
              key={`row1-${idx}`}
              className="flex items-center justify-center w-[160px] sm:w-[220px] mx-6 sm:mx-10 shrink-0"
            >
              <div className="relative w-full h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <Image
                  src={`/company-logos/${logo}`}
                  alt={`Client Logo ${idx}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 220px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 (Reverse) */}
        <div className="flex w-fit animate-marquee-reverse hover:[animation-play-state:paused]">
          {[...row2Logos, ...row2Logos].map((logo, idx) => (
            <div
              key={`row2-${idx}`}
              className="flex items-center justify-center w-[160px] sm:w-[220px] mx-6 sm:mx-10 shrink-0"
            >
              <div className="relative w-full h-24 grayscale opacity-60 hover:grayscale-0 hover:opacity-100 transition-all duration-500">
                <Image
                  src={`/company-logos/${logo}`}
                  alt={`Client Logo ${idx}`}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 220px"
                />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
