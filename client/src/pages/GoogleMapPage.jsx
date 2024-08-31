import { Box, TextField } from "@mui/material";
import { APIProvider, Map } from "@vis.gl/react-google-maps";
import usePlacesAutocomplete, {
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { useState } from "react";
import DefaultMarker from "../utils/DefaultMarker";
import DynamicMarker from "../utils/DynamicMarker";
import { Autocomplete } from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import parse from "autosuggest-highlight/parse";
import { v4 as uuidv4 } from "uuid";
import AuthMiddleware from "../middleware/AuthMiddleware";

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

const GoogleMapPage = () => {
  const [latLng, setLatLng] = useState({
    lat: 13.6528826048356,
    lng: 100.49611550110437,
  });
  const [selected, setSelected] = useState(null);
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({ debounce: 300 });

  const handleSelect = (e) => {
    if (e.key === "Enter") {
      setValue(selected, false);
      clearSuggestions();
      getGeocode({ address: selected }).then((results) => {
        const { lat, lng } = getLatLng(results[0]);
        const loc = {
          lat: lat,
          lng: lng,
        };
        setLatLng((prev) => loc);
      });
    }
  };

  return (
    <APIProvider apiKey={import.meta.env.VITE_MAP_API_KEY}>
      <Box
        sx={{
          height: "100vh",
        }}
      >
        <Map
          mapId={import.meta.env.VITE_MAP_ID}
          defaultZoom={15}
          center={latLng}
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
        <Autocomplete
          className="combo-box"
          autoComplete
          includeInputInList
          filterSelectedOptions
          onKeyDown={handleSelect}
          options={data}
          value={value}
          getOptionLabel={(option) =>
            typeof option === "string" ? option : option.description
          }
          renderInput={(params) => (
            <TextField {...params} label="Search Location" />
          )}
          onInputChange={(event, newVal) => {
            setValue(newVal);
            setSelected(newVal);
          }}
          filterOptions={(x) => x}
          renderOption={(props, option) => {
            const matches =
              option.structured_formatting.main_text_matched_substrings || [];

            const parts = parse(
              option.structured_formatting.main_text,
              matches.map((match) => [
                match.offset,
                match.offset + match.length,
              ])
            );

            return (
              <li {...props} key={uuidv4()}>
                <Grid container alignItems="center">
                  <Grid item sx={{ display: "flex", width: 44 }}>
                    <LocationOnIcon sx={{ color: "text.secondary" }} />
                  </Grid>
                  <Grid
                    item
                    sx={{ width: "calc(100% - 44px)", wordWrap: "break-word" }}
                  >
                    {parts.map((part, index) => (
                      <Box
                        key={index}
                        component="span"
                        sx={{ fontWeight: part.highlight ? "bold" : "regular" }}
                      >
                        {part.text}
                      </Box>
                    ))}
                    <Typography variant="body2" color="text.secondary">
                      {option.structured_formatting.secondary_text}
                    </Typography>
                  </Grid>
                </Grid>
              </li>
            );
          }}
        />
      </Box>
    </APIProvider>
  );
};

const AuthGoogleMapPage = AuthMiddleware(GoogleMapPage);
export default AuthGoogleMapPage;
