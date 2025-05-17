import React, { useEffect, useState } from "react";
import { Link, useLocation, useNavigate } from "react-router-dom";
import register from "../../assets/register.webp";
import { registerUser } from "../redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";
import { mergeCarts } from "../redux/cartSlice";

function Register() {
    const [name,setName]=useState('')
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();
   
    const location = useLocation()
   const {user,guestId} = useSelector((state)=>state.auth)
   const {cart} = useSelector((state)=>state.cart)
   
   const redirect = new URLSearchParams(location.search).get("redirect")|| '/';
   const isCheckoutRedirect = redirect.includes("checkout");
   
   useEffect(()=>{
     if(user){
       if(cart?.products.length>0 && guestId){
         dispatch(mergeCarts({guestId,user})).then(()=>{
           navigate(isCheckoutRedirect?"/checkout":"/")
         })
       }
       else{
         navigate(isCheckoutRedirect?"/checkout":"/")
       }
     }
   },[user,cart,guestId,dispatch,navigate,isCheckoutRedirect])

    const handleSubmit=(e)=>{
    e.preventDefault()
    const res = dispatch(registerUser({name,email,password}))
    res.then(action=>{
      if(action.error){
        toast.error(action.error.message)
      }else{
        toast.success("Registration successful!")
        navigate(redirect)
      }
    })
    }
  
    return (
      <div className="flex">
        <div className="w-full md:w-1/2 flex flex-col items-center justify-center p-8 md:p-12">
          <form className="w-full max-w-md bg-white p-8 rounded-lg  shadow-sm">
            <h2 className="text-xl text-center font-semibold mb-4">Rabbit</h2>
            <h2 className="text-center text-2xl font-bold mb-4">Hey there! 👋</h2>
            <p className="text-center mb-4">
              Enter your username and password to Sign In
            </p>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Name</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full border p-2 rounded"
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Email</label>
              <input
                type="text"
                placeholder="Enter your email"
                className="w-full border p-2 rounded"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="mb-4">
              <label className="block text-sm font-semibold mb-2">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                className="w-full border p-2 rounded"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
            <button
              type="submit" onClick={handleSubmit}
              className="w-full bg-black font-semibold text-white rounded p-2 hover:bg-gray-700 transition"
            >
              Sign In
            </button>
            <p className="text-sm mt-6 text-center">
              Don't have an account?
              <Link to={`/login?redirect=${encodeURIComponent(redirect)}`} className="text-blue-700">
                {" "}
                Login
              </Link>
            </p>
          </form>
        </div>
        <div className="hidden md:block w-1/2 bg-gray-800 ">
          <div className="h-full flex flex-col items-center justify-center">
            <img src={register} className="h-[750px] w-full object-cover rounded" />
          </div>
        </div>
      </div>
    );
}

export default Register;
