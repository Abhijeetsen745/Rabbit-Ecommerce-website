import React from "react";
import {
  FaBoxOpen,
  FaClipboardList,
  FaSignOutAlt,
  FaStore,
  FaUser,
} from "react-icons/fa";
import { Link, NavLink, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { logout } from "../../redux/authSlice";
import { clearCart } from "../../redux/cartSlice";

function AdminSidebar() {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logout());
    dispatch(clearCart());

    navigate("/login");
  };

  return (
    <div className="p-6">
      <div className="mb-6">
        <Link to={"/admin"} className="text-2xl font-medium ">
          Rabbit
        </Link>
      </div>
      <h1 className="text-xl text-center font-medium mb-6  ">
        Admin Dashboard
      </h1>
      <nav className="flex flex-col space-y-2  ">
        <NavLink
          to={"/admin/users"}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 py-3 px-2 flex items-center space-x-2 rounded "
              : "text-gray-300 hover:text-white   hover:bg-gray-700 py-3 px-2 flex items-center space-x-2 rounded "
          }
        >
          <FaUser />
          <span>Users</span>
        </NavLink>
        <NavLink
          to={"/admin/products"}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 py-3 px-2 flex items-center space-x-2 rounded "
              : "text-gray-300 hover:text-white   hover:bg-gray-700 py-3 px-2 flex items-center space-x-2 rounded "
          }
        >
          <FaBoxOpen />
          <span>Products</span>
        </NavLink>
        <NavLink
          to={"/admin/orders"}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 py-3 px-2 flex items-center space-x-2 rounded "
              : "text-gray-300 hover:text-white   hover:bg-gray-700 py-3 px-2 flex items-center space-x-2 rounded "
          }
        >
          <FaClipboardList />
          <span>Orders</span>
        </NavLink>
        <NavLink
          to={"/"}
          className={({ isActive }) =>
            isActive
              ? "text-white bg-gray-700 py-3 px-2 flex items-center space-x-2 rounded "
              : "text-gray-300 hover:text-white   hover:bg-gray-700 py-3 px-2 flex items-center space-x-2 rounded "
          }
        >
          <FaStore />
          <span>Shop</span>
        </NavLink>
      </nav>
      <div className="mt-6">
        <button
          onClick={handleLogout}
          className="bg-red-500 hover:bg-red-600 text-white py-2 px-4 flex items-center justify-center space-x-2 w-full rounded"
        >
          <FaSignOutAlt />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
}

export default AdminSidebar;
