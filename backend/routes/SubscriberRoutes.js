import express from 'express'
import { handleSubscribe } from '../controller/subscribe.controller.js';

const router = express.Router()

router.post('/',handleSubscribe);

export default router;