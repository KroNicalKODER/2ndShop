import express from 'express'
import getToken from '../getToken.js'
import { makeOrder, afterPayment } from '../controllers/payment.js'

const router = express.Router()

router.post("/order",makeOrder)
router.post("/afterPayment",getToken,afterPayment)
router.get("/getapikey",(req,res)=>{
    res.status(200).json({key : process.env.RAZORPAY_KEY_ID})
})

export default router