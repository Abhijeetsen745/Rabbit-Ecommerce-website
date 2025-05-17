import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { addUser, deleteUser, fetchUsers, updateUser } from "../../redux/adminSlice";

function UserManagement() {
  
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    role: "customer", //default
  });
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {users,loading,error} = useSelector((state) => state.admin);
  const {user} = useSelector((state) => state.auth);

  useEffect(()=>{
    if(user && user.role !== "admin"){
      navigate("/");
    }
  },[user,navigate]);

  useEffect(()=>{
    dispatch(fetchUsers());
  },[dispatch,user]);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(addUser(formData));
    setFormData({
      name: "",
      email: "",
      password: "",
      role: "customer",
    });
  }
    const handleDelete = (userId) => {
      if(window.confirm('Are you sure to delete this user?')){
        dispatch(deleteUser(userId));
      }
    };

    const handleRoleChange = (userId, userRole,name,email) => {
      dispatch(updateUser({ id:userId, role: userRole,name,email }));
    };
  
  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="mb-6 font-bold text-2xl">User Management</h2>
      {
        loading && (<p>Loading...</p> )}{
        error && (<p>Error...{error}</p> )

      }
      <div className="p-6 mb-4">
        <h3 className="mb-6 font-bold text-lg">Add New User</h3>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block text-gray-700 ">Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-500 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 ">Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-500 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 ">Password</label>
            <input
              type="password"
              name="password"
              value={formData.password}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-500 rounded p-2"
              required
            />
          </div>
          <div className="mb-4">
            <label className="block text-gray-700 ">Role</label>
            <select
              name="role"
              value={formData.role}
              onChange={(e) => handleChange(e)}
              className="w-full border border-gray-500 rounded p-2"
              required
            >
              <option value="customer">customer</option>
              <option value="admin">admin</option>
            </select>
          </div>
          <button
            type="submit"
            className="bg-green-500 rounded py-2 px-4 text-white "
          >
            Add User
          </button>
        </form>
        <div className="overflow-x-auto shadow-md sm:rounded-lg  ">
          <table className="min-w-full text-left text-gray-500  ">
            <thead className="text-gray-700 bg-gray-100 uppercase text-xs  ">
              <tr>
                <th className="py-3 px-4">Name </th>
                <th className="py-3 px-4">Email</th>
                <th className="py-3 px-4">Role </th>
                <th className="py-3 px-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {users.map((user) => (
                <tr key={user._id} className="border-b hover:bg-gray-50 ">
                  <td className="p-4 font-medium text-gray-900">{user.name}</td>
                  <td className="p-4">{user.email} </td>
                  <td className="p-4">
                    <select
                      value={user.role}
                      onChange={(e) =>
                        handleRoleChange(user._id, e.target.value,user.name,user.email)
                      }
                      className="p-2 border rounded"
                    >
                      <option value="customer">customer</option>
                      <option value="admin">admin</option>
                    </select>
                  </td>
                  <td className="p-4">{user.email} </td>
                  <td className="p-4">
                    <button
                      onClick={()=>handleDelete(user._id)}
                      className="px-2 py-1 bg-red-500 hover:bg-red-600 rounded text-white"
                    >
                      DELETE
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

export default UserManagement;
