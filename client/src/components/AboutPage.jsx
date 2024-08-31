import React from "react";
import { Box, Typography } from "@mui/material";
import { Dog1 } from "../assets";

const aboutListing =
  "I need a roommate since my old roommate moved out. 1500/mo. Room fits king size bed easily and 2 desk with a massive wardrobe. There is also a seperate kitchen. The room has A/C and fan. I am a CS student at KMUTT. Relaxed and friendly environment.";

const aboutNeighbour =
  "Lived here for a year and it’s pretty decent. There is a shop near by which opens until 3am so that’s pretty cool. LineID = henzzzz";

const AboutPage = ({ desc, neighbour }) => {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          padding: { xs: "1rem", sm: "2rem", md: "3rem" },
          alignItems: "flex-start",
          gap: { xs: "2rem", sm: "3rem", md: "4rem" },
        }}
      >
        <Box
          sx={{
            width: "3rem",
            height: "3rem",
            borderRadius: "9999px",
          }}
        >
          <img
            src={Dog1}
            alt="pf pic"
            style={{
              objectFit: "cover",
              borderRadius: "9999px",
              width: "4rem",
              height: "4rem",
            }}
          />
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: { xs: "1rem", sm: "1.5rem", md: "2rem" },
          }}
        >
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#3D84A8",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "2rem", md: "2.25rem" },
              }}
            >
              ABOUT THE LISTING
            </Typography>
            <Box
              sx={{
                padding: 0,
              }}
            >
              <Typography
                sx={{
                  color: "#48466D",
                  fontWeight: 500,
                  maxWidth: { xs: "400px", sm: "500px", md: "600px" },
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                }}
              >
                {" "}
                {desc}
              </Typography>
            </Box>
            <hr />
          </Box>

          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: { xs: "0.5rem", sm: "1rem", md: "1.5rem" },
            }}
          >
            <Typography
              variant="h6"
              sx={{
                color: "#3D84A8",
                fontWeight: 700,
                fontSize: { xs: "1.25rem", sm: "2rem", md: "2.25rem" },
              }}
            >
              ABOUT THE NEIGHBOURHOOD
            </Typography>
            <Box
              sx={{
                padding: 0,
              }}
            >
              <Typography
                sx={{
                  color: "#48466D",
                  fontWeight: 500,
                  maxWidth: { xs: "400px", sm: "500px", md: "600px" },
                  fontSize: { xs: "1rem", sm: "1.2rem", md: "1.3rem" },
                }}
              >
                {" "}
                {neighbour}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Box>
      <hr />
    </>
  );
};

export default AboutPage;
