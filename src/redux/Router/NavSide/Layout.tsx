import React, { useState } from "react";
import NavSide from "./NavSide";
import { RiCloseLine, RiMenuLine } from "react-icons/ri";

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isNavOpen, setIsNavOpen] = useState(false);

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  return (
    <div className="flex h-screen w-full">
      {isNavOpen && <NavSide />}
      <div
        className={`
        flex flex-col flex-1 
        transition-all duration-300 ease-in-out
        ${isNavOpen ? " ml-64" : "ml-0"}
        `}
      >
<button
  className={`fixed top-5 left-5 bg-green-400 text-white py-2 px-4 rounded-full focus:outline-none z-50 transition-colors duration-300 ease-in-out ${
    isNavOpen ? "hover:bg-blue-600" : "hover:bg-blue-400"
  }`}
  onClick={toggleNav}
  aria-label={isNavOpen ? "Close navigation menu" : "Open navigation menu"}
>
  {isNavOpen ? (
    <RiCloseLine className="text-2xl" />
  ) : (
    <RiMenuLine className="text-2xl" />
  )}
</button>

        <div
          className={`transition-opacity duration-300
          
                  
                  ease-in-out ${isNavOpen ? "opacity-100" : ""}`}
        >
          {children}
        </div>
      </div>
    </div>
  );
};

export default Layout;
