import { RiverChart } from "@/app/components/RiverChart";
import { Metadata } from "next";
import { getRiver, getRiverWaterData, getCurrentRiverWeather } from "@/app/api";
import Link from "next/link";
import { getLatestRiverFlow } from "@/app/utils";
import { stateAbbrDict } from "@/app/constants";
import { MapCaller } from "@/app/components/MapCaller";
import { createClient } from "@/prismicio";
import { constructPrismicRiverDetailUuid } from "@/app/utils";
import { RiverDetailDocument } from "../../../../../../prismicio-types";
import { WeatherCard } from "@/app/components/WeatherCard";
import { HighlightedStat } from "@/app/components/HighlightedStat";
import { Breadcrumbs } from "@/app/components/Breadcrumbs";

type Props = {
  params: {
    stateAbbr: string;
    riverId: string;
  };
};

export async function generateMetadata({
  params: { riverId },
}: Props): Promise<Metadata> {
  const river = await getRiver(riverId);

  return {
    title: `${river.name} Flows, Weather & Conditions | RiverRadar`,
    description:
      `Get real-time updates on ${river.name} flows, ` +
      `weather and conditions. Stay informed with accurate information to plan your activities.`,
  };
}

export default async function RiverDetail({
  params: { riverId, stateAbbr },
}: {
  params: { riverId: string; stateAbbr: string };
}) {
  const river = await getRiver(riverId);
  const client = createClient();
  let pageContent: RiverDetailDocument | undefined;
  try {
    pageContent = await client.getByUID<RiverDetailDocument>(
      "river_detail",
      constructPrismicRiverDetailUuid(river.name, river.location)
    );
  } catch (e) {
    // no content created yet
  }

  const state = stateAbbrDict[stateAbbr];
  const riverWaterData = await getRiverWaterData(riverId);
  const {
    temp,
    feelsLikeTemp,
    windSpeed,
    windGust,
    humidity,
    cloudiness,
    mostRecentWeatherCondition,
  } = await getCurrentRiverWeather(riverId);

  const currentFlowEntry = getLatestRiverFlow(riverWaterData.flows);

  return (
    <>
      <Breadcrumbs
        className="py-4 px-6"
        items={[
          { label: "Home", url: "/" },
          { label: `${state} Rivers`, url: `/states/${stateAbbr}` },
          { label: `${river.name} - ${river.location}` },
        ]}
      />
      <div className="flex flex-col pt-8 pb-6 text-center font-bold mb-4">
        <h1 className="text-4xl">{river.name}</h1>
        <span className="text-slate-500 text-xl">📍 {river.location}</span>
      </div>
      <div className="flex flex-wrap justify-around mb-8">
        <HighlightedStat
          label="Latest Flow"
          value={currentFlowEntry.value}
          timestamp={currentFlowEntry.timestamp}
          unit="cfs"
        />
        <WeatherCard
          windSpeed={windSpeed}
          windGust={windGust}
          temp={temp}
          feelsLikeTemp={feelsLikeTemp}
          cloudiness={cloudiness}
          humidity={humidity}
          weatherDescription={mostRecentWeatherCondition.description}
          weatherIcon={mostRecentWeatherCondition.icon}
        />
      </div>
      <div className="mt-2">
        <RiverChart riverFlows={riverWaterData.flows} />
      </div>
      {pageContent && (
        <div className="flex flex-col pt-8 pb-6">
          <span className="text-xl font-bold mb-2">Description</span>
          <p>{pageContent.data.description}</p>
        </div>
      )}
      <div className="mt-4 pb-4">
        <MapCaller
          position={[river.lat, river.long]}
          markerPopupText={`${river.name} - ${river.location}`}
        />
      </div>
    </>
  );
}
