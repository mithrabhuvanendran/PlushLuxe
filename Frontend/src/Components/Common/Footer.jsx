import React from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import {FiPhoneCall} from "react-icons/fi"
import { NavLink } from "react-router-dom";

const Footer = () => {
  return (
    <>
      <footer className="border-t border-gray-200 py-12 px-2 sm:px-10 md:px-12">
        <div className=" grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
          <div>
            <h3 className="text-lg text-gray-800 mb-4 font-medium">
              Newsletter
            </h3>
            <p className="text-gray-500 mb-4">
              Be the first to hear about new products, exclusive events, and
              online offers.
            </p>
            <p className="font-medium text-sm text-gray-600 mb-6">
              Sign up and get 10% off on your first order.
            </p>
            <form className="flex">
              <input
                type="email"
                placeholder="Enter your mail"
                className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
                required
              />
              <button
                type="submit"
                className="bg-black text-white py-3 px-3 md:px-1 lg:px-6 text-sm rounded-r-md hover:bg-gray-800 transition-all"
              >
                Subscribe
              </button>
            </form>
          </div>
          {/* Shop Links */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4 font-medium">Shop</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink
                  to={"#"}
                  className="hover:text-gray-500 transition-colors"
                >
                  Men's Top Wear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"#"}
                  className="hover:text-gray-500 transition-colors"
                >
                  Women's Top Wear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"#"}
                  className="hover:text-gray-500 transition-colors"
                >
                  Men's Bottom Wear
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"#"}
                  className="hover:text-gray-500 transition-colors"
                >
                  Women's Bottom Wear
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4 font-medium">Support</h3>
            <ul className="flex flex-col gap-2">
              <li>
                <NavLink
                  to={"#"}
                  className="hover:text-gray-500 transition-colors"
                >
                  Contact Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"#"}
                  className="hover:text-gray-500 transition-colors"
                >
                  About Us
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"#"}
                  className="hover:text-gray-500 transition-colors"
                >
                  FAQs
                </NavLink>
              </li>
              <li>
                <NavLink
                  to={"#"}
                  className="hover:text-gray-500 transition-colors"
                >
                  Features
                </NavLink>
              </li>
            </ul>
          </div>

          {/* Follow Us */}
          <div>
            <h3 className="text-lg text-gray-800 mb-4 font-medium">
              Follow Us
            </h3>
            <div className="flex items-center gap-4 mb-6">
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500"> 
                <TbBrandMeta className="h-5 w-5"/> {/* Use rel="noopener noreferrer" whenever you use target="_blank" */}
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500"> 
                <IoLogoInstagram className="h-5 w-5"/> {/* Use rel="noopener noreferrer" whenever you use target="_blank" */}
              </a>
              <a href="https://www.facebook.com" target="_blank" rel="noopener noreferrer" className="hover:text-gray-500"> 
                <RiTwitterXLine className="h-5 w-5"/> {/* Use rel="noopener noreferrer" whenever you use target="_blank" */}
              </a>
            </div>
            <p className="text-gray-500">Call Us</p>
            <p>
                <FiPhoneCall className="inline-block mr-2"/>
                0123-456-789
            </p>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="mt-12 px-4 lg:px-0 border-t border-gray-200 pt-6">
            <p className="text-gray-500 text-sm tracking-tighter text-center">&copy; 2025, CompileTab. All Rights Reserved.</p>
        </div>
      </footer>
    </>
  );
};

export default Footer;
