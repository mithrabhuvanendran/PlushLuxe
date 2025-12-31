import React, { useContext, useState } from "react";
import { NavLink } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi2";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import { GlobalContext } from "../../Context/Context";
import { IoMdClose } from "react-icons/io";
import NavDrawer from "../Layout/NavDrawer";
import { useSelector } from "react-redux";

const Navbar = () => {
  const { drawerOpen, setDrawerOpen } = useContext(GlobalContext);
  const { navDrawerOpen, setNavDrawerOpen } = useContext(GlobalContext);
  const { cart } = useSelector((state) => state.cart);
  const {user} = useSelector((state) => state.auth)

  const cartItemCount =
    cart?.products?.reduce((total, product) => total + product.quantity, 0) ||
    0;

  return (
    <>
      <nav className="flex items-center justify-between px-2 sm:px-16 py-3">
        {/* Left- Logo */}
        <div>
          <NavLink to={"/"} className="text-2xl font-medium text-[#d73b5a] hover:text-[#dd7d91]" style={{fontVariant: "small-caps"}}>
            PlushLuxe
          </NavLink>
        </div>
        {/* Center - Navigation */}
        <div className="hidden md:flex items-center gap-5">
          <NavLink
            to={"collections/all?gender=Men"}
            className="hover:text-[#d73b5a] text-black text-sm font-medium uppercase"
          >
            Men
          </NavLink>
          <NavLink
            to={"collections/all?gender=Women"}
            className="hover:text-[#d73b5a] text-black text-sm font-medium uppercase"
          >
            Women
          </NavLink>
          <NavLink
            to={"collections/all?category=Top Wear"}
            className="hover:text-[#d73b5a] text-black text-sm font-medium uppercase"
          >
            Top Wear
          </NavLink>
          <NavLink
            to={"collections/all?category=Bottom Wear"}
            className="hover:text-[#d73b5a] text-black text-sm font-medium uppercase"
          >
            Bottom Wear
          </NavLink>
        </div>
        {/* Right - Icons */}
        <div className="flex items-center gap-2 sm:gap-3">
          {user && user.role === "admin" && (
            <NavLink
              to={"/admin"}
              className="block bg-black text-white px-1 sm:px-2 rounded text-sm"
            >
              Admin
            </NavLink>
          )}

          <NavLink to={"/profile"} className="h-4 w-6 text-xl text-gray-700 hover:text-[#d73b5a]">
            <HiOutlineUser />
          </NavLink>
          <button
            onClick={() => setDrawerOpen(!drawerOpen)}
            className="relative hover:text-black hover:cursor-pointer"
          >
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700" />
            {cartItemCount > 0 && (
              <span className="absolute -top-1 bg-[#ea2e0e] text-white text-center text-xs rounded-full w-5 h-5">
                {cartItemCount}
              </span>
            )}
          </button>
          {/* Search */}
          <SearchBar />
          <button
            onClick={() => setNavDrawerOpen(!navDrawerOpen)}
            className="md:hidden hover:cursor-pointer"
          >
            <HiBars3BottomRight className="h-6 w-6 text-gray-700 " />
          </button>
        </div>
      </nav>

      {/* Mobile Navigation */}
      {navDrawerOpen && <NavDrawer />}
    </>
  );
};

export default Navbar;
