import { useNavigate, useSearchParams } from "react-router-dom";
import styles from "../starter/components/Map.module.css";
import { MapContainer, Marker, Popup, TileLayer, useMap, useMapEvents } from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../context/CitiesCtx";

function Map() {
  const { cities } = useCities();

  const [mapPosition, setMapPostion] = useState([40, 0]);

  const [searchParams] = useSearchParams();

  const mapLat = searchParams?.get("lat");
  const mapLng = searchParams?.get("lng");

  useEffect(
    function () {
      if (mapLat && mapLng) setMapPostion([mapLat, mapLng]);
    },
    [mapLat, mapLng]
  );

  return (
    <div className={styles.mapContainer}>
      <MapContainer
        className={styles.map}
        center={mapPosition}
        zoom={10}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((c) => (
          <Marker position={[c.position.lat, c.position.lng]} key={c.id}>
            <Popup>{c.cityName}</Popup>
          </Marker>
        ))}
        <ChangeCenter position={mapPosition} />
        <DetectClick />
      </MapContainer>
    </div>
  );
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
function DetectClick(){
  const navigate = useNavigate()
  useMapEvents({
    click: e=>{
      navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`)

    }
  })
}
export default Map;
