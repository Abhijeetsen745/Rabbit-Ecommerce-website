import express from 'express'
import { authUser } from '../middleware/authMiddleware.js';
import { createCheckout, finalizeCheckout, updateCheckout } from '../controller/checkout.controller.js';

const router = express.Router()

router.post('/',authUser,createCheckout)
router.put('/:id/pay',authUser,updateCheckout)
router.post('/:id/finalize',authUser,finalizeCheckout)


export default router;