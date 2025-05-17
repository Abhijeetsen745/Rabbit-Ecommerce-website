import Order from '../models/Order.js'


export const getAllOrders = async (req,res) => {
    
    try {
        const orders = await Order.find({}).populate("user","name email")
        res.json(orders);
        
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
}

//update order status
export const updateOrderStatus = async (req,res) => {
    const {status} = req.body;
    const {id} = req.params;
    try {
        const order = await Order.findById(id).populate('user','name')
        if(order){
            order.status = status || order.status;
            order.isDelivered = status === 'Delivered'? true:order.isDelivered;
            order.deliveredAt = status === 'Delivered'?Date.now():order.deliveredAt;

            const updatedOrder = await order.save()
            res.json(updatedOrder);
        }
        else{
            res.status(404).json({ message: 'Order not found' });
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Failed to fetch orders' });
    }
}


//@route  delete /api/admin/orders/:id 
//@desc delete order
//@access Private/Admin


export const deleteOrder = async (req,res) => {
    const {id} = req.params;
    try {
        const order = await Order.findById(id)
        if(order){
            await order.deleteOne();
            res.json({message:'Order deleted successfully'})
        }
        else{
            return res.status(404).json({message:'Order not found'})
        }
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'Error deleting order' });
    }
}