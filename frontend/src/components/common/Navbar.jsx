import React, { useState } from "react";
import { Link } from "react-router-dom";
import { HiOutlineUser } from "react-icons/hi";
import { HiOutlineShoppingBag } from "react-icons/hi";
import { HiBars3BottomRight } from "react-icons/hi2";
import SearchBar from "./SearchBar";
import CardDrawyer from "../Layout/CardDrawyer";
import { IoMdClose } from "react-icons/io";
import { useSelector } from "react-redux";

function Navbar() {
  const [drawyerOpen, setDrawyerOpen] = useState(false);
  const [navDrawyer, setNavDrawyer] = useState(false);

  const {cart} = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  
  
  const cartItemCount = cart?.products?.reduce((acc, item) => acc + item.quantity, 0)||0 ;


  const toggleDrawyer = () => {
    setDrawyerOpen(!drawyerOpen);
  };
  const toggleNavDrawyer = () => {
    setNavDrawyer(!navDrawyer);
  };
  return (
    <>
      <nav className="container max-w-screen flex items-center justify-between   py-4 px-6">
        <div>
          <Link to="/" className="text-2xl font-medium">
            Rabbit
          </Link>
        </div>
        <div className="space-x-6 hidden md:flex">
          <Link
            to="/collections/all?category=Men"
            className="text-sm text-gray-700 hover:text-black font-medium uppercase"
          >
            men
          </Link>
          <Link
            to="/collections/all?category=Women"
            className="text-sm text-gray-700 hover:text-black font-medium uppercase"
          >
            women
          </Link>
          <Link
            to="/collections/all?category=Top Wear"
            className="text-sm text-gray-700 hover:text-black font-medium uppercase"
          >
            topwear
          </Link>
          <Link
            to="/collections/all?category=Bottom Wear"
            className="text-sm text-gray-700 hover:text-black font-medium uppercase"
          >
            bottomwear
          </Link>
        </div>
        {/* right icons */}
        <div className="flex items-center space-x-4 ">
          {
            user && user.role == 'admin' && (
              <Link to="/admin" className="block bg-black text-white text-sm rounded px-2">Admin</Link>
            )
          }
          <Link to="/profile" className="hover:text-black">
            <HiOutlineUser className="h-6 w-6 text-gray-700 cursor-pointer" />
          </Link>
          <button onClick={toggleDrawyer} className="relative hover:text-black">
            <HiOutlineShoppingBag className="h-6 w-6 text-gray-700 cursor-pointer" />
          {cartItemCount>0 && (
              <span className="absolute -top-1 text-xs bg-[#ea2e0e] text-white rounded-full px-2 py-0.5">
              {cartItemCount}
            </span>
          )}
          </button>

          {/* search */}
          <div className="overflow-hidden">
            <SearchBar />
          </div>
          <button onClick={toggleNavDrawyer} className="md:hidden">
            <HiBars3BottomRight className="h-6 w-6 text-gray-700 cursor-pointer" />
          </button>
        </div>
      </nav>
      <CardDrawyer drawyerOpen={drawyerOpen} toggleDrawyer={toggleDrawyer} />
      {/* mobile navigation */}
      <div
        className={`fixed top-0 left-0 w-3/4 sm:w-1/2 md:1/3 h-full bg-white shadow-lg transition-transform duration-300 ${
          navDrawyer ? "translate-x-0" : "-translate-x-full"
        }
      }`}
      >
        <div className="flex justify-end p-4">
          <button onClick={toggleNavDrawyer}>
            <IoMdClose className="h-6 w-6 text-gray-600" />
          </button>
        </div>
        <div className="p-4">
          <h2 className="text-xl font-semibold mb-4">Menu</h2>
          <nav className="space-y-4">
            <Link
              to="/collections/all?category=Men"
              onClick={toggleNavDrawyer}
              className="text-gray-600 hover:text-black block"
            >
              Men
            </Link>
            <Link
              to="/collections/all?category=Women"
              onClick={toggleNavDrawyer}
              className="text-gray-600 hover:text-black block"
            >
              Women
            </Link>
            <Link
              to="/collections/all?category=Top Wear"
              onClick={toggleNavDrawyer}
              className="text-gray-600 hover:text-black block"
            >
              Top wear
            </Link>
            <Link
              to="/collections/all?category=Bottom Wear"
              onClick={toggleNavDrawyer}
              className="text-gray-600 hover:text-black block"
            >
              Bottom wear
            </Link>
          </nav>
        </div>
      </div>
    </>
  );
}

export default Navbar;
