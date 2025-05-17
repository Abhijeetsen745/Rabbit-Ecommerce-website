import React from "react";
import { TbBrandMeta } from "react-icons/tb";
import { RiTwitterXLine } from "react-icons/ri";
import { IoLogoInstagram } from "react-icons/io";

function Topbar() {
  return (
    <div className="bg-[#ea2e0e] text-white ">
      <div className="container mx-auto flex justify-between items-center px-3 py-4">
        <div className="md:flex items-center space-x-4 hidden">
          <a href="#" className="hover:text-gray-300">
            <TbBrandMeta className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <IoLogoInstagram className="h-5 w-5" />
          </a>
          <a href="#" className="hover:text-gray-300">
            <RiTwitterXLine className="h-5 w-5" />
          </a>
        </div>
        <div className="text-sm text-center flex-grow">
          <span>We ship worldwide - fast and reliable shipping!</span>
        </div>
        <div className="">
          <a href="tel:+91-9691815387" className="text-sm hidden md:block">
            +91-9691815387
          </a>
        </div>
      </div>
    </div>
  );
}

export default Topbar;
