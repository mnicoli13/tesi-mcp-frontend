// project imports
import { Outlet } from "react-router-dom";
import Login from "../views/Login";
import Register from "../views/Register";
import GuestGuard from "../utils/guards/guest-guard";

// ==============================|| AUTH ROUTING ||============================== //

const LoginRoutes = {
  path: "/",
  element: (
    <GuestGuard>
      <Outlet />
    </GuestGuard>
  ),
  children: [
    {
      path: "/login",
      element: <Login />,
    },
    {
      path: "/register",
      element: <Register />,
    },
  ],
};

export default LoginRoutes;
