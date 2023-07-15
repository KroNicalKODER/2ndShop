import { Timestamp } from 'mongodb'
import mongoose from 'mongoose'

const orderSchema = mongoose.Schema ({
    buyerId: {
        type: String,
    },
    sellerId:{
        type:String
    },
    itemId : {
        type: String,
    },
    itemType: {
        type: String,
    },
    price: {
        type: Number,
    },
    deliverDate: {
        type: Date
    },
    razorpay_payment_id: {
        type: String
    },
    razorpay_order_id: {
        type: String
    },
    pickup_address: {
        type: String
    },
    deliver_address: {
        type: String
    },
    note: {
        type: String
    },
    DTDC_reference_number: {
        type: String
    },
    DTDC_success: {
        type: Boolean,
    },
    DTDC_reason: {
        type: String,
    }
},{timestamps : true})

export default mongoose.model('orders', orderSchema)

