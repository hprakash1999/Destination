import { Outlet } from "react-router-dom";
import { Footer, Header } from "../Components.js";

function Layout() {
  return (
    <>
      <Header />
      <Outlet />
      <Footer />
    </>
  );
}

export default Layout;
