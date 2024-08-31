import React from "react";
import Avatar from "@mui/material/Avatar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Box from "@mui/material/Box";

const info = {
  name: "Henry",
  age: 21,
  count: 1,
  desc: "I'm looking for a new roommate ...",
};

const bigDiv = {
  padding: "5%",
  display: "flex",
  flexDirection: "column",
  alignItems: "flex-start",
  justifyContent: "center",
};

const UserPost = () => {
  return (
    <div style={bigDiv}>
      <Typography
        variant="body1"
        style={{ fontWeight: "bold", color: "#48466D", marginBottom: "0.5rem" }}
      >
        POSTED BY
      </Typography>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          padding: "16px",
          borderRadius: "8px",
          boxShadow: "0.2px 0.5px 2px 2.5px rgba(0, 0, 0, 0.1)",
          marginTop: "8px",
          color: "#48466D",
          maxwidth: "15rem",
        }}
      >
        <Avatar sx={{ bgcolor: "gray", width: 56, height: 56, zIndex: -1 }} />
        <div style={{ marginLeft: "16px", flexGrow: 1 }}>
          <Typography variant="head1">
            {info.name} ∙ {info.age}
          </Typography>
          <Typography variant="body2">{info.count} roommate</Typography>
          <Typography variant="body2">{info.desc}</Typography>
        </div>
      </Box>
      <Button
        style={{
          backgroundColor: "#46CDCF",
          marginTop: "16px",
          borderRadius: "8px",
          width: "8rem",
          fontWeight: "bold",
          color: "white",
          zIndex: -1,
        }}
      >
        Reserve
      </Button>
    </div>
  );
};

export default UserPost;
