import React, { useState } from "react";
import { FaBars } from "react-icons/fa";
import AdminSidebar from "./AdminSidebar";
import { Outlet } from "react-router-dom";

function AdminLayout() {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  return (
    <div className="min-h-screen flex flex-col md:flex-row relative ">
      {/* mobile toggle button  */}

      <div className="flex md:hidden p-4 bg-gray-900 text-white z-20 ">
        <button onClick={toggleSidebar}>
          <FaBars size={24} />
        </button>
        <h1 className="text-xl font-medium ml-4">Admin Dashboard</h1>
      </div>
      {isSidebarOpen && (
        <div
          onClick={toggleSidebar}
          className="inset-0 z-10  fixed bg-gray-500  md:hidden "
        ></div>
      )}
      {/* sidebar  */}
      <div
        className={`bg-gray-900 text-white absolute w-64 min-h-screen md:relative transition-transform duration-300 ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } md:static md:block z-20 md:translate-x-0  `}
      >

        <AdminSidebar/>
      </div>
      {/* main content */}
      <div className="flex-grow p-6 overflow-auto   ">
        <Outlet/>
      </div>
    </div>
  );
}

export default AdminLayout;
