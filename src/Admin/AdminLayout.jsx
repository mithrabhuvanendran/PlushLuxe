import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

const AdminLayout = () => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  return (
    <>
      <div className="min-h-screen flex flex-col md:flex-row relative">
        {/* Mobile toggle button */}
        <div className="flex md:hidden p-4 bg-gray-900 text-white z-20">
          <button onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
            <FaBars size={24} />
          </button>
          <h1 className="ml-4 text-xl font-medium">Admin Dashboard</h1>
        </div>

        {/* Overlay for mobile sidebar */}
        {isSidebarOpen && (
          <div
            className="fixed inset-0 z-10 bg-black opacity-50 md:hidden"
            onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          ></div>
        )}

        {/* sidebar */}
        <div
          className="hidden md:block md:w-70 bg-black "
        >
          <AdminSidebar />
        </div>

        {isSidebarOpen && (<div className="fixed top-0 left-0 h-dvh w-50 z-50 overflow-y-auto bg-black transition-transform duration-300 md:hidden ">
            <AdminSidebar />
          </div>)}
       
        {/* Main content */}
        <div className="grow p-6 overflow-auto">
          <Outlet/>
        </div>
      </div>
    </>
  );
};

export default AdminLayout;
