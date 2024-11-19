import React, { useState } from 'react';
import passkey from '../Assets/passkey.png';
import menu from '../Assets/passkey.png';
const NavBar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-blue-300 h-16">
      <h1 className="text-2xl md:text-3xl lg:text-4xl font-bold flex items-center">
        <span>Passw</span>
        <img
          src={passkey}
          alt="Key"
          className="inline-block w-5 h-5 mx-0.5 md:w-6 md:h-6 lg:w-7 lg:h-7"
          style={{ marginBottom: '-5px' }}
        />
        <span>rd Man</span>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          x="0px"
          y="0px"
          width="20"
          height="20"
          viewBox="0 0 26 26"
          style={{ marginLeft: '-4px' }}
          className="md:w-6 md:h-6 lg:w-7 lg:h-7"
        >
          <path d="M 16 0 C 13.789063 0 11.878906 0.917969 10.6875 2.40625 C 9.496094 3.894531 9 5.824219 9 7.90625 L 9 9 L 12 9 L 12 7.90625 C 12 6.328125 12.390625 5.085938 13.03125 4.28125 C 13.671875 3.476563 14.542969 3 16 3 C 17.460938 3 18.328125 3.449219 18.96875 4.25 C 19.609375 5.050781 20 6.308594 20 7.90625 L 20 9 L 23 9 L 23 7.90625 C 23 5.8125 22.472656 3.863281 21.28125 2.375 C 20.089844 0.886719 18.207031 0 16 0 Z M 9 10 C 7.34375 10 6 11.34375 6 13 L 6 23 C 6 24.65625 7.34375 26 9 26 L 23 26 C 24.65625 26 26 24.65625 26 23 L 26 13 C 26 11.34375 24.65625 10 23 10 Z M 16 15 C 17.105469 15 18 15.894531 18 17 C 18 17.738281 17.597656 18.371094 17 18.71875 L 17 21 C 17 21.550781 16.550781 22 16 22 C 15.449219 22 15 21.550781 15 21 L 15 18.71875 C 14.402344 18.371094 14 17.738281 14 17 C 14 15.894531 14.894531 15 16 15 Z"></path>
        </svg>
        <span>ger</span>
      </h1>

      {/* Desktop menu */}
      <ul className="hidden md:flex space-x-4">
        <li><a href="#home" className="hover:font-bold text-lg md:text-xl">Home</a></li>
        <li><a href="#features" className="hover:font-bold text-lg md:text-xl">Features</a></li>
        <li><a href="#contact" className="hover:font-bold text-lg md:text-xl">Contact</a></li>
      </ul>

      {/* Mobile menu button */}
      <button
        onClick={toggleMenu}
        className="md:hidden flex items-center absolute top-1 right-0 mt-2 mr-2 px-3 py-2 rounded text-black w-16 "
      >
        <svg className="fill-current h-6 w-6" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M3 6h14M3 12h14M3 18h14" />
        </svg>
        <img
          src={menu}
          alt="Menu icon"
          className="h-6 w-6"
        />
      </button>

      {/* Mobile menu */}
      {isOpen && (
        <ul className="absolute top-16 left-0 w-full bg-blue-100 flex flex-col items-center space-y-4 py-4 md:hidden">
          <li><a href="#home" className="hover:font-bold text-lg">Home</a></li>
          <li><a href="#features" className="hover:font-bold text-lg">Features</a></li>
          <li><a href="#contact" className="hover:font-bold text-lg">Contact</a></li>
        </ul>
      )}
    </nav>
  );
};

export default NavBar;
