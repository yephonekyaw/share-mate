import { Box, Typography } from "@mui/material";
import React from "react";
import { Dog1, Dog2, Dog3, Dog4 } from "../../assets/index";
import RentCard from "./RentCard";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";

const dummyRentCards = [
  {
    imageUrl: Dog1,
    owner: "Person1",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog2,
    owner: "Person2",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog3,
    owner: "Person3",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog4,
    owner: "Person4",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog1,
    owner: "Person1",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog2,
    owner: "Person2",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog3,
    owner: "Person3",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog4,
    owner: "Person4",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog1,
    owner: "Person1",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog2,
    owner: "Person2",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog3,
    owner: "Person3",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog4,
    owner: "Person4",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog1,
    owner: "Person1",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog2,
    owner: "Person2",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog3,
    owner: "Person3",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog4,
    owner: "Person4",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog1,
    owner: "Person1",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog2,
    owner: "Person2",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog3,
    owner: "Person3",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
  {
    imageUrl: Dog4,
    owner: "Person4",
    price: "1500",
    roomType: "Shared Room",
    availableDate: "June 1, 2024",
    address: "KMUTT, BangMod, ThungKhru",
  },
];

const RentCards = ({ rooms }) => {
  return (
    <>
      {rooms.map((room, index) => (
        <Link
          style={{ textDecoration: "none" }}
          key={uuidv4()}
          to={`/room/${room.id}`}
        >
          <Box
            key={uuidv4()}
            sx={{
              width: { xs: "350px", sm: "400px" },
              height: { xs: "380px", sm: "440px" },
              boxShadow:
                "rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px",
              display: "flex",
              borderRadius: "1rem",
              flexDirection: "column",
            }}
          >
            <RentCard key={uuidv4()} object={room} index={index} />
          </Box>
        </Link>
      ))}
    </>
  );
};

export default RentCards;
