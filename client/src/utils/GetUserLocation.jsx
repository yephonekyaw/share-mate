import React from "react";

const GetUserLocation = ({ latLng, setLatLng }) => {
  if (navigator.geolocation) {
    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;
        setLatLng({ latitude, longitude });
      },
      (error) => {
        console.log("Error getting user location: ", error);
      }
    );
  }
};

export default GetUserLocation;
