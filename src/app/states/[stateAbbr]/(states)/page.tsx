import { Metadata } from "next";
import { Suspense } from "react";
import { RiverPreviewCard } from "@/app/components/RiverPreviewCard";
import { stateAbbrDict } from "@/app/constants";
import { getStateRivers } from "@/app/api";
import { RiverPreviewLoadingSkeleton } from "@/app/components/RiverPreviewLoadingSkeleton";

export async function generateMetadata({
  params: { stateAbbr },
}: {
  params: { stateAbbr: string };
}): Promise<Metadata> {
  const state = stateAbbrDict[stateAbbr];

  return {
    title: `${state} Rivers Flows, Weather & Conditions | RiverRadar`,
    description:
      `Get real-time flows, weather, and conditions on all ${state} rivers. ` +
      `Stay informed with accurate information to plan your activities.`,
  };
}

export default async function StateRivers({
  params: { stateAbbr },
}: {
  params: { stateAbbr: string };
}) {
  const stateRivers = await getStateRivers(stateAbbr);

  return (
    <>
      {stateRivers.map((river: River) => (
        <Suspense key={river.uuid} fallback={<RiverPreviewLoadingSkeleton />}>
          <RiverPreviewCard key={river.uuid} river={river} />
        </Suspense>
      ))}
    </>
  );
}
