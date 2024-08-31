import React from "react";
import { Box } from "@mui/material";

const listingDetails = {
  rent: "1,500",
  available: "May 29, 2024 - Flexible",
  type: "Entire Place Apartment",
  layout: "1 Bedroom 1 Bath",
  deposit: "None",
};

const divStyle = {
  marginLeft: "5%",
  padding: "1rem",
  // marginTop: "3%",
  // maxWidth: "50vw",
  display: "flex",
  flexDirection: "row",
  justifyContent: { xs: "space-around", md: "space-between" },
  gap: "2rem",
};
const leftDiv = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  fontSize: { xs: "1.25rem", md: "1.7rem" },
  lineHeight: { xs: "1.75rem", md: "2.5rem" },
  //fontWeight: "",
  color: "#3D84A8",
};

const rightDiv = {
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "flex-start",
  fontSize: { xs: "1rem", md: "1.3rem" },
  fontWeight: "700",
  lineHeight: { xs: "1.75rem", md: "2.5rem" },
  color: "#48466D",
};

const Details = ({ rent, available, type, deposit }) => {
  return (
    <Box sx={divStyle}>
      <Box sx={leftDiv}>
        <span>RENT</span>
        <span>AVAILABLE</span>
        <span>TYPE</span>
        <span>LAYOUT</span>
        <span>DEPOSIT</span>
      </Box>
      <Box sx={rightDiv}>
        <span>฿{rent} / mo</span>
        <span>{`${new Date(available).getFullYear()}-${new Date(
          available
        ).getMonth()}-${new Date(available).getDate()}`}</span>
        <span>{type}</span>
        <span>{listingDetails.layout}</span>
        <span>{deposit}</span>
      </Box>
    </Box>
  );
};

export default Details;
