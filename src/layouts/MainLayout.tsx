import { Outlet } from "react-router-dom";
import Header from "../components/common/Header";
// import Footer from "../components/common/Footer";
import { Container, Box, Toolbar } from "@mui/material";

export default function MainLayout() {
  return (
    <Box sx={{ display: "flex", flexDirection: "column", minHeight: "100vh" }}>
      <Header />
      {/* Toolbar spacer per compensare l'header fixed */}
      <Toolbar sx={{ minHeight: "48px !important" }} />
      <Container component="main" sx={{ flexGrow: 1 }}>
        <Outlet /> {/* Qui verranno renderizzate le view */}
      </Container>
      {/* <Footer /> */}
    </Box>
  );
}
