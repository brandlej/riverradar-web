"use client";

import { LatLngExpression } from "leaflet";
import dynamic from "next/dynamic";

type Props = {
  position: LatLngExpression;
  zoom?: number;
  markerPopupText?: string;
};

const LazyMap = dynamic(
  () => import("@/app/components/Map").then((mod) => mod.Map),
  {
    ssr: false,
    loading: () => (
      <div>
        <div className="skeleton h-44 w-full bg-slate-300/75 rounded-md animate-none"></div>
      </div>
    ),
  }
);

export const MapCaller = (props: Props) => {
  return <LazyMap {...props} />;
};
