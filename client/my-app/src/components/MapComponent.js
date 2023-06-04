import React from "react";
import { useLoadScript, GoogleMap, Marker } from "@react-google-maps/api";

export default function MapComponent() {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  if (!isLoaded) return <div>Loading...</div>;

  return (
    <GoogleMap
      zoom={10}
      center={{ lat: 40.7128, lng: -74.0060 }}
      mapContainerClassName="maps-container"
    >
      {/* Additional map components can be added here, like markers */}
    </GoogleMap>
  );
}

