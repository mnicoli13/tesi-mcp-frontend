import MainLayout from "../layouts/MainLayout";
import Home from "../views/Home";
import Chat from "../views/Chat";
import About from "../views/About";
import Interview from "../views/Interview";
import UserProfile from "../views/UserProfile";
import AuthGuard from "../utils/guards/auth-guard";
// ==============================|| MAIN ROUTING ||============================== //

const MainRoutes = {
  path: "/",
  element: (
    <AuthGuard>
      <MainLayout />
    </AuthGuard>
  ),
  children: [
    { path: "chat", element: <Chat /> },
    { path: "about", element: <About /> },
    { path: "interview", element: <Interview /> },
    { path: "profile", element: <UserProfile /> },
    { path: "home", element: <Home /> },
  ],
};

export default MainRoutes;
