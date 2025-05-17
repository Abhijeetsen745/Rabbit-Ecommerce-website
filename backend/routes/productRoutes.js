import express from "express";
import { authUser, checkAdmin } from "../middleware/authMiddleware.js";
import { createProduct, deleteProduct, getBestSellerProducts, getNewArrivals, getProducts, getSimilarProducts, getSingleProduct, updateProduct } from "../controller/product.controller.js";

const router = express.Router();

router.post("/", authUser,checkAdmin, createProduct);
router.put("/:productId", authUser,checkAdmin, updateProduct);
router.delete("/:productId", authUser,checkAdmin, deleteProduct);

//get products
router.get('/',getProducts)
router.get('/best-seller',getBestSellerProducts)
router.get('/new-arrivals',getNewArrivals)
router.get('/:id',getSingleProduct)
router.get('/similar/:id',getSimilarProducts)

export default router;
