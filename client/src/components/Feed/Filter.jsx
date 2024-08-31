import React, { useEffect, useRef, useState } from "react";
import {
  Box,
  TextField,
  Slider,
  Checkbox,
  FormControlLabel,
  Typography,
  Button,
} from "@mui/material";

const Filter = () => {
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [distance, setDistance] = useState(0);
  const [rooms, setRooms] = useState({
    studio: false,
    oneBedroom: false,
    twoBedrooms: false,
    threeBedrooms: false,
  });
  const [livingType, setLivingType] = useState({
    shared: false,
    private: false,
  });
  const [filterData, setFilterData] = useState({});

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setPriceRange((prev) => ({ ...prev, [name]: value }));
  };
  const handleDistanceChange = (e, value) => {
    setDistance(value);
  };

  const handleRoomsChange = (e) => {
    const { name, checked } = e.target;
    setRooms((prev) => ({ ...prev, [name]: checked }));
  };

  const handleLivingTypeChange = (e) => {
    const { name, checked } = e.target;
    setLivingType((prev) => ({ ...prev, [name]: checked }));
  };

  const handleApply = () => {
    setFilterData({
      priceRange,
      distance,
      rooms,
      livingType,
    });

    // You can use `filterData` to send to your database or perform any action
    console.log("Applied Filters:", {
      priceRange,
      distance,
      rooms,
      livingType,
    });
  };

  const sliderMarks = [
    { value: 0, label: "0km" },
    { value: 5, label: "5km" },
    { value: 10, label: "10km" },
  ];

  const header = {
    fontSize: "1rem",
    fontWeight: "bold",
    color: "grey",
  };

  const body = {
    fontSize: "0.75rem",
    fontFamily: "Lato",
    fontWeight: "regular",
    color: "black",
  };

  return (
    <Box
      sx={{
        position: "absolute",
        top: 50,
        left: 0,
        zIndex: "9999",
        backgroundColor: "white",
        display: "flex",
        flexDirection: "column",
        padding: "16px",
        border: "2px solid #ccc",
        borderRadius: "8px",
        width: "250px",
        boxSizing: "border-box",
        margin: "auto",
        boxShadow:
          "rgba(0, 0, 0, 0.25) 0px 14px 28px, rgba(0, 0, 0, 0.22) 0px 10px 10px",
      }}
    >
      {/* Price Range */}
      <Box sx={{ marginBottom: "16px" }}>
        <Typography sx={header}>Price Range</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "10px",
            marginBottom: "5px",
          }}
        >
          <TextField
            label="Min"
            variant="outlined"
            size="small"
            sx={{ width: "48%", color: "white" }}
            name="min"
            value={priceRange.min}
            onChange={handlePriceChange}
          />
          <TextField
            label="Max"
            variant="outlined"
            size="small"
            sx={{ width: "48%", color: "white" }}
            name="max"
            value={priceRange.max}
            onChange={handlePriceChange}
          />
        </Box>
      </Box>

      {/* Distance from current location */}
      <Box
        sx={{
          marginBottom: "16px",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Typography sx={header}>Distance from location</Typography>
        <Slider
          defaultValue={0}
          aria-labelledby="discrete-slider"
          valueLabelDisplay="auto"
          step={1}
          marks={sliderMarks}
          min={0}
          max={10}
          sx={{ marginTop: "8px", width: "85%" }}
          value={distance}
          onChange={handleDistanceChange}
        />
      </Box>

      {/* No. of rooms */}
      <Box sx={{ marginBottom: "16px" }}>
        <Typography sx={header}>No. of rooms</Typography>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            flexWrap: "wrap",
            marginTop: "8px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="studio"
                checked={rooms.studio}
                onChange={handleRoomsChange}
              />
            }
            label={<Typography sx={body}>Studio Room</Typography>}
            sx={{ width: "100%", marginBottom: "-8px" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="oneBedroom"
                checked={rooms.oneBedroom}
                onChange={handleRoomsChange}
              />
            }
            label={<Typography sx={body}>1 Bedroom</Typography>}
            sx={{ width: "100%", marginBottom: "-8px" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="twoBedrooms"
                checked={rooms.twoBedrooms}
                onChange={handleRoomsChange}
              />
            }
            label={<Typography sx={body}>2 Bedrooms</Typography>}
            sx={{ width: "100%", marginBottom: "-8px" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="threeBedrooms"
                checked={rooms.threeBedrooms}
                onChange={handleRoomsChange}
              />
            }
            label={<Typography sx={body}>3 Bedrooms</Typography>}
            sx={{ width: "100%", marginBottom: "-10px" }}
          />
        </Box>
      </Box>

      {/* Living Type */}
      <Box>
        <Typography sx={header}>Living Type</Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            marginTop: "8px",
          }}
        >
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="shared"
                checked={livingType.shared}
                onChange={handleLivingTypeChange}
              />
            }
            label={<Typography sx={body}>Shared</Typography>}
            sx={{ width: "100%", marginTop: "-8px" }}
          />
          <FormControlLabel
            control={
              <Checkbox
                size="small"
                name="private"
                checked={livingType.private}
                onChange={handleLivingTypeChange}
              />
            }
            label={<Typography sx={body}>Private</Typography>}
            sx={{ width: "100%", marginTop: "-8px" }}
          />
        </Box>
      </Box>
      <Button
        size="small"
        variant="outlined"
        sx={{ marginTop: "8px" }}
        onClick={handleApply}
      >
        Apply
      </Button>
    </Box>
  );
};

export default Filter;
