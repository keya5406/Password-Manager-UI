import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { SlOptionsVertical } from 'react-icons/sl';
import { useEmail } from '../Context/EmailContext';
import UserMenu from './UserMenu';

const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { email } = useEmail();

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 h-16 fixed w-full top-0 left-0 bg-blue-300 bg-opacity-50 backdrop-blur-sm transition-all ease-in-out shadow-md hover:shadow-lg">
      <h1 className="text-3xl md:text-4xl lg:text-5xl flex items-center ml-2">
        <span className="text-black font-dynapuff font-bold tracking-wide">
          Pass
        </span>
        <span className="ml-1 text-blue-700 font-dynapuff font-bold tracking-widest">
          EZ
        </span>
      </h1>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-6 text-blue-700">
        {!email && (
          <>
            <li>
              <Link
                to="/#home"
                className="hover:text-blue-700 transition-colors text-lg md:text-xl"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/#features"
                className="hover:text-blue-700 transition-colors text-lg md:text-xl"
              >
                Features
              </Link>
            </li>
            <li>
              <Link
                to="/#contact"
                className="hover:text-blue-700 transition-colors text-lg md:text-xl"
              >
                Contact
              </Link>
            </li>
          </>
        )}
        <UserMenu />
      </ul>

      {/* Mobile menu button */}
      <div className="md:hidden flex items-center absolute top-1 right-0 mt-2 mr-2">
        <button
          onClick={toggleMenu}
          className="flex items-center px-3 py-2 rounded text-white hover:text-blue-900"
        >
          <svg
            className="fill-current h-6 w-6"
            viewBox="0 0 20 20"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path d="M3 6h14M3 12h14M3 18h14" />
          </svg>
          <SlOptionsVertical className="text-black w-6 h-6" />
        </button>
        <UserMenu />
      </div>

      {/* Mobile menu */}
      {isOpen && !email && (
        <ul className="absolute top-16 left-0 w-full bg-blue-100 flex flex-col items-center space-y-4 py-4 md:hidden rounded-lg shadow-lg">
          <li>
            <Link
              to="/#home"
              className="text-lg text-blue-900 hover:text-white"
            >
              Home
            </Link>
          </li>
          <li>
            <Link
              to="/#features"
              className="text-lg text-blue-900 hover:text-white"
            >
              Features
            </Link>
          </li>
          <li>
            <Link
              to="/#contact"
              className="text-lg text-blue-900 hover:text-white"
            >
              Contact
            </Link>
          </li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
