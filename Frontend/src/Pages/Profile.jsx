import React, { useEffect } from "react";
import MyOrdersPage from "./MyOrdersPage";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { clearCart } from "../redux/slice/cartSlice";
import { logout } from "../redux/slice/authSlice";

const Profile = () => {
  const { user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!user) {
      navigate("/login");
    }
  }, [user, navigate]);

  const handleLogout = () => {
    dispatch(logout())
    // dispatch(clearCart())
    navigate("/login")
  }

  return (
    <>
      <section className="h-auto md:h-dvh py-12 px-4 sm:px-12">
        <div className="flex flex-col gap-6 md:flex-row md:space-x-6">
          {/* Left section */}
          <div className="w-full flex flex-col items-center justify-center md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6">
            <h1 className="text-2xl md:text-3xl font-bold mb-4">{user?.name}</h1>
            <p className="text-lg text-gray-600 mb-4">{user?.email}</p>
            <button onClick={handleLogout} className="w-full bg-red-500 text-white py-2 px-4 rounded hover:bg-red-600 hover:cursor-pointer">
              Logout
            </button>
          </div>
          {/* Right section - Orders table */}
          <div className="w-full md:w-2/3 lg:w-3/4">
            <MyOrdersPage />
          </div>
        </div>
      </section>
    </>
  );
};

export default Profile;
