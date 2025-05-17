import React, { useEffect, useState } from "react";
import PaypalButton from "./PaypalButton";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createCheckout } from "../../redux/checkoutSlice";

function Chekcout() {
  const [checkoutId, setCheckoutId] = useState(null);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { cart, loading, error } = useSelector((state) => state.cart);
  const { user } = useSelector((state) => state.auth);
  const [shippingAddress, setShippingAddress] = useState({
    Email: "",
    FirstName: "",
    LastName: "",
    Address: "",
    City: "",
    PostalCode: "",
    Country: "",
    Phone: "",
  });

  useEffect(() => {
    if (!cart || !cart.products || cart.products.length === 0) {
      navigate("/");
    }
  }, [cart, navigate]);
  const { Address, City, PostalCode, Country } = shippingAddress;
  const handleCreateCheckout = async (e) => {
    try {
      e.preventDefault();
      if (cart && cart.products.length > 0) {
        const res = await dispatch(
          createCheckout({
            checkoutItems: cart.products,
            shippingAddress: {
              address: Address,
              city: City,
              postalCode: PostalCode,
              country: Country,
            },
            paymentMethod: "paypal",
            totalPrice: cart.totalPrice,
          })
        );
      
        if (res.payload && res.payload.newCheckout._id) {
          setCheckoutId(res.payload.newCheckout._id);

        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  console.log(checkoutId);

  const handlePaymentSuccess = async (details) => {
    try {
      const response = await axios.put(
        `${import.meta.env.VITE_BACKEND_URL}/api/checkout/${checkoutId}/pay`,
        {
          paymentStatus: "paid",
          paymentDetails: details,
        },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      await handleFinalizeChekcout(checkoutId);
    } catch (error) {
      console.log(error);
    }
  };
  const handleFinalizeChekcout = async (checkoutId) => {
    try {
      const response = await axios.post(
        `${
          import.meta.env.VITE_BACKEND_URL
        }/api/checkout/${checkoutId}/finalize`,
        {},
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      navigate("/order-confirmation");
    } catch (error) {
      console.log(error);
    }
  };
  if (loading) {
    return <p>Loading Cart...</p>;
  }
  if (error) {
    return <p>Error = {error}</p>;
  }
  if (!cart || !cart.products || cart.products.length === 0) {
    return <p>No products in cart</p>;
  }

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2  gap-8 max-w-7xl px-6 py-10 mx-auto tracking-tighter">
      {/* left section */}
      <div className="mb-4 bg-white rounded-lg p-6">
        <h2 className="text-2xl uppercase mb-6 tracking-tighter">Chekcout</h2>
        <form onSubmit={handleCreateCheckout}>
          <h3 className="text-lg mb-4">Contact Details</h3>
          <div className="mb-4">
            <label className="text-gray-700 block ">Email</label>
            <input
              type="text"
              value={user ? user.email : ""}
              disabled
              className="w-full border rounded p-2"
            />
          </div>
          <h3 className="mb-4 text-lg">Delivery</h3>

          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="text-gray-700 block">First Name</label>
              <input
                type="text"
                value={shippingAddress.FirstName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    FirstName: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 block">Last Name</label>
              <input
                type="text"
                value={shippingAddress.LastName}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    LastName: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">Address</label>
            <input
              type="text"
              value={shippingAddress.Address}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  Address: e.target.value,
                })
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <div className="mb-4">
              <label className="text-gray-700 block">City</label>
              <input
                type="text"
                value={shippingAddress.City}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    City: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />
            </div>
            <div className="mb-4">
              <label className="text-gray-700 block">Postal Code</label>
              <input
                type="text"
                value={shippingAddress.PostalCode}
                onChange={(e) =>
                  setShippingAddress({
                    ...shippingAddress,
                    PostalCode: e.target.value,
                  })
                }
                className="w-full border rounded p-2"
              />
            </div>
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">Country</label>
            <input
              type="text"
              value={shippingAddress.Country}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  Country: e.target.value,
                })
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mb-4">
            <label className="text-gray-700 block">Phone</label>
            <input
              type="text"
              value={shippingAddress.Phone}
              onChange={(e) =>
                setShippingAddress({
                  ...shippingAddress,
                  Phone: e.target.value,
                })
              }
              className="w-full border rounded p-2"
            />
          </div>
          <div className="mt-6">
            {!checkoutId ? (
              <button
                type="submit"
                className="bg-black text-white py-3 w-full rounded "
              >
                Continue to Payment
              </button>
            ) : (
              <div>
                <h3 className="text-lg mb-4">Pay with Paypal</h3>
                <PaypalButton
                  amount={cart.totalPrice}
                  onSuccess={handlePaymentSuccess}
                  onError={(err) => alert("Payment failed. Try again!")}
                />
              </div>
            )}
          </div>
        </form>
      </div>

      {/* right section */}
      <div className="bg-gray-50 p-6 rounded-lg ">
        <h3 className="text-lg mb-4">Order Summary</h3>
        <div className="border-t py-4 mb-4 ">
          {cart.products.map((product) => (
            <div
              key={product.productId}
              className="flex justify-between items-start py-2 border-b"
            >
              <div className="flex items-start">
                <img
                  src={`${import.meta.env.VITE_BACKEND_URL}/static/${
                    product.image
                  }`}
                  alt={product.name}
                  className="w-20 h-24 rounded-lg object-cover  mr-4"
                />
                <div className="">
                  <h3 className="text-md">{product.name}</h3>
                  <p className="text-gray-500 ">Size:{product.size}</p>
                  <p className="text-gray-500 ">Color:{product.color}</p>
                </div>
              </div>
              <p className="text-xl ">${product.price?.toLocaleString()}</p>
            </div>
          ))}
        </div>
        <div className="mt-4 text-lg flex items-center justify-between mb-4">
          <p className="">Subtotal</p>
          <p className="">${cart.totalPrice?.toLocaleString()}</p>
        </div>
        <div className=" flex items-center justify-between text-lg mb-4">
          <p className="text-gray-500 ">Shipping</p>
          <p className="text-gray-500 ">Free</p>
        </div>
        <div className=" flex items-center justify-between text-lg border-t pt-4 mb-4">
          <p className="text-gray-500 ">Total</p>
          <p className="text-gray-500 ">${cart.totalPrice?.toLocaleString()}</p>
        </div>
      </div>
    </div>
  );
}
export default Chekcout;
