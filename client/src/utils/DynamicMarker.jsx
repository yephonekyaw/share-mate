import { AdvancedMarker, CollisionBehavior } from "@vis.gl/react-google-maps";
import { homeLogo } from "../assets";
import { Box } from "@mui/material";

const DynamicMarker = ({ latLng }) => {
  if (latLng === null) {
    return <Box></Box>;
  }
  return (
    <AdvancedMarker
      position={latLng}
      animation={2}
      collisionBehavior={CollisionBehavior.REQUIRED_AND_HIDES_OPTIONAL}
    >
      <img src={homeLogo} alt="" width={50} height={50} />
    </AdvancedMarker>
  );
};

export default DynamicMarker;
