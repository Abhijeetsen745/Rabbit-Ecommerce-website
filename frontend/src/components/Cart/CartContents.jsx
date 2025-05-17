import React, { useEffect } from "react";
import { RiDeleteBin3Line } from "react-icons/ri";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart, removeFromCart, updateCartItem } from "../../redux/cartSlice";

function CartContents({cart,userId,guestId}) {
  // const cartProducts = [
  //   {
  //     productId: 1,
  //     name: "T-Shirt",
  //     size: "M",
  //     color: "red",
  //     quantity: 1,
  //     price: 15,
  //     image: "https://picsum.photos/200?random=1",
  //   },
  //   {
  //     productId: 2,
  //     name: "Jeans",
  //     size: "L",
  //     color: "blue",
  //     quantity: 1,
  //     price: 16,
  //     image: "https://picsum.photos/200?random=2",
  //   },
  // ];
  
  const dispatch = useDispatch();


//handling cart
const handleAddToCart = (productId, delta,quantity,size, color) => {
  const newQuantity = quantity + delta;
  if(newQuantity>=1){
    dispatch(updateCartItem({userId,guestId,productId,quantity:newQuantity,size,color}));
  }
}

const handleRemoveFromCart = (productId,size,color) => {
  dispatch(removeFromCart({userId,guestId,productId,size,color}));
}



 

  return (
    <div>
      {cart.products.map((product, i) => (
        <div className="flex items-start justify-between border-b py-4" key={i}>
          <div className="flex items-start w-full justify-between">
            <img
              src={`${import.meta.env.VITE_BACKEND_URL}/static/${product.image}`}
              alt={product.name}
              className="h-24 w-20 rounded mr-4 object-cover"
            />
            <div>
              <h3>{product.name}</h3>
              <p className="text-sm text-gray-500">
                size:{product.size} | color:{product.color}
              </p>
              <div className="flex items-center mt-2">
                <button onClick={
                  ()=>handleAddToCart(product.productId, -1,product.quantity,product.size,product.color)
                } className="text-xl font-medium border px-2 py-1 rounded">
                  -
                </button>
                <span className="mx-4">{product.quantity}</span>
                <button 
                onClick={
                  ()=>handleAddToCart(product.productId, 1,product.quantity,product.size,product.color)
                }
                 className="text-xl font-medium border px-2 py-1 rounded">
                  +
                </button>
              </div>
            </div>
            <div className="">
              <p>$ {product.price*product.quantity}</p>
              

              <button onClick={() => handleRemoveFromCart(product.productId,product.size,product.color)}>
                <RiDeleteBin3Line className="h-6 w-6 mt-2 text-red-600" />
              </button>
            </div>
          </div>
        </div>
      ))}
    </div>
  );
}

export default CartContents;
