import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, Marker } from "react-leaflet";

interface Props {
  details: {
    ip: string;
    location: {
      region: string;
      timezone: string;
      lat: number;
      lng: number;
    };
    isp: string;
  };
}

function Map({ details }: Props) {
  console.log(details.location.lat, details.location.lng);
  return (
    <MapContainer
      key={`${details.location.lat}-${details.location.lng}`}
      center={[details.location.lat, details.location.lng]}
      zoom={13}
      scrollWheelZoom={true}
      className="w-[100%] h-[100%] m- z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
    </MapContainer>
  );
}

export default Map;
