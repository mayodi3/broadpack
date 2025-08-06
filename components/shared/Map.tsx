"use client";

import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import "leaflet-defaulticon-compatibility";

import { MapContainer, TileLayer, Marker, Popup } from "react-leaflet";

interface MapProps {
  position: [number, number];
  zoom: number;
}

const Map: React.FC<MapProps> = ({ position, zoom }) => {
  return (
    <MapContainer
      center={position}
      zoom={zoom}
      scrollWheelZoom={false}
      className="h-full w-full rounded-xl z-0"
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />
      <Marker position={position}>
        <Popup>
          Broadpark Hotels <br /> Mbale, Vihiga County
        </Popup>
      </Marker>
    </MapContainer>
  );
};

export default Map;
