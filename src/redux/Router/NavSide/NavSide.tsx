import { useState } from "react";
import { Link } from "react-router-dom";
import SVGComponent from "../../../assets/svg/SVGComponent";
import { useDarkMode } from "../../../hooks/useDarkMode";

type NavSideProps = React.HTMLAttributes<HTMLElement>;

const NavSide: React.FC<NavSideProps> = ({}) => {
  const [selectedLink, setSelectedLink] = useState("");
  const isDarkMode = useDarkMode();
  const handleLinkClick = (link: string) => {
    setSelectedLink(link);
  };

  const linkClasses =
    "relative flex cursor-pointer space-x-2 rounded-md py-4 px-10 font-semibold hover:bg-green-400 transition-colors duration-300 ease-in-out";

  return (
    <div
      className={`fixed left-0 top-0 h-full w-64 ${
        isDarkMode ? "bg-gray-900 text-white" : "bg-gray-200 text-black"
      }`}
    >
      <h1 className="mt-10 ml-10 text-3xl font-bold"></h1>
      <div className="mt-20 space-y-3">
      <Link
          key="Home"
          to="/"
          className={`${linkClasses} ${
            selectedLink === "/" ? "bg-slate-600 text-white  animate-pulse" : ""
          }`}
          onClick={() => handleLinkClick("/")}
        >
          <div>
            {selectedLink === "/" && <SVGComponent />}
            <span className="">
              creact prodact
            </span>
          </div>
        </Link>
        <Link
          key="List"
          to="/List"
          className={`${linkClasses} ${
            selectedLink === "/List"
              ? "bg-slate-600 text-white  animate-pulse"
              : ""
          }`}
          onClick={() => handleLinkClick("/List")}
        >
          <div>
            {selectedLink === "/List" && <SVGComponent />}
            <span className="">List</span>
          </div>
        </Link>
     

        <Link
          key="UserProducts"
          to="/UserProducts"
          className={`${linkClasses} ${
            selectedLink === "/UserProducts"
              ? "bg-slate-600 text-white  animate-pulse"
              : ""
          }`}
          onClick={() => handleLinkClick("/UserProducts")}
        >
          <div>
            {selectedLink === "/UserProducts" && <SVGComponent />}
            <span className="">
              User Products
            </span>
          </div>
        </Link>
{/* 
        <Link
          key="Swiper"
          to="/Swiper"
          className={`${linkClasses} ${
            selectedLink === "/Swiper"
              ? "bg-slate-600 text-white  animate-pulse"
              : ""
          }`}
          onClick={() => handleLinkClick("/Swiper")}
        >
          <div>
            {selectedLink === "/Swiper" && <SVGComponent />}
            <span className="">Swiper</span>
          </div>
        </Link>
        <Link
          key="Footer"
          to="/Footer"
          className={`${linkClasses} ${
            selectedLink === "/Footer"
              ? "bg-slate-600 text-white  animate-pulse"
              : ""
          }`}
          onClick={() => handleLinkClick("/Footer")}
        >
          <div>
            {selectedLink === "/Footer" && <SVGComponent />}
            <span className="">Footer</span>
          </div>
        </Link> */}
      </div>
    </div>
  );
};

export default NavSide;
