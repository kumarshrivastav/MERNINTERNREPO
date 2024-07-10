import express from "express";
import TransactionController from "../controllers/Transaction.controller.js";
const router=express.Router()
router.get('/products',TransactionController.getProducts)
router.post('/addproduct',TransactionController.addProduct)
export default router