import { APIProvider, Map } from "@vis.gl/react-google-maps";
import { Box } from "@mui/material";
import DynamicMarker from "../utils/DynamicMarker";
import DefaultMarker from "../utils/DefaultMarker";
import { useEffect, useState } from "react";

const dummy_data = [
  {
    latLng: {
      lat: 13.652492537970327,
      lng: 100.49838066101074,
    },
  },
  {
    latLng: {
      lat: 13.65310501960418,
      lng: 100.50277453158212,
    },
  },
  {
    latLng: {
      lat: 13.6500398534523,
      lng: 100.50277453158212,
    },
  },
  {
    latLng: {
      lat: 13.656858230032176,
      lng: 100.50249558184457,
    },
  },
];

const GoogleMap = ({ geolocate, setGeolocate }) => {
  const [latLng, setLatLng] = useState(null);
  useEffect(() => {
    setGeolocate((prev) => latLng);
  }, [latLng, setLatLng]);

  return (
    <APIProvider apiKey={import.meta.env.VITE_MAP_API_KEY}>
      <Box
        sx={{
          height: "25rem",
          width: "auto",
        }}
      >
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultZoom={16}
          defaultCenter={{ lat: 13.6528826048356, lng: 100.49611550110437 }}
          mapTypeControl={false}
          fullscreenControl={false}
          streetViewControl={false}
          reuseMaps={true}
          gestureHandling="greedy"
          onClick={(event) => {
            setLatLng((prev) => event.detail.latLng);
          }}
        >
          {/* Existing Markers */}
          {dummy_data.map((obj, index) => (
            <Box key={index}>
              <DefaultMarker latLng={obj.latLng} />
            </Box>
          ))}

          {/* Dynamic Maker */}
          <DynamicMarker latLng={latLng} />
        </Map>
      </Box>
    </APIProvider>
  );
};

export default GoogleMap;
