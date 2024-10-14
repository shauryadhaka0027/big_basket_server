import express from 'express';
import { signup, verifyOTP } from '../controller/user.js';

const router=express.Router();

router.post("/signup",signup )
router.post("/verifyOTP",verifyOTP)




export default router