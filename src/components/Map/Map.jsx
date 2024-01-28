import React, { useEffect, useState } from "react";
import { UseHotels } from "../context/HotelProvider";

import {
  MapContainer,
  Marker,
  Popup,
  TileLayer,
  useMap,
  useMapEvent,
} from "react-leaflet";

import { useNavigate, useSearchParams } from "react-router-dom";
import useGeoLocation from "../../hooks/UseGeoLocation";
import useUrlLocation from "../../hooks/useUrlLocation";

function Map({ markerLoacations }) {
  const [mapCenter, setMapCenter] = useState([50, 3]);
  const [lat, lng] = useUrlLocation();
  const {
    isLoading: isLoadingGeoPosition,
    position: geoPosition,
    getPosition,
  } = useGeoLocation();

  useEffect(() => {
    if (lat && lng) setMapCenter([lat, lng]);
  }, [lat, lng]);

  useEffect(() => {
    if (geoPosition?.lat && geoPosition?.lng)
      setMapCenter([geoPosition.lat, geoPosition.lng]);
  }, [geoPosition]);
  return (
    <div className="mapContainer">
      <MapContainer
        className="map"
        center={mapCenter}
        zoom={13}
        scrollWheelZoom={true}
      >
        <button onClick={getPosition} className="getLocation ">
          {isLoadingGeoPosition ? "Loading ..." : "Use Your Location"}
        </button>
        <DetectClick />
        <ChangeCenter position={mapCenter} />
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {markerLoacations.map((item) => {
          return (
            <Marker key={item.id} position={[item.latitude, item.longitude]}>
              <Popup>{item.host_location}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
}

export default Map;

function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvent({
    click: (e) => {
      navigate(`/bookmarks/add?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
    },
  });
}
