import express from 'express'
import { authUser,checkAdmin } from '../middleware/authMiddleware.js';
import { getAllOrders } from '../controller/orderAdmin.controller.js';

const router = express.Router();

router.get('/',authUser,checkAdmin,getAllOrders)

export default router;