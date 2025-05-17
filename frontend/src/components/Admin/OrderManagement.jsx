import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { fetchAllOrders, updateOrderStatus } from "../../redux/adminOrderSlice";

function OrderManagement() {

const dispatch = useDispatch();
const navigate = useNavigate();
const {user} = useSelector((state) => state.auth);
const {orders,loading,error} = useSelector((state) => state.adminOrders);

useEffect(()=>{
  if(user && user.role !== "admin"){
    navigate("/");
  }else{
    dispatch(fetchAllOrders());
  }
},[dispatch,navigate,user]);


  const handleOrderChange=(orderId,orderStatus)=>{
    // console.log({orderId,orderStatus});
    dispatch(updateOrderStatus({id:orderId,status:orderStatus}))
    
  }
  const handleDelete=(orderId,orderStatus)=>{
    console.log({orderId,orderStatus});

  }

   if(loading){return <p>Loading...</p>}
  if(error){return <p>Error = {error} or 0 orders.</p>}

  return (
    <div className="max-w-7xl mx-auto p-6">
      <h2 className="mb-6 font-bold text-2xl">Order Management</h2>
      <div className="overflow-x-auto shadow-md sm:rounded-lg  ">
        <table className="min-w-full text-left text-gray-500  ">
          <thead className="text-gray-700 bg-gray-100 uppercase text-xs  ">
            <tr>
              <th className="py-3 px-4">Order id </th>
              <th className="py-3 px-4">customer</th>
              <th className="py-3 px-4">total price </th>
              <th className="py-3 px-4">status</th>
              <th className="py-3 px-4">Actions</th>
            </tr>
          </thead>
          <tbody>
            {orders.length > 0 ? (
              orders.map((order) => (
                <tr key={order._id} className="border-b hover:bg-gray-50 ">
                  <td className="p-4 font-medium text-gray-900">{order._id}</td>
                  <td className="p-4">admin</td>

                  <td className="p-4">${order.totalPrice.toFixed(2)} </td>
                  <td className="p-4">
                    <select
                      name="status"
                      value={order.status}
                      className="border bg-gray-50 border-gray-300 rounded-lg text-sm p-2.5"
                      onChange={(e) =>
                        handleOrderChange(order._id, e.target.value)
                      }
                    >
                      <option value="Processing">Processing</option>
                      <option value="Delivered">Delivered</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Cancelled">Cancelled</option>
                    </select>
                  </td>
                  <td className="p-4">
                    <button onClick={()=>handleDelete(order._id,"Delivered")} className="px-2 py-1 bg-green-500 hover:bg-green-600 rounded text-white">
                      Mark as Delivered
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={4} className="p-4 text-center text-gray-500">
                  No Product Found.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default OrderManagement;
