import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { SlOptionsVertical } from "react-icons/sl";
import { useEmail } from "../Context/EmailContext";
import UserMenu from "./UserMenu";

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { email } = useEmail();
  const location = useLocation();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 h-16 fixed w-full top-0 left-0 bg-blue-300 bg-opacity-50 backdrop-blur-sm transition-all ease-in-out shadow-md hover:shadow-lg z-50">

      <h1 className="text-3xl md:text-4xl lg:text-5xl flex items-center ml-2">
        <span className="text-black font-dynapuff font-bold tracking-wide">
          Pass
        </span>
        <span className="ml-1 text-blue-700 font-dynapuff font-bold tracking-widest">
          EZ
        </span>
      </h1>

      {/* Navigation Links (For Large Screens) */}
      {!email && (
        <ul className="hidden md:flex space-x-6 text-blue-700 ml-auto">
          <li>
            <Link to="/#home" className="hover:text-blue-700 transition-colors text-lg md:text-xl">
              Home
            </Link>
          </li>
          <li>
            <Link to="/#features" className="hover:text-blue-700 transition-colors text-lg md:text-xl">
              Features
            </Link>
          </li>
          <li className="mr-16">
            <Link to="/#contact" className="hover:text-blue-700 transition-colors text-lg md:text-xl">
              Contact
            </Link>
          </li>
        </ul>
      )}

      {/* User Actions (Signup / Signin or UserMenu) */}
      <div className="hidden md:flex items-center space-x-4 ml-8">
        {email ? (
          <UserMenu />
        ) : (
          location.pathname === "/" && (
            <>
              <Link to="/signup" className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-800 transition">
                Sign Up
              </Link>
              <Link
                to="/loginForm"
                className="border-2 border-blue-600 text-blue-600 px-6 py-2 rounded-full hover:bg-blue-600 hover:text-white transition"
              >
                Sign In
              </Link>
            </>
          )
        )}
      </div>

      {/* Mobile Menu Button */}
      {!email && (
        <div className="md:hidden flex items-center absolute top-1 right-0 mt-2 mr-2">
          <button onClick={toggleMenu} className="flex items-center px-3 py-2 rounded text-white hover:text-blue-900">
            <SlOptionsVertical className="text-black w-6 h-6" />
          </button>
        </div>
      )}


      {/* Mobile Navigation Menu */}
      {isOpen && !email && (
        <ul className="absolute top-16 left-0 w-full bg-blue-100 flex flex-col items-center space-y-4 py-4 md:hidden rounded-lg shadow-lg">
          <li>
            <Link to="/#home" className="text-lg text-blue-900 hover:text-white">
              Home
            </Link>
          </li>
          <li>
            <Link to="/#features" className="text-lg text-blue-900 hover:text-white">
              Features
            </Link>
          </li>
          <li>
            <Link to="/#contact" className="text-lg text-blue-900 hover:text-white">
              Contact
            </Link>
          </li>
        </ul>
      )}

      {/* Mobile User Menu */}
      {email && (
        <div className="md:hidden absolute top-2 right-4">
          <UserMenu />
        </div>
      )}
    </nav>
  );
};

export default NavBar;
