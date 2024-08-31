import React from "react";
import { Box } from "@mui/material";
import { v4 as uuidv4 } from "uuid";

const RentCard = ({ object, index }) => {
  return (
    <>
      <img
        style={{
          width: "100%",
          height: "60%",
          objectFit: "cover",
          objectPosition: "center",
        }}
        src={`/${object.image_a.slice(17)}`}
        key={uuidv4()}
      />
      <Box
        sx={{
          padding: "1rem",
        }}
        key={uuidv4()}
      >
        <p style={{ color: "#3D84A8", fontWeight: 1000, lineHeight: "2rem" }}>
          {" "}
          <span style={{ fontWeight: 700, fontSize: "2rem" }}>
            ฿ {object.rent}
          </span>{" "}
          /month{" "}
        </p>
        <p
          style={{
            color: "#48466D",
            fontWeight: 600,
            marginTop: "0.5rem",
            lineHeight: "1rem",
          }}
        >
          {" "}
          {object.owner_id}{" "}
        </p>
        <Box
          sx={{
            display: "flex",
            flexDirection: "row",
            justifyContent: "space-between",
          }}
          key={uuidv4()}
        >
          <p
            style={{
              color: "#48466D",
              fontWeight: 600,
              marginTop: "0.5rem",
              lineHeight: "1rem",
            }}
          >
            {" "}
            {object.type}{" "}
          </p>
          <p
            style={{
              color: "#48466D",
              fontWeight: 600,
              marginTop: "0.5rem",
              lineHeight: "1rem",
            }}
          >
            {" "}
            {`${new Date(object.available_from).getFullYear()}-${new Date(
              object.available_from
            ).getMonth()}-${new Date(object.available_from).getDate()}`}{" "}
          </p>
        </Box>
        <Box
          sx={{
            background: "#D9D9D9",
            borderRadius: "1.5rem",
            marginTop: "0.5rem",
            width: "max-content",
            padding: "0.5rem",
          }}
          key={uuidv4()}
        >
          <p style={{ color: "#48466D", fontWeight: 600, lineHeight: "1rem" }}>
            {/* {object.address} */}
            Bang Mod, Thungkhru
          </p>
        </Box>
      </Box>
    </>
  );
};

export default RentCard;
