import { Outlet, Navigate } from "react-router-dom";

const PublicRoute = () => {
  const isAuth = localStorage.getItem("loggedIn");

  return !isAuth ? <Outlet /> : <Navigate to="/todo-list" />;
};

export default PublicRoute;
