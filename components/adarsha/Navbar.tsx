"use client";

import Link from "next/link";
import Image from "next/image";


const Navbar = () => {
  return (
    <div className="navbar bg-gradient-to-r from-purple-600 via-blue-500 to-purple-600 bg-opacity-80 backdrop-blur-md p-4 fixed top-2 left-0 right-0 z-50 shadow-lg rounded-lg">
      <div className="container mx-auto flex justify-between items-center">
        {/* Left section (Logo and nav links) */}
        <div className="left-section flex items-center space-x-8">
          <div className="logo">
            <Link href="/">
              <Image
                src="/GG.svg"
                alt="Logo"
                width={40}
                height={40}
                className="h-10 cursor-pointer transition-transform transform hover:scale-110"
              />
            </Link>
          </div>
          <div className="nav-links flex space-x-6">
            <a
              href="#home"
              className="text-white hover:text-gray-300 transition-colors transform hover:scale-105"
            >
              Home
            </a>
            <a
              href="#about"
              className="text-white hover:text-gray-300 transition-colors transform hover:scale-105"
            >
              About Us
            </a>
            <a
              href="#contact"
              className="text-white hover:text-gray-300 transition-colors transform hover:scale-105"
            >
              Contact Us
            </a>
          </div>
        </div>

        {/* Search bar */}
        <div className="search-bar flex items-center bg-white rounded-full p-2 shadow-lg hover:shadow-2xl transition-shadow w-96">
          <span role="img" aria-label="search" className="text-gray-600 mr-2">
            🔍
          </span>
          <input
            type="text"
            placeholder="GG Search ..."
            className="bg-transparent border-none outline-none w-full text-gray-800 placeholder-gray-500"
          />
        </div>

        {/* Right section (Login and Signup buttons) */}
        <div className="right-section flex items-center space-x-4">
          <Link href="./login/adarsha">
            <button className="px-4 py-2 text-white bg-purple-600 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-purple-700 transition-colors transform hover:scale-105">
              Login
            </button>
          </Link>
          <Link href="./login/adarshaSignup">
            <button className="px-4 py-2 text-white bg-purple-600 border border-gray-300 rounded-lg hover:border-blue-400 hover:bg-purple-700 transition-colors transform hover:scale-105">
              Signup
            </button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
