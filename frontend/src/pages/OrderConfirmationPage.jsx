import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { clearCart } from '../redux/cartSlice';

function OrderConfirmationPage() {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const { checkout } = useSelector((state) => state.checkout)

    //clear cart
    useEffect(()=>{
        if(checkout && checkout._id){
            dispatch(clearCart());
            localStorage.removeItem('cart');
        }else{
            navigate('/my-orders');
        }
    },[checkout, dispatch, navigate])

    const calcEstimatedDate=(createdAt)=>{
      const orderDate = new Date(createdAt)
      orderDate.setDate(orderDate.getDate()+10)
      return orderDate.toLocaleDateString();
    }

  return (
    <div className='max-w-4xl mx-auto p-6 bg-white '>
        <h1 className="text-center font-bold text-3xl text-emerald-500  ">Thank You for your Order</h1>
      {
        checkout && (
            <div className="p-6 mt-4 rounded-lg border">
                <div className="flex justify-between mb-20 ">
                    <div className="">
                        <h2 className="text-xl font-semibold ">Order ID: {checkout._id}</h2>
                        <p className="text-gray-500 ">Order Date: {new Date(checkout.createdAt).toLocaleDateString()}</p>
                    </div>
                    <div className="">
                        <p className="text-emerald-700 text-sm ">Estimated Delivery: {calcEstimatedDate(checkout.createdAt)}</p>
                    </div>
                </div>
                {/* ordered Items  */}
                <div className="mb-20 ">
                    {
                        checkout.checkoutItems.map((item) => (
                            <div key={item.productId} className="flex items-center mb-2">
                                <img src={item.image} alt={item.name} className="h-16 w-16 rounded-md mr-4" />
                                <div>
                                    <p className="text-md font-semibold ">{item.name} </p>
                                    <p className="text-gray-500 text-sm">{item.color} | {item.size} </p>
                                </div>
                                <div className="ml-auto text-right">
                                    <p className="text-md font-semibold">${item.price}</p>
                                    <p className="text-gray-500 text-sm">Qty: {item.quantity}</p>
                                </div>
                            </div>
                        ))
                    }
                </div>
                {/* payment and delivery info */}
                <div className="grid grid-cols-2 gap-8">
                    <div>
                        <h4 className="text-lg font-semibold mb-2 ">Payment</h4>
                        <p className="text-gray-600 ">Paypal</p>
                    </div>
                    <div>
                        <h4 className="text-lg font-semibold mb-2 ">Delivery</h4>
                        <p className="text-gray-600 ">{checkout.shippingAddress.address} </p>
                        <p className="text-gray-600 ">{checkout.shippingAddress.city}{' '}{checkout.shippingAddress.country} </p>
                    </div>
                </div>
               
            </div>
        )
      }
    </div>
  )
}

export default OrderConfirmationPage
