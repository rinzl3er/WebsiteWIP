"use client";

import Image from "next/image";
import Link from "next/link";

const row1Logos = [
  "Penthouse NIBM.jpg",
  "piramal.jpg",
  "Havells.jpg",
  "grand hyatt.png",
  "adani.png",
  "Playboy club mumbai.jpg",
];

const row2Logos = [
  "B.jpg",
  "Farzi cafe.png",
  "Hashtag pub bar kitchen.jpg",
  "INVINCIBLE.jpg",
  "Opal Bar & Cafe.png",
  "Perfect place in town.png",
  "Privee The ecstasy.jpg",
  "Raasta.jpg",
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
  "House of Lords.png",
  "trafic.png",
  "sky stories.jpg",
  "sarabi.jpeg",
  "backstage pune.jpg",
  "Xclusive.jpg",
  "The Yeastern Civilization.png",
  "SOHO goa.jpg",
  "Artistry Goa.jpg",
  "kiki by the sea goa.jpg",
  "Playboy beer garden ludhiana.png",
  "le Nabini dakar.jpg",
  "8 mad men.jpg",
  "top notch.png",
  "deja vu.jpg",
  "clava.jpg",
  "bolt brewing co.jpg",
  "drunk panda.jpg",
  "the villa bhuj.png",
  "Que lucknow.jpg",
  "kaliedoscope.jpg",
  "Blackout jaipur.jpg",
  "zarza jaipur.jpg",
  "PPT kolkata.jpg",
  "Open house siliguri.jpg",
  "terytree siliguri.jpg",
  "loop ranchi.jpg",
  "Megumi.png",
  "goose and the gridiron.jpg",
  "glitte mumbai.png",
  "Spice laundry.png",
  "Tafe Mumbai.png",
  "145 mumbai.jpg",
  "drunkyard mumbai.png",
  "Hammer and song.png",
  "Tap mumbai.jpg",
  "Yellow lights school.jpg",
  "Marquee Hyderabad.jpg",
  "King'dome Hyderabad.png",
  "toggo hyderabad.png",
  "crossbreed hyderabad.jpg",
  "nicos hyderabad.png",
  "airlive hyderabad.jpg",
  "skyhy hyderabad.jpg",
  "berlin hyderabad.jpg",
  "birdbox hyderabad.jpg",
  "T-hub hyderabad.jpg",
  "oso delhi.png"
];

const toLogoItems = (logos: string[]) =>
  logos
    .map((logo) => logo.trim())
    .filter(Boolean)
    .map((logo) => ({
      name: logo,
      src: `/company-logos/${logo}`,
      alt: logo.replace(/\.[^/.]+$/, "").replace(/[-_]/g, " "),
    }));

const row1LogoItems = toLogoItems(row1Logos);
const row2LogoItems = toLogoItems(row2Logos);

export function TrustedBy() {
  return (
    <section className="py-24 lg:py-32 overflow-hidden border-t border-border bg-background relative">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 mb-16">
        <h2 className="text-3xl font-black sm:text-5xl text-center">
          Trusted <span className="text-primary text-stroke-black">By.</span>
        </h2>
      </div>

      <Link
        href="/gallery#images"
        className="relative flex flex-col gap-10 w-full max-w-[100vw] overflow-hidden cursor-pointer group"
      >
        {/* Top/Bottom gradient masks for smooth fade in/out on edges */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-[15%] sm:w-1/4 z-10 bg-gradient-to-r from-background to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-[15%] sm:w-1/4 z-10 bg-gradient-to-l from-background to-transparent" />

        {/* Row 1 */}
        <div className="flex w-fit animate-marquee group-hover:[animation-play-state:paused]">
          {[...row1LogoItems, ...row1LogoItems].map((logo, idx) => (
            <div
              key={`row1-${logo.name}-${idx}`}
              className="flex items-center justify-center w-[160px] sm:w-[220px] mx-6 sm:mx-10 shrink-0"
            >
              <div className="relative w-full h-24 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 220px"
                />
              </div>
            </div>
          ))}
        </div>

        {/* Row 2 (Reverse) */}
        <div className="flex w-fit animate-marquee-reverse group-hover:[animation-play-state:paused]">
          {[...row2LogoItems, ...row2LogoItems].map((logo, idx) => (
            <div
              key={`row2-${logo.name}-${idx}`}
              className="flex items-center justify-center w-[160px] sm:w-[220px] mx-6 sm:mx-10 shrink-0"
            >
              <div className="relative w-full h-24 group-hover:scale-105 transition-transform duration-500">
                <Image
                  src={logo.src}
                  alt={logo.alt}
                  fill
                  className="object-contain"
                  sizes="(max-width: 768px) 160px, 220px"
                />
              </div>
            </div>
          ))}
        </div>
      </Link>
    </section>
  );
}
