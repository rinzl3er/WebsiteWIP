import { CalculatorHeader } from "@/features/acoustics/components/CalculatorHeader";
import { RoomDetailsCard } from "@/features/acoustics/components/RoomDetailsCard";
import { RoomSurfacesCard } from "@/features/acoustics/components/RoomSurfacesCard";
import { CalculatedRoomCard } from "@/features/acoustics/components/CalculatedRoomCard";
import { ResultsCard } from "@/features/acoustics/components/ResultsCard";
import { SiteLayout } from "@/components/shared/site-layout";
import { Particles } from "@/components/shared/particles";
import { getMaterialLibrary } from "@/features/acoustics/lib/material-parser";
import { MaterialProvider } from "@/features/acoustics/components/MaterialContext";

export default function AcousticCalculatorPage() {
  const { materials, groupedMaterials } = getMaterialLibrary();

  return (
    <SiteLayout>
      <Particles className="-z-10" />
      <div className="min-h-screen pt-32 pb-20 px-4 sm:px-6 lg:px-8">
        <MaterialProvider materials={materials} groupedMaterials={groupedMaterials}>
          <div className="max-w-6xl mx-auto space-y-24">
            <section className="space-y-8">
              <CalculatorHeader />
              <RoomDetailsCard />
            </section>
            
            <RoomSurfacesCard />
            
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
              <div className="lg:col-span-5">
                <div className="sticky top-32">
                  <CalculatedRoomCard />
                </div>
              </div>
              <div className="lg:col-span-7">
                <ResultsCard />
              </div>
            </div>
          </div>
        </MaterialProvider>
      </div>
    </SiteLayout>
  );
}
