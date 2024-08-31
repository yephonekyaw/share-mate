import React, { useState, useEffect } from "react";
import SearchIcon from "@mui/icons-material/Search";
import Details from "../components/Room/Details";
import { Box, Button } from "@mui/material";
import Reserve from "../components/Room/Reserve";
import NavBar from "../components/Feed/NavBar";
import AboutPage from "../components/AboutPage";
import Amenities from "../components/Amenities";
import { Dog1, Dog2, Dog3, Dog4 } from "../assets";
import Property from "../components/Room/Property";
import Safety from "../components/Room/Safety";
import AuthMiddleware from "../middleware/AuthMiddleware";
import { useNavigate, useParams } from "react-router-dom";
import { axiosInstance } from "../middleware/axiosInstance";
import { Toaster } from "sonner";
import { error_toast, success_toast } from "../utils/activateToast";
import Loading from "../components/Loading";

const items = [Dog1, Dog2, Dog3, Dog4, Dog2];

function RoomDetails() {
  const divStyle = {
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
  };

  const searchBarDivStyle = {
    border: "2px solid gray",
    borderRadius: "20px", // Adjust the border radius as needed
    padding: "5px 10px",
    display: "flex",
    alignItems: "center",
  };

  const imgStyle = {
    width: "auto", // Ensure the width adjusts based on the height
    maxHeight: "90%", // Ensure the image stays within the div
    height: "100%", // Adjust the height of the image as needed
    marginRight: "10px",
    cursor: "pointer",
  };

  const inputStyle = {
    border: "none",
    outline: "none",
    backgroundColor: "transparent",
    marginLeft: "5px", // Add some space between the search icon and the input field
    width: "150px", // Adjust the width of the input field as needed
  };

  const filterButtonStyle = {
    backgroundColor: "transparent",
    border: "none",
    cursor: "pointer",
  };

  const titleStyle = {
    marginTop: "8.5rem",
    marginLeft: "5%",
    textAlign: "left",
    fontSize: "2.5rem", // Adjust font size as needed
  };

  const containerStyle = {
    display: "flex",
    marginLeft: "4%",
    marginTop: "3%",
    maxHeight: "50vh",
    borderRadius: "15px",
    maxWidth: "92vw", // Adjust the height according to your needs
    overflow: "hidden", // Prevent vertical scrolling
  };

  const leftColumnStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
  };

  const rightColumnStyle = {
    flex: 1,
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap", // Allow images to wrap to the next row
  };

  const fullHeightImageStyle = {
    width: "100%",
    height: "100%",
    objectFit: "cover", // Maintain aspect ratio and cover entire container
  };

  const halfHeightImageStyle = {
    width: "100%",
    height: "50%",
    objectFit: "cover", // Maintain aspect ratio and cover entire container
  };

  const bigDiv = {
    maxWidth: "100vw",
    display: "flex",
    flexDirection: { xs: "column", md: "row" },
    justifyContent: { xs: "center", md: "space-around" },
    gap: { xs: 0, md: "1rem" },
  };

  const navigate = useNavigate();
  const [objects, setObjects] = useState([]);
  const { id } = useParams();
  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axiosInstance.get(`/feed/details?id=${id}`);
        if (response.status === 200) {
          setObjects((prev) => response.data.data[0]);
        }
      } catch (error) {
        error_toast(error);
      }
    };
    fetchData();
  }, []);

  const handleDelete = async () => {
    try {
      const response = await axiosInstance.delete(`/post/delete?id=${id}`);
      if (response.status === 200) {
        success_toast("Reserved");
        setTimeout(() => {
          navigate("/");
        }, 5000);
      }
    } catch (error) {
      error_toast(error);
    }
  };

  if (objects.length < 1) return <Loading />;

  return (
    <>
      <Box
        sx={{
          display: "grid",
          placeContent: "center",
          width: "100%",
          height: "100%",
        }}
      >
        <Box sx={divStyle}>
          <NavBar />
        </Box>
        <div style={titleStyle}>{objects.title}</div>
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            flexDirection: "row",
            width: "100%",
            height: "80vh",
            my: "2rem",
          }}
        >
          <Box
            sx={{
              width: "30%",
              height: "100%",
              padding: "1rem",
            }}
          >
            <img
              src={`/${objects?.image_a.slice(17)}`}
              alt="item1"
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "100%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
          <Box
            sx={{
              width: "30%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
              padding: "1rem",
              gap: "0.5rem",
            }}
          >
            <img
              src={`/${objects?.image_b.slice(17)}`}
              alt="item2"
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "50%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <img
              src={`/${objects?.image_c.slice(17)}`}
              alt="item2"
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "50%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
          <Box
            sx={{
              gap: "0.5rem",
              padding: "1rem",
              width: "30%",
              height: "100%",
              display: "flex",
              flexDirection: "column",
            }}
          >
            <img
              src={`/${objects?.image_d.slice(17)}`}
              alt="item2"
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "50%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
            <img
              src={`/${objects?.image_e.slice(17)}`}
              alt="item2"
              style={{
                borderRadius: "10px",
                width: "100%",
                height: "50%",
                objectFit: "cover",
                objectPosition: "center",
              }}
            />
          </Box>
        </Box>

        <Box id="bigDiv" sx={bigDiv}>
          <Box
            sx={{
              boxShadow: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px",
              width: "100%",
              padding: { xs: "1rem", sm: "2rem", md: "4rem" },
              maxWidth: { xs: "100%", md: "75%" },
              mb: { xs: 0, md: "0.5rem" },
            }}
          >
            <Details
              rent={objects.rent}
              available={objects.available_from}
              type={objects.type}
              deposit={objects.deposit}
            />
            <hr />
            <AboutPage
              desc={objects.description}
              neighbour={objects.neighbour}
            />
            <Box
              sx={{
                display: "flex",
                my: "2rem",
                // padding: {xs: "1.25rem", sm: "1rem", md: "1.5"},
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Amenities lst={objects.amenities} />
            </Box>
            <hr />
            <Box
              sx={{
                display: "flex",
                my: "2rem",
                // padding: {xs: "1.25rem", sm: "1rem", md: "1.5"},
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Property lst={objects.on_property} />
            </Box>
            <hr />
            <Box
              sx={{
                display: "flex",
                marginTop: "2rem",
                // padding: {xs: "1.25rem", sm: "1rem", md: "1.5"},
                justifyContent: "flex-start",
                alignItems: "center",
              }}
            >
              <Safety lst={objects.safety} />
            </Box>
          </Box>
          <Button
            sx={{
              display: "flex",
              justifyContent: { xs: "flex-start", md: "center" },
              alignItems: { xs: "center", md: "flex-start" },
            }}
            onClick={handleDelete}
          >
            <Reserve />
          </Button>
        </Box>
        <Toaster richColors />
      </Box>
    </>
  );
}

const AuthRoomDetails = AuthMiddleware(RoomDetails);
export default AuthRoomDetails;
