import Link from "next/link";
import { RiverChart } from "./RiverChart";
import { formatNumber, getLatestRiverFlow } from "../utils";
import { getCurrentRiverWeather, getRiverWaterData } from "../api";

type Props = {
  river: River;
};

export const RiverPreviewCard = async ({ river }: Props) => {
  const { temp, windSpeed } = await getCurrentRiverWeather(river.uuid);
  const waterData = await getRiverWaterData(river.uuid);
  const currentFlowEntry = getLatestRiverFlow(waterData.flows);

  return (
    <div className="card card-bordered border-slate-500 bg-gray-50 shadow-md rounded-md bg-white w-full xl:w-1/4 m-4">
      <div className="pt-4 ps-8">
        <Link
          className="hover:underline"
          href={`/states/${river.stateAbbr}/rivers/${river.uuid}`}
        >
          <h2 className="card-title">{river.name}</h2>
          <span className="text-slate-500 text-md font-medium">
            📍 {river.location}
          </span>
          <div className="flex flex-wrap mb-4">
            <div className="flex flex-col mx-2 items-start">
              <p className="mt-4 font-bold">Flow</p>
              <p>{`${formatNumber(currentFlowEntry.value)} cfs`}</p>
            </div>
            <div className="flex flex-col mx-2 items-start">
              <p className="mt-4 font-bold">Wind</p>
              <p>{`${windSpeed} mph`}</p>
            </div>
            <div className="flex flex-col mx-2 items-start">
              <p className="mt-4 font-bold">Temp</p>
              <p>{`${temp} °F`}</p>
            </div>
          </div>
        </Link>
      </div>
      <div className="card-body p-6 px-2 pb-12 pt-4">
        <RiverChart riverFlows={waterData.flows} />
      </div>
    </div>
  );
};
