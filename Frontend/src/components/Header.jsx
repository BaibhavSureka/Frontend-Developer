import React from "react";
import logo from "../assets/Swiggy_logo.png";

const Header = () => {
  return (
    <header className="bg-orange-500 text-white fixed w-full top-0 z-40 shadow-lg">
      <div className="max-w-[1200px] mx-auto px-4 sm:px-6">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <img className="h-8" src={logo} alt="Swiggy Logo" />
            </div>
          </div>

          <div className="flex-1 hidden md:flex justify-end">
            <div className="relative w-[300px]">
              <input
                type="text"
                placeholder="Search for restaurants and food"
                className="w-full pl-10 pr-4 py-2 rounded-full bg-white text-black border border-gray-300 focus:ring focus:ring-orange-300 focus:outline-none placeholder-gray-500"
              />
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg
                  className="h-5 w-5 text-gray-500"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;