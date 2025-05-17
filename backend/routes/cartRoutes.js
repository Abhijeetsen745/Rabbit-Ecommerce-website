import express from 'express';
import { addCart, deleteCart, getCartItems, mergeGuestCart, updateProductQuantity } from '../controller/cart.controller.js';
import { authUser } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post('/', addCart);
router.put('/',updateProductQuantity);
router.delete('/',deleteCart);
router.get('/',getCartItems);
router.post('/',authUser,mergeGuestCart);

export default router;