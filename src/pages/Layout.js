import { Outlet } from "react-router-dom";
import Footer from "components/footers/MiniCenteredFooter.js";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
