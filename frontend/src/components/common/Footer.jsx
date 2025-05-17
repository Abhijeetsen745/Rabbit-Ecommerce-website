import React, { useEffect, useState } from "react";
import { IoLogoInstagram } from "react-icons/io";
import { RiTwitterXLine } from "react-icons/ri";
import { TbBrandMeta } from "react-icons/tb";
import { Link } from "react-router-dom";
import { FiPhoneCall } from "react-icons/fi";
import { getSubscriber, clearError } from "../../redux/subscriberSlice";
import { useDispatch, useSelector } from "react-redux";

function Footer() {
  const [email,setEmail] = useState('');
  const dispatch = useDispatch();
  const error = useSelector(state => state.subscriber.error);
  const successMessage = useSelector(state => state.subscriber.successMessage);


  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(getSubscriber({ email }));
    setEmail("")
  }

  const handleChange = (e) => {
    setEmail(e.target.value);
    if (error || successMessage) {
      dispatch(clearError());
    }
  }

  return (
    <footer className="border-t py-12 text-center md:text-start">
      <div className="container mx-auto grid grid-cols-1 md:grid-cols-4 gap-8 px-4 lg:px-0">
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Newsletter</h3>
          <p className="">
            Be the first to hear about new products, exclusive events, and
            online offers.
          </p>
          <p className="font-medium text-sm text-gray-600 mb-6">
            sign up and get 10% off your first order.
          </p>
          {/* form  */}
          <form className="flex" onSubmit={handleSubmit}>
            <input
              type="email"
              value= {email}
              onChange={handleChange}
              placeholder="enter your email"
              className="p-3 w-full text-sm border-t border-l border-b border-gray-300 rounded-l-md focus:outline-none focus:ring-2 focus:ring-gray-500 transition-all"
            />
            <button
              type="submit"
              className="bg-black text-white text-sm rounded-r-md px-6 py-3 hover:bg-gray-700 transition-all"
            >
              Subscribe
            </button>
          </form>
          {error && <p className="text-red-600 mt-2 text-sm">{error}</p>}
          {successMessage && <p className="text-green-600 mt-2 text-sm">{successMessage}</p>}
        </div>
        {/* shop  */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Shop</h3>
          <ul className="space-y-4 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Men's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Women's top wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Men's bottom wear
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Women's bottom wear
              </Link>
            </li>
          </ul>
        </div>
        {/* support  */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Support</h3>
          <ul className="space-y-4 text-gray-600">
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Contact us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                About us
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                FAQs
              </Link>
            </li>
            <li>
              <Link to="#" className="hover:text-gray-600 transition-colors">
                Features
              </Link>
            </li>
          </ul>
        </div>
        {/* follow us */}
        <div>
          <h3 className="text-lg text-gray-800 mb-4">Follow us</h3>
          <div
            className="flex items-center space-x-4 mb-6 justify-center md:justify-start
      "
          >
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-gray-800 transition-colors"
            >
              <TbBrandMeta className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-gray-800 transition-colors"
            >
              <IoLogoInstagram className="h-5 w-5" />
            </a>
            <a
              href="https://www.facebook.com"
              target="_blank"
              rel="noopener noreferrer"
              className=" hover:text-gray-800 transition-colors"
            >
              <RiTwitterXLine className="h-5 w-5" />
            </a>
          </div>
          <p className="text-gray-500">Call us</p>
          <p>
            <FiPhoneCall className="inline-block mr-2" />
            012-345-678
          </p>
        </div>
      </div>
      {/* footer bottom  */}
      <div className="container mx-auto mt-12 px-4 lg:px-0 border-t pt-6 border-gray-200">
        <p className="text-gray-500 text-sm text-center tracking-tighter">
          © 2025, Abhijeet-Sen. All rights reserved.
        </p>
      </div>
    </footer>
  );
}

export default Footer;
