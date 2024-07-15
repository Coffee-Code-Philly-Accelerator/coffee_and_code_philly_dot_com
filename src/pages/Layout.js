import { Outlet } from "react-router-dom";
import Footer from "components/footers/FiveColumnWithInputForm.js";

const Layout = () => {
  return (
    <>
      <Outlet />
      <Footer />
    </>
  );
};

export default Layout;
