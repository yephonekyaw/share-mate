import React from "react";
import { Box, Typography } from "@mui/material";
import SupportOutlinedIcon from "@mui/icons-material/SupportOutlined";

const dummyData = ["Wifi included", "In-unit laundry", "Furnished"];

const Safety = ({ lst }) => {
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        textAlign: "left",
        gap: { xs: "1rem", sm: "1.5rem", md: "2rem" },
      }}
    >
      <Typography
        variant="h6"
        sx={{
          color: "#3D84A8",
          fontWeight: 700,
          fontSize: { xs: "1rem", sm: "1.5rem", md: "1.75rem" },
        }}
      >
        SAFETY
      </Typography>
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          flexDirection: "row",
          justifyContent: "flex-start",
          alignItems: "center",
          gap: { xs: "1.25rem", sm: "1rem", md: "1.5rem" },
        }}
      >
        {lst.split(", ").map((dummy, index) => (
          <Box
            key={index}
            sx={{
              display: "flex",
              flexDirection: "row",
              boxShadow: "rgba(0, 0, 0, 0.15) 1.95px 1.95px 2.6px",
              alignItems: "center",
              width: { xs: "10rem", sm: "12rem", md: "15rem" },
              height: { xs: "1.75rem", sm: "2.25rem", md: "2.6rem" },
              borderRadius: { xs: "1rem", sm: "1.3rem", md: "1.5rem" },
              justifyContent: "flex-start",
              gap: { xs: "1rem", md: "2rem" },
              px: { xs: "0.5rem", sm: "0.7rem", md: "0.8rem" },
            }}
          >
            <SupportOutlinedIcon style={{ color: "#48466D" }} />
            <Typography
              sx={{
                fontSize: { xs: "1rem", md: "1.3rem" },
                color: "#48466D",
              }}
            >
              {dummy}
            </Typography>
          </Box>
        ))}
      </Box>
    </Box>
  );
};

export default Safety;
