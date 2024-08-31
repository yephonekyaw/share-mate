import React from "react";
import { Container, Box, Typography, Avatar, Button } from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import AuthMiddleware from "../middleware/AuthMiddleware";
import Cookies from "js-cookie";

const ContainerStyled = styled(Container)(({ theme }) => ({
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  marginTop: theme.spacing(8),
}));

const AvatarStyled = styled(Avatar)(({ theme }) => ({
  width: theme.spacing(10),
  height: theme.spacing(10),
  marginBottom: theme.spacing(2),
}));

const InfoBox = styled(Box)(({ theme }) => ({
  width: "100%",
  marginTop: theme.spacing(3),
  padding: theme.spacing(2),
  border: "1px solid #ddd",
  borderRadius: theme.shape.borderRadius,
}));

const ProfileDisplay = () => {
  const navigate = useNavigate();
  const handleEdit = () => {
    navigate("/edit");
  };
  const handleLogOut = () => {
    Cookies.remove("accessToken");
    navigate("/signin");
  };
  const user = {
    username: "YANCHUI",
    email: "test@gmail.com",
  };

  return (
    <ContainerStyled
      component="main"
      maxWidth="xs"
      sx={{
        display: "grid",
        placeContent: "center",
        boxShadow: "rgba(0, 0, 0, 0.15) 0px 5px 15px 0px",
        py: "1rem",
        borderRadius: "2rem",
      }}
    >
      <Box
        sx={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <AvatarStyled />
        <Typography component="h1" variant="h5" sx={{ color: "#3D84A8" }}>
          Profile Information
        </Typography>
      </Box>
      <InfoBox
        sx={{
          display: "flex",
          flexDirection: "column",
          gap: "2rem",
          color: "#48466D",
          borderRadius: "0.5rem",
        }}
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="body1">
            <strong>Username:</strong>
          </Typography>
          <Typography>{user.username}</Typography>
        </Box>
        <Box sx={{ display: "flex", flexDirection: "column", gap: "1rem" }}>
          <Typography variant="body1">
            <strong>Email:</strong>{" "}
          </Typography>
          <Typography>{user.email}</Typography>
        </Box>
      </InfoBox>
      <Button
        onClick={handleEdit}
        type="submit"
        fullWidth
        variant="contained"
        color="primary"
        sx={{ marginTop: 2 }}
      >
        Edit
      </Button>
      <Button
        onClick={handleLogOut}
        type="button"
        fullWidth
        variant="outlined"
        color="secondary"
        sx={{ marginTop: 2 }}
      >
        Log Out
      </Button>
    </ContainerStyled>
  );
};

const AuthProfileDisplay = AuthMiddleware(ProfileDisplay);
export default AuthProfileDisplay;
