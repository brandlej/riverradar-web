"use client";

// Order matters here
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, Marker, Popup, TileLayer } from "react-leaflet";
import { LatLngExpression } from "leaflet";

type Props = {
  position: LatLngExpression;
  zoom?: number;
  markerPopupText?: string;
};

export const Map = ({ position, zoom = 10, markerPopupText }: Props) => {
  return (
    <div style={{ height: "175px" }}>
      <MapContainer
        center={position}
        zoom={zoom}
        scrollWheelZoom={true}
        style={{ height: "100%", minHeight: "100%" }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        <Marker position={position}>
          {markerPopupText && <Popup>{markerPopupText}</Popup>}
        </Marker>
      </MapContainer>
    </div>
  );
};
