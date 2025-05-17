import express from 'express';
import { authUser,checkAdmin } from '../middleware/authMiddleware.js';
import { addUser, deleteUser, getUsers, updateUser } from '../controller/admin.controller.js';

const router = express.Router();

//get all users
router.get('/users',authUser,checkAdmin,getUsers);
router.post('/',authUser,checkAdmin,addUser);
router.put('/users/:id',authUser,checkAdmin,updateUser);
router.delete('/users/:id',authUser,checkAdmin,deleteUser);

export default router;