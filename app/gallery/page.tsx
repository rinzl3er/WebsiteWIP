import type { Metadata } from "next";
import Image from "next/image";
import { PageHeader, SiteLayout } from "@/components/shared/site-layout";
import { Particles } from "@/components/shared/particles";

export const metadata: Metadata = {
  title: "Projects — Chintan Patel",
  description:
    "Watch installations, tuning sessions and completed acoustics, lighting and AV projects.",
  openGraph: {
    title: "Projects — Chintan Patel",
    description:
      "Video gallery showcasing acoustics, lighting, home theatre and AV installations.",
  },
};

const videos = [
  "kNJRmYJ9ruM", "Lubpz4J9-nw", "Qj-EpqxQZzI", "bhxlW1gYSCo", "wyJCqE11Vc4",
  "xtDlPFU3QrU", "6fEDYFbInlI", "wqueoSh76Ks", "VlRLfoGH2Vg", "lmLkEd9wPUU",
  "DnXMBgXgYAg", "HMGml4fadBA", "JaM3jvKFK2M",
];

const images = [
  ["8 Mad Men, Sambalpur A.jpeg", "8 Mad Men", "Sambalpur"],
  ["Carpe Diem, Kolkata A.jpg", "Carpe Diem", "Kolkata"],
  ["Clava, Jabalpur A.jpeg", "Clava", "Jabalpur"],
  ["Hashtag, Siliguri A.jpg", "Hashtag", "Siliguri"],
  ["Hashtag, Siliguri B.jpg", "Hashtag", "Siliguri"],
  ["Mansion, Agra A.jpg", "Mansion", "Agra"],
  ["Mansion, Agra B.jpg", "Mansion", "Agra"],
  ["NYX, Guwahati A.jpg", "NYX", "Guwahati"],
  ["NYX, Guwahati B.jpg", "NYX", "Guwahati"],
  ["NYX, Guwahati C.jpg", "NYX", "Guwahati"],
  ["Playboy Beer Garden, Ludhiana A.jpeg", "Playboy Beer Garden", "Ludhiana"],
  ["Playboy Club Mumbai A.jpg", "Playboy Club", "Mumbai"],
  ["Playboy Club Mumbai B.jpg", "Playboy Club", "Mumbai"],
  ["Poddar House, Mumbai A.jpg", "Poddar House", "Mumbai"],
  ["Poddar House, Mumbai B.jpg", "Poddar House", "Mumbai"],
  ["Poddar House, Mumbai C.jpg", "Poddar House", "Mumbai"],
  ["Poddar House, Mumbai D.jpg", "Poddar House", "Mumbai"],
  ["Privee, New Delhi A.jpg", "Privee", "New Delhi"],
  ["Sea View Pearl, Dapoli A.jpg", "Sea View Pearl", "Dapoli"],
  ["Sea View Pearl, Dapoli B.jpg", "Sea View Pearl", "Dapoli"],
  ["Sin City, Mumbai A.jpg", "Sin City", "Mumbai"],
  ["TeryTree, Siliguri A.jpg", "TeryTree", "Siliguri"],
  ["TeryTree, Siliguri B.jpg", "TeryTree", "Siliguri"],
  ["TeryTree, Siliguri C.jpg", "TeryTree", "Siliguri"],
  ["TeryTree, Siliguri D.jpg", "TeryTree", "Siliguri"],
  ["Yellow Lights School for Performing Arts, Thane A.jpg", "Yellow Lights School for Performing Arts", "Thane"],
] as const;

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <PageHeader className="bg-transparent" showGridLines={false} showBorder={false} eyebrow="Projects" title="Projects" intro="Browse completed projects through our image and video galleries." />

      <section id="videos" className="relative z-10 py-20">
        <div className="mx-auto max-w-[1700px] px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">Video Gallery</h2>
            <a href="#images" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">📷 <span> Check Image Gallery</span></a>
          </div>
          <div className="grid gap-8 lg:grid-cols-3">
            {videos.map((id, index) => (
              <div key={id} className="overflow-hidden rounded-2xl border border-border shadow-lg">
                <div className="aspect-video">
                  <iframe className="h-full w-full" src={`https://www.youtube.com/embed/${id}`} title={`Project Video ${index + 1}`} loading="lazy" allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerPolicy="strict-origin-when-cross-origin" allowFullScreen />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section id="images" className="relative z-10 py-10">
        <div className="mx-auto max-w-7xl px-6">
          <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
            <h2 className="text-3xl font-bold">Image Gallery</h2>
            <a href="#videos" className="inline-flex items-center justify-center gap-2 rounded-full bg-primary px-6 py-3 font-medium text-primary-foreground transition hover:opacity-90">🎥 <span>Check Video Gallery</span></a>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {images.map(([filename, venue, location]) => (
              <div key={filename} className="group relative overflow-hidden rounded-xl shadow-lg h-72 w-full">
                <Image 
                  src={`/site-images/${filename}`} 
                  alt={`${venue} - ${location}`} 
                  fill
                  sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                  className="object-cover transition duration-500 group-hover:scale-105" 
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent transition-all duration-300 ease-out lg:from-transparent lg:via-transparent lg:to-transparent lg:bg-transparent lg:group-hover:from-black/85 lg:group-hover:via-black/30 lg:group-hover:to-transparent" />
                <div className="absolute bottom-0 left-0 p-5">
                  <h3 className="text-lg font-semibold text-white transition-all duration-300 ease-out lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0">
                    {venue}
                  </h3>
                  <p className="mt-1 text-base text-white/80 transition-all duration-300 ease-out lg:opacity-0 lg:translate-y-2 lg:group-hover:opacity-100 lg:group-hover:translate-y-0 lg:group-hover:delay-75">
                    📍 {location}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
