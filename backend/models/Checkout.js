import mongoose from "mongoose";

const checkoutItemSchema = new mongoose.Schema({
    productId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Product',
        required: true
    },
    name:{
        type: String,
        required: true
    },
    image:{
        type: String,
        required: true
    },
    price:{
        type: Number,
        required: true
    },
    quantity:{
        type: Number,
        required: true
    },
    size:String,
    color:String
},{_id:false})

const checkoutSchema = new mongoose.Schema({
    user:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    checkoutItems:[checkoutItemSchema],
    totalPrice:{
        type: Number,
        required: true
    },
    shippingAddress:{
        address:{type: String,required: true},
        city:{type: String,required: true},
        postalCode:{type: String,required: true},
        country:{type: String,required: true},
    },
    paymentMethod:{
        type: String,
        required: true
    },
    isPaid:{
        type: Boolean,
        default: false
    },
    isFinalized:{
        type: Boolean,
        default: false
    },
    paidAt:{
        type: Date
    },
    paymentStatus:{
        type:String,
        default:'Pending'
    },
    paymentDetails:{
        type:mongoose.Schema.Types.Mixed

    },
    finalizedAt:{
        type: Date,
        
    }
},{timestamps:true})

const Checkout = mongoose.model("Checkout", checkoutSchema);

export default Checkout;