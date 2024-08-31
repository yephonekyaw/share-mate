import {
  AdvancedMarker,
  CollisionBehavior,
  InfoWindow,
  useAdvancedMarkerRef,
} from "@vis.gl/react-google-maps";
import { homeLogo } from "../assets";

import React, { useCallback, useState } from "react";

const DefaultMarker = ({ latLng }) => {
  const [markerRef, marker] = useAdvancedMarkerRef();
  const [infoWindowShown, setInfoWindowShown] = useState();
  const handleMarkerClick = useCallback(
    () => setInfoWindowShown((isShown) => !isShown),
    []
  );
  const handleClose = useCallback(() => setInfoWindowShown(false), []);
  return (
    <AdvancedMarker
      position={latLng}
      ref={markerRef}
      onClick={handleMarkerClick}
      animation={2}
      collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
    >
      <img src={homeLogo} alt="" width={50} height={50} />
      {infoWindowShown && (
        <InfoWindow anchor={marker} onClose={handleClose}>
          <h2>InfoWindow content!</h2>
          <p>Some arbitrary html to be rendered into the InfoWindow.</p>
        </InfoWindow>
      )}
    </AdvancedMarker>
  );
};

export default DefaultMarker;
