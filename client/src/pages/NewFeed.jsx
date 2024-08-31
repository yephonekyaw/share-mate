import { Box, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import RentCards from "../components/Feed/RentCards";
import NavBar from "../components/Feed/NavBar";
import AuthMiddleware from "../middleware/AuthMiddleware";
import { Toaster } from "sonner";
import { error_toast } from "../utils/activateToast";
import { axiosInstance } from "../middleware/axiosInstance";

const NewFeed = () => {
  const [value, setValue] = React.useState("recents");
  const [objects, setObjects] = useState([]);
  useEffect(() => {
    const getObjects = async () => {
      try {
        const response = await axiosInstance.get("/feed");
        if (response.status === 200) {
          setObjects((prev) => [...response.data.data]);
        }
      } catch (error) {
        // error_toast(error);
      }
    };
    getObjects();
  }, []);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <>
      <Box
        sx={{
          height: "100%",
          width: "100%",
          display: "grid",
          placeContent: "center",
        }}
      >
        <Box
          sx={{
            py: "1rem",
            px: { xs: "2rem", sm: "6rem", md: "8rem", lg: "12rem" },
          }}
        >
          {/* navbar */}
          <Box
            sx={{
              width: "100%",
              backgroundColor: "white",
              height: { xs: "5rem", md: "7rem" },
              padding: { xs: "0.5rem", sm: "0.6rem", md: "2rem" },
              borderBottom: "1px solid grey",
              position: "fixed",
              display: "grid",
              alignContent: "center",
              top: 0,
              left: 0,
            }}
          >
            <NavBar />
          </Box>
        </Box>
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: "1rem",
            marginTop: { xs: "4rem", sm: "5rem", md: "6rem" },
            justifyContent: "center",
            alignItems: "center",
            px: { xs: "4rem", sm: "6rem" },
          }}
        >
          <Box
            sx={{
              fontSize: { xs: "1.8rem", sm: "2.25rem" },
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              placeItems: "center",
              maxWidth: { xs: "400px", sm: "550px", md: "650px" },
            }}
          >
            <h1
              style={{
                color: "#48466D",
                fontWeight: 700,
              }}
            >
              The best way to find{" "}
              <span style={{ color: "#46CDCF", fontWeight: 700 }}>
                new Roommate
              </span>
            </h1>
          </Box>
          <Box
            sx={{
              fontSize: { xs: "1.25rem", sm: "1.5rem" },
              display: "flex",
              flexDirection: "column",
              justifyContent: "flex-start",
              gap: { xs: "1.5rem", sm: "2.5rem" },
              alignItems: "center",
              placeItems: "center",
              maxWidth: { xs: "450px", sm: "650px" },
            }}
          >
            <p
              style={{
                // marginTop: "1rem",
                // maxWidth: "450px",
                color: "#48466D",
              }}
            >
              ShareMate connects you to millions of other renters that are
              looking for roommates and posting rooms you can't find anywhere
              else. Stop stressing and let us help you find the right fit.
            </p>
            {/* getStarted Button */}
            <Box
              className="buttons"
              sx={{
                width: { xs: "10rem", sm: "12rem" },
                fontSize: { xs: "1.25rem", sm: "1.5rem" },
                height: { xs: "3rem", sm: "4rem" },
                backgroundColor: "#48466D",
                fontWeight: 700,
                borderRadius: { xs: "1.5rem", sm: "2.25rem" },
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                alignSelf: "flex-start",
              }}
            >
              <Link
                style={{ outline: "none", textDecoration: "none" }}
                to="/signin"
              >
                <p style={{ color: "white", fontWeight: "bold" }}>
                  Get Started
                </p>
              </Link>
            </Box>
          </Box>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            gap: "2rem",
            marginTop: "4rem",
            justifyContent: "center",
            alignItems: "center",
            px: { xs: "0.5rem", md: "1.5rem", lg: "3rem" },
            marginBottom: "2rem",
          }}
        >
          <RentCards rooms={objects} />
        </Box>
        <Typography
          variant="h6"
          sx={{
            textAlign: "center",
            mb: "2rem",
            color: "#48466D",
            fontWeight: "bold",
          }}
        >
          You have reached the end of the list.
        </Typography>
      </Box>
      <Toaster richColors />
    </>
  );
};

const AuthNewFeed = AuthMiddleware(NewFeed);
export default AuthNewFeed;
