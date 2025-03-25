import { Outlet, Navigate } from "react-router-dom";

const PrivateRoute = () => {
  const isAuth = localStorage.getItem("loggedIn");

  return isAuth ? <Outlet /> : <Navigate to="/login" />;
};

export default PrivateRoute;
