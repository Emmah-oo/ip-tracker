import "leaflet/dist/leaflet.css";

import { MapContainer, TileLayer, CircleMarker, Popup } from "react-leaflet";

interface Props {
  details: {
    ip: string;
    location: {
      region: string;
      timezone: string;
      country: string;
      city: string;
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
      zoom={15}
      scrollWheelZoom={true}
      className="w-[100%] h-[100%] m- z-10"
    >
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <CircleMarker
        center={[details.location.lat, details.location.lng]}
        radius={10}
        color="blue"
        fillOpacity={0.8}
      >
        <Popup className="z-50">
          <div>
            <h2>{details.ip}</h2>
            <p>
              Region: {details.location.region}, {details.location.country}
            </p>
            <p>City: {details.location.city}</p>
            <p>Timezone: {details.location.timezone}</p>
            <p>ISP: {details.isp}</p>
          </div>
        </Popup>
      </CircleMarker>
    </MapContainer>
  );
}

export default Map;
