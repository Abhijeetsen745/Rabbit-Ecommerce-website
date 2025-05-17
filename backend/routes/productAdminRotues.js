import express from 'express'
import { authUser,checkAdmin } from '../middleware/authMiddleware.js';
import { deleteAdminProduct, getAllProducts, getSingleProduct, updateAdminProduct } from '../controller/productAdmin.controller.js';

const router = express.Router();

router.get('/',authUser,checkAdmin,getAllProducts)
router.delete('/:id',authUser,checkAdmin,deleteAdminProduct)
router.put('/:id',authUser,checkAdmin,updateAdminProduct)
router.get('/:id',authUser,checkAdmin,getSingleProduct);
export default router;