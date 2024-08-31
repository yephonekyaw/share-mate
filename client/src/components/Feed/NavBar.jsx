import AddOutlinedIcon from "@mui/icons-material/AddOutlined";
import PermIdentityIcon from "@mui/icons-material/PermIdentity";
import SearchIcon from "@mui/icons-material/Search";
import TuneIcon from "@mui/icons-material/Tune";
import { Box, Typography } from "@mui/material";
import React, { useState, useEffect, useRef } from "react";
import { Link, useNavigate } from "react-router-dom";
import "../../../src/index.css";
import { logo2 } from "../../assets";
import Filter from "./Filter";

const ProfilePhoto = () => (
  <Box
    sx={{
      position: "absolute",
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      flexDirection: "column",
    }}
  >
    <Link style={{ textDecoration: "none" }} to="/profile">
      <Box
        sx={{
          borderRadius: "9999px",
          height: { xs: "2rem", md: "2.5rem" },
          width: { xs: "2rem", md: "2.5rem" },
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          textAlign: "center",
          backgroundColor: "#48466D",
        }}
      >
        <PermIdentityIcon
          sx={{
            color: "#ABEDD8",
            fontSize: { xs: "1.5rem", sm: "1.75rem", md: "2.25rem" },
          }}
        />
      </Box>
      <Typography
        sx={{
          fontSize: { xs: "0.5rem", sm: "0.6rem", md: "0.8rem" },
          textAlign: "center",
          fontWeight: "bold",
          color: "#48466D",
        }}
      >
        PROFILE
      </Typography>
    </Link>
  </Box>
);

const SignInButton = () => (
  <Box
    sx={{
      position: "absolute",
      flexDirection: "column",
      border: "2px solid #48466D",
      borderRadius: { xs: "1.5rem", sm: "2rem", md: "3rem" },
      display: "flex",
      zIndex: 10,
      justifyContent: "center",
      alignItems: "center",
      padding: "0.6rem",
    }}
  >
    <Typography
      variant="h2"
      sx={{
        fontSize: { xs: "1rem", sm: "1.25rem" },
        color: "#3D84A8",
      }}
    >
      Share<span style={{ color: "#46CDCF" }}>Mate</span>
    </Typography>
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        justifyContent: "center",
        gap: { xs: "0.2rem", sm: "0.5rem" },
      }}
    >
      <Link
        to="/signup"
        style={{
          textDecoration: "none",
          outline: "none",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#48466D",
            fontSize: { xs: "0.5rem", md: "0.7rem" },
          }}
        >
          Sign Up
        </Typography>
      </Link>
      <Link
        to="/signin"
        style={{
          textDecoration: "none",
          outline: "none",
        }}
      >
        <Typography
          sx={{
            fontWeight: "bold",
            color: "#48466D",
            fontSize: { xs: "0.5rem", md: "0.7rem" },
          }}
        >
          Sign In
        </Typography>
      </Link>
    </Box>
  </Box>
);

const SearchBar = () => {
  const [menu, toggleMenu] = useState(false);
  const handleMenu = () => {
    toggleMenu(!menu);
  };

  const filterRef = useRef(null);

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (filterRef.current && !filterRef.current.contains(event.target)) {
        toggleMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [filterRef]);

  return (
    <Box
      sx={{
        display: "flex",
        minWidth: "200px",
        justifyContent: "space-between",
        width: { xs: "200px", sm: "320px", md: "420px", lg: "520px" },
        height: "3rem",
        px: "1rem",
        py: "0",
        borderRadius: "1.5rem",
        boxShadow:
          "rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px",
      }}
    >
      <Box
        sx={{
          display: "flex",
          gap: "0.5rem",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        <SearchIcon style={{ color: "#48466D" }} />
        <Box
          sx={{
            width: { xs: "100px", sm: "180px", md: "250px", lg: "350px" },
          }}
        >
          <input
            id="search"
            placeholder="Where are you looking?"
            style={{
              borderRadius: "1rem",
              borderColor: "#48466D",
              width: "100%",
              height: "2rem",
              color: "#48466D",
              fontSize: "1rem",
              padding: "1rem",
            }}
          />
        </Box>
      </Box>
      <Box
        sx={{
          display: "flex",
          placeContent: "center",
          alignItems: "center",
          position: "relative",
          justifyContent: "flex-end",
        }}
      >
        <TuneIcon
          onClick={handleMenu}
          style={{ color: "#48466D", cursor: "pointer" }}
        />
        <Box ref={filterRef}>{menu ? <Filter /> : <></>}</Box>
      </Box>
    </Box>
  );
};

const NavBar = () => {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const navigate = useNavigate();
  const goHome = () => {
    navigate("/");
  };
  return (
    <Box
      sx={{
        display: "flex",
        zIndex: 999,
        flexDirection: "row",
        justifyContent: { xs: "space-evenly", md: "space-between" },
        alignItems: "center",
      }}
    >
      <Box
        sx={{
          height: { xs: "1.5rem", sm: "2rem", md: "3rem" },
          width: "20%",
          display: { xs: "none", sm: "flex" },
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <img
          src={logo2}
          onClick={goHome}
          alt="logo"
          style={{
            height: "90%",
            width: "auto",
            cursor: "pointer",
          }}
        />
      </Box>
      <Link to="/map">
        <SearchBar />
      </Link>
      <Box
        sx={{
          display: "flex",
          flexDirection: "row",
          alignItems: "center",
          gap: { xs: 0, sm: "0.8rem", md: "2.5rem", lg: "3rem" },
        }}
      >
        <Link
          to="/create"
          style={{
            textDecoration: "none",
            outline: "none",
          }}
        >
          <Box
            sx={{
              height: { xs: "2rem", md: "2.5rem" },
              width: { xs: "3rem", md: "4rem" },
              padding: "0.5rem",
              // border: "1px solid #48466D",
              borderRadius: "9999px",
              backgroundColor: "#48466D",
              display: "flex",
              flexDirection: "column",
              justifyContent: "center",
              alignItems: "center",
            }}
          >
            <AddOutlinedIcon
              style={{
                color: "white",
                fontWeight: "bold",
                fontSize: "0.8rem",
                marginBottom: "0.2rem",
              }}
            />
            <Typography
              variant="h2"
              sx={{
                fontSize: { xs: "0.4rem", md: "0.6rem" },
                textAlign: "center",
                fontWeight: "bold",
                color: "white",
              }}
            >
              ADD
            </Typography>
          </Box>
        </Link>

        <Box
          sx={{
            width: "100%",
            height: "100%",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <Box
            sx={{
              position: "relative",
              height: { xs: "2rem", md: "3rem" },
              width: { xs: "6rem", md: "6rem" },
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            {isLoggedIn ? (
              <ProfilePhoto sx={{ display: isLoggedIn ? "flex" : "none" }} />
            ) : (
              <SignInButton sx={{ display: isLoggedIn ? "none" : "flex" }} />
            )}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NavBar;
