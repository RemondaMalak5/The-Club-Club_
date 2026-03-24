import React from "react";
import { MapContainer, TileLayer, Marker, Popup, Tooltip } from "react-leaflet";
import L from "leaflet";

// حل مشكلة أيقونة الماركر
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png",
  iconUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png",
  shadowUrl:
    "https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png",
});

const Map_component = () => {
  const locations = [
    { name: "نادى النادى فرع 6th of October", position: [30.001793841482822, 30.94925201545602] },
    { name: "نادى النادى فرع New Cairo", position: [30.045574816081423, 31.69354508301916] },
    { name: " نادى النادى فرع شيراتون ", position: [30.11056288315568, 31.377155795058588] },
  ];

  return (
    <div className=" w-full h-full ">
      <MapContainer
        center={[30.0444, 31.2357]}
        zoom={11}
        scrollWheelZoom={true}
        className="w-full h-full"
      >
        <TileLayer
          attribution='&copy; OpenStreetMap'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {locations.map((loc, index) => (
          <Marker key={index} position={loc.position}>
            {/* الاسم دايمًا ظاهر */}
            <Tooltip permanent direction="top" offset={[0, -10]}>
              {loc.name}
            </Tooltip>

            {/* لما تضغطي على Marker يظهر خيار فتح Google Maps */}
            <Popup>
              <a
                href={`https://www.google.com/maps?q=${loc.position[0]},${loc.position[1]}`}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 underline"
              >
                افتح {loc.name} في Google Maps
              </a>
            </Popup>
          </Marker>
        ))}
      </MapContainer>
    </div>
  );
};

export default Map_component;