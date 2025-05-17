import express from 'express'
import { getOrderById, getOrders } from '../controller/order.controller.js';
import { authUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.get('/my-orders',authUser,getOrders)
router.get('/my-orders/:id',authUser,getOrderById)


export default router;