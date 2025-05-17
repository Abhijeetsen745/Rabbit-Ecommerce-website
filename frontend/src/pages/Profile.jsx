import React, { useEffect } from 'react'
import MyOrdersPage from './MyOrdersPage'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { logout } from '../redux/authSlice';
import { clearCart } from '../redux/cartSlice';

function Profile() {
const {user} = useSelector((state) => state.auth);
const dispatch = useDispatch();
const navigate = useNavigate();

useEffect(()=>{
  if(!user){
    navigate("/login")
  }

},[user,navigate])

const handleLogout = () =>{
  dispatch(logout());
  dispatch(clearCart());
  navigate("/login");

}

  return (
    <div className='min-h-screen flex flex-col container mx-auto p-4 md:p-6'>
      <div className="flex flex-col md:flex-row w-full md:space-x-6 space-y-6 md:space-y-0 ">
        {/* left */}
        <div className="w-full h-[200px] md:w-1/3 lg:w-1/4 shadow-md rounded-lg p-6  ">
        <h1 className="text-2xl md:text-3xl font-bold mb-4">{user?.name}</h1>
        <p className="text-lg  text-gray-500 mb-4">{user?.email}</p>
        <button onClick={handleLogout} className='bg-red-500 text-white w-full rounded px-4 py-2 hover:bg-red-600 '>Logout</button>
        </div>
        {/* right  */}
        <div className="w-full md:w-2/3 lg:w-3/4">
        <MyOrdersPage/>
        </div>
      </div>
    </div>
  )
}

export default Profile;
