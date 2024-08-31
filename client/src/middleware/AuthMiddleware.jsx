import { Navigate } from "react-router-dom";
import Cookies from "js-cookie";

const AuthMiddleware = (Component) => {
  return () => {
    const isLoggedIn = Cookies.get("accessToken") !== undefined;
    return isLoggedIn ? <Component /> : <Navigate to="/signin" replace />;
  };
};

export default AuthMiddleware;
