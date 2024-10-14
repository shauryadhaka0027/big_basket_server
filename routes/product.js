import express from 'express';
import { addCart, getItem, getProduct } from '../controller/product.js';
import { auth } from '../middleWare/auth.js';

const router= express.Router();

router.get("/",getItem)
router.get("/get/:id",getProduct)
router.post("/addCart",auth,addCart)

export default router;