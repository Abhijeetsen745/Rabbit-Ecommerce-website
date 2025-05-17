import mongoose from "mongoose";
import { cartItemSchema } from "./CartItem.js";

const cartSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref:'User'
    },
    guestId:String,
    products:{
        type:[cartItemSchema]
    },
    totalPrice:{
        type:Number,
        required:true
    },
},{timestamps:true})

const Cart = mongoose.model("Cart", cartSchema);

export default Cart;