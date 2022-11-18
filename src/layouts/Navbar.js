import { Outlet } from "react-router-dom";

// components
import Nav from "../components/Nav";
import Footer from "../components/Footer";

export default function LogoOnlyLayout() {
  return (
    <>
      <Nav />
      <Outlet />
      <Footer />
    </>
  );
}
