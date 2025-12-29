import React, { useContext } from "react";
import { IoMdClose } from "react-icons/io";
import { GlobalContext } from "../../Context/Context";
import { NavLink } from "react-router-dom";

const NavDrawer = () => {
    const {navDrawerOpen, setNavDrawerOpen} = useContext(GlobalContext)

    const toggleNavDrawer = () => {
        setNavDrawerOpen(!navDrawerOpen)
    }

  return (
    <>
      <div className="fixed top-0 left-0 w-3/4 sm:w-1/2 md:w-1/3 h-dvh bg-white shadow-lg transform transition-transform duration-300 z-50">
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawer} className="hover:cursor-pointer">
            <IoMdClose className="h-6 w-6 text-gray-700 hover:cursor-pointer" />
          </button>
        </div>
        <div className="p-4">
            <h2 className="text-xl font-semibold mb-4">Menu</h2>
            <nav className="space-y-4">
                <NavLink to={"/collections/all?gender=Men"} onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
                    Men
                </NavLink>
                <NavLink to={"/collections/all?gender=Women"} onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
                    Women
                </NavLink>
                <NavLink to={"/collections/all?category=Top Wear"} onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
                    Top Wear
                </NavLink>
                <NavLink to={"/collections/all?category=Bottom Wear"} onClick={toggleNavDrawer} className="block text-gray-600 hover:text-black">
                    Bottom Wear
                </NavLink>
            </nav>
        </div>
      </div>
    </>
  );
};

export default NavDrawer;
