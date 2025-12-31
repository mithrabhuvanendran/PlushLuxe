import React, { useContext } from "react";
import Topbar from "../Layout/Topbar";
import Navbar from "./Navbar";
import CartDrawer from "../Layout/CartDrawer";
import { GlobalContext } from "../../Context/Context";

const Header = () => {
  const { drawerOpen } = useContext(GlobalContext);
  return (
    <>
      <header className="border-b border-gray-200">
        {/* Top Bar */}
        <Topbar />
        {/* Nav Bar */}
        <Navbar />
        {/* Cart Drawer */}
        {drawerOpen && <CartDrawer />}
      </header>
    </>
  );
};

export default Header;
