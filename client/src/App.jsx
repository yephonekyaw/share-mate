import { Routes, Route } from "react-router-dom";
import SignInPage from "./pages/SignInPage";
import SignUpPage from "./pages/SignUpPage";
import NewFeed from "./pages/NewFeed.jsx";
import GoogleMapPage from "./pages/GoogleMapPage.jsx";
import RoomDetails from "./pages/RoomDetails.jsx";
import RentForm from "./pages/RentFormPage.jsx";
import ProfileDisplay from "./pages/ProfilePage.jsx";
import ProfileEdit from "./pages/ProfileEditPage.jsx";

const App = () => {
  return (
    <Routes>
      <Route path="/" element={<NewFeed />} />
      <Route path="/signin" element={<SignInPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/map" element={<GoogleMapPage />} />
      <Route path="/room/:id" element={<RoomDetails />} />
      <Route path="/create" element={<RentForm />} />
      <Route path="/profile/" element={<ProfileDisplay />} />
      <Route path="/edit" element={<ProfileEdit />} />
    </Routes>
  );
};

export default App;
