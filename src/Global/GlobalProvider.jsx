import React, { useState } from "react";
import { GlobalContext } from "../Context/Context";

const GlobalProvider = ({ children }) => {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [navDrawerOpen, setNavDrawerOpen] = useState(false)
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <GlobalContext.Provider value={{drawerOpen, setDrawerOpen, navDrawerOpen, setNavDrawerOpen, isSidebarOpen, setIsSidebarOpen}}>{children}</GlobalContext.Provider>
    </>
  );
};

export default GlobalProvider;
