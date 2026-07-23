import { PageHeader, SiteLayout } from "@/components/shared/site-layout";
import { Particles } from "@/components/shared/particles";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects | Chintan Patel",
  description: "A comprehensive list of our installations and projects.",
};

const locations = [
  {
    name: "Coming Soon...",
    projects: ["Tinsukia", "Abidjan", "Goa", "Banglore", "Hyderabad", "Bareilly", "Mumbai", "Prayagraj", "Pune"]
  },
  {
    name: "Mumbai",
    projects: [
      "Lucy Lou", "Megumi", "Goose and the Gridiron", "House of Lords", "Glitte",
      "Oh Pitara", "Spice Laundry", "Tafe", "145", "Drunkyard", "Playboy Club Mumbai",
      "Sin City", "B-Kitchen & Bar", "Hammer & Song", "Invincible", "Tap, Worli",
      "The Yellow Lights School of Performing Arts", "...Many More"
    ]
  },
  {
    name: "Hyderabad",
    projects: [
      "Marquee", "King'dome", "Toggo", "Karimnagar Cable Bridge", "Crossbreed",
      "Nicos", "Heart Cup Coffee, Gachibowli", "Airlive, Gachibowli", "Skyhy",
      "Berlin", "Birdbox", "T-Hub", "Raasta", "Animal Park"
    ]
  },
  {
    name: "Delhi",
    projects: ["Oso", "Soho Club", "Privee"]
  },
  {
    name: "Pune",
    projects: ["Opus", "Sky Stories", "Penthouze NIBM", "Backstage", "Xclusive"]
  },
  {
    name: "Goa",
    projects: ["Sarabi", "Artistry", "Kiki By The Sea", "Toy Beach Club", "Soho"]
  },
  {
    name: "Africa",
    projects: ["Trafic, Bamako & Dakar", "Le Nabini, Dakar"]
  },
  {
    name: "Lucknow",
    projects: ["Farzi Cafe", "Que", "Kaleidoscope"]
  },
  {
    name: "Jaipur",
    projects: ["Blackout", "Zarza"]
  },
  {
    name: "Kolkata",
    projects: ["Hashtag", "PPT", "Carpe Diem", "Raasta"]
  },
  {
    name: "Siliguri",
    projects: ["Terytree", "Hashtag", "Open House", "Dugout", "Lord of the Drinks"]
  },
  {
    name: "Ranchi",
    projects: ["Loop", "Dhunki", "Lod"]
  },
  {
    name: "Guwahati",
    projects: ["Nyx"]
  },
  {
    name: "Shillong",
    projects: ["The Yeast Company"]
  },
  {
    name: "Nagpur",
    projects: ["Raasta"]
  },
  {
    name: "Agra",
    projects: ["Mansion"]
  },
  {
    name: "Ludhiana",
    projects: ["Playboy Beer Garden"]
  },
  {
    name: "Sambalpur",
    projects: ["8 Mad Men"]
  },
  {
    name: "Bhubaneshwar",
    projects: ["Top Notch"]
  },
  {
    name: "Bareilly",
    projects: ["Deja Vu"]
  },
  {
    name: "Jabalpur",
    projects: ["Clava"]
  },
  {
    name: "Rourkela",
    projects: ["Bolt Brewing Co"]
  },
  {
    name: "Jamshedpur",
    projects: ["Dugout"]
  },
  {
    name: "Sivsagar",
    projects: ["Drunk Panda"]
  },
  {
    name: "Bhuj",
    projects: ["The Villa"]
  }
];

export default function ProjectsPage() {
  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <PageHeader
        className="bg-transparent"
        showGridLines={false}
        showBorder={false}
        eyebrow="Portfolio"
        title="Our Projects."
        intro="A comprehensive list of our installations and projects."
        glowPosition="center"
        animateGlow={true}
      />

      <section className="relative z-10 py-20 lg:py-28">
        <div className="absolute inset-0 bg-ink-dark/50 -z-10" />

        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="columns-1 md:columns-2 lg:columns-3 gap-8 space-y-8">
            {locations.map((location) => (
              <div
                key={location.name}
                className="break-inside-avoid border border-border/50 bg-ink-soft/40 p-8 hover:bg-ink-soft/80 hover:border-primary/50 transition-colors duration-300"
              >
                <h3 className="font-mono text-xl uppercase tracking-[0.2em] text-primary mb-6">
                  {location.name}
                </h3>
                <ul className="space-y-3">
                  {location.projects.map((project, idx) => (
                    <li key={idx} className="text-base text-muted-foreground hover:text-white transition-colors duration-200">
                      {project}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
    </SiteLayout>
  );
}
