import Checkout from "../models/Checkout.js";

export const createCheckout = async (req, res) => {
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice} = req.body;
    if(!checkoutItems && checkoutItems.length==0){
        return res.status(400).json({message: "No items in the cart."});
    }
  try {
    //create a new checkout session
    const newCheckout = await Checkout.create({
        user:req.user._id,
        checkoutItems: checkoutItems,
        shippingAddress: shippingAddress,
        paymentMethod: paymentMethod,
        totalPrice: totalPrice,
        paymentStatus : "Pending",
        isPaid:false
    })
    res.status(201).json({message: "Checkout created successfully", newCheckout});
  } catch (error) {
    console.log(error);
    return res.status(500).json({ message: "Server Error" });
  }
};

//update checkout to mark as paid after successful payment
export const updateCheckout = async (req, res) => {
    const {paymentStatus,paymentDetails} = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id)
        if(!checkout)
            return res.status(404).json({message: "Checkout not found."});
        if(paymentStatus=="paid"){
            checkout.paymentStatus = paymentStatus;
            checkout.paymentDetails = paymentDetails;
            checkout.isPaid = true;
            checkout.paidAt = Date.now()
            await checkout.save();

            return res.status(200).json(checkout);
        }else{
            return res.status(400).json({message: "Invalid payment status."})
        }
        
    } catch (error) {
        console.log(error);
        return res.status(500).json({ message: "Server Error" });
    }
}

//finalize checkout and convert to an order after payment confirmation
export const finalizeCheckout = async (req, res) => {
    const {checkoutItems,shippingAddress,paymentMethod,totalPrice} = req.body;
    try {
        const checkout = await Checkout.findById(req.params.id)
        if(!checkout)
            return res.status(404).json({message: "Checkout not found."});
        if(checkout.isPaid && !checkout.isFinalized){
            //create final order based on checkout details
            const finalOrder = await Order.create({
                user:checkout.user,
                orderItems:checkout.orderItems,
                shippingAddress: checkout.shippingAddress,
                paymentMethod: checkout.paymentMethod,
                totalPrice: checkout.totalPrice,
                isPaid:true,
                paidAt:checkout.paidAt,
                isDelievered:false,
                paymentStatus:checkout.paymentStatus,
                paymentDetails:checkout.paymentDetails
            })
            checkout.isFinalized=true,
            checkout.finalizedAt=Date.now()
            await checkout.save()
             //delete cart associated with user
            await Cart.findOneAndDelete({user:checkout.user});
            return res.status(200).json(finalOrder);
        }else if(checkout.isFinalized){
            return res.status(400).json({message: "Checkout already finalized."})
        }else{
            return res.status(400).json({message: "Checkout not paid."})
        }

    }
        catch(error){
            console.log(error);
            return res.status(500).json({ message: "Server Error" });

        }
}