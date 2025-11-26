import { Routes, Route, Navigate } from "react-router-dom";
import MainLayout from "../layouts/MainLayout";
import Home from "../views/Home";
import Chat from "../views/Chat";
import About from "../views/About";
import Esse3 from "../views/Esse3-login";

export default function AppRoutes() {
  return (
    <Routes>
      {/* Layout comune */}
      <Route element={<MainLayout />}>
        <Route path="/" element={<Home />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/about" element={<About />} />
        <Route path="/esse3" element={<Esse3 />} />
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/" />} />
    </Routes>
  );
}
