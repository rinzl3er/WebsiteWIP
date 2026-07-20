import { CalculatorHeader } from "@/components/calculator/CalculatorHeader";
import { RoomDetailsCard } from "@/components/calculator/RoomDetailsCard";
import { RoomSurfacesCard } from "@/components/calculator/RoomSurfacesCard";
import { CalculatedRoomCard } from "@/components/calculator/CalculatedRoomCard";
import { ResultsCard } from "@/components/calculator/ResultsCard";
import { SiteLayout } from "@/components/site-layout";
import { Particles } from "@/components/particles";
import { getMaterialLibrary } from "@/lib/material-parser";
import { MaterialProvider } from "@/components/calculator/MaterialContext";

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
