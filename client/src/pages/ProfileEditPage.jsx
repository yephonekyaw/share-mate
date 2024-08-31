import React, { useState } from "react";
import {
  Container,
  Box,
  Typography,
  Avatar,
  Button,
  TextField,
} from "@mui/material";
import { styled } from "@mui/system";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import { axiosInstance } from "../middleware/axiosInstance";
import { Toaster } from "sonner";
import { error_toast, success_toast } from "../utils/activateToast";

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

const ProfileEdit = () => {
  const [user, setUser] = useState({
    username: "YANCHUI",
    email: "test@gmail.com",
  });

  const [username, setUsername] = useState(user.username);
  const [email, setEmail] = useState(user.email);
  const navigate = useNavigate();
  // const handleNameChange = (e) => {
  //     setUsername(e.target.value);
  // }
  // const handleEmailChange = (e) => {
  //     setEmail(e.target.value);
  // }
  const handleEditFinished = () => {
    navigate("/profile");
  };
  const handleLogOut = () => {
    Cookies.remove("accessToken");
    navigate("/signin");
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle form submission, e.g., send updated data to server
    try {
      const response = await axiosInstance.post("/auth/edit", {
        username: username,
        email: email,
      });

      if (response.status === 200) {
        success_toast("Edit success");
        navigate("/");
      }
    } catch (error) {
      console.log(error);
    }
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
      <AvatarStyled />
      <Typography component="h1" variant="h5">
        Edit Profile
      </Typography>
      <form onSubmit={handleSubmit} noValidate>
        <InfoBox>
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="username"
            label="Username"
            name="username"
            value={user.username}
            onChange={handleChange}
          />
          <TextField
            variant="outlined"
            margin="normal"
            required
            fullWidth
            id="email"
            label="Email Address"
            name="email"
            value={user.email}
            onChange={handleChange}
          />
        </InfoBox>
        <Button
          onClick={handleEditFinished}
          type="submit"
          fullWidth
          variant="contained"
          color="primary"
          sx={{ marginTop: 2 }}
        >
          Save Changes
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
      </form>
      <Toaster richColors />
    </ContainerStyled>
  );
};

export default ProfileEdit;
