import express from 'express'
import { getProfile, loginUser, registerUser } from '../controller/user.controller.js';
import { authUser } from '../middleware/authMiddleware.js';

const router = express.Router()

//register user
 router.post('/register',registerUser)
 router.post('/login',loginUser)
 router.get('/get-profile',authUser,getProfile)
 
export default router;


