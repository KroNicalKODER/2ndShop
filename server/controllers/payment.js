import instance from '../Razorpay.js'
import Shoes from  '../models/Shoes.js'
import Clothing from '../models/Clothing.js'
import Accessories from '../models/Accessories.js'
import User from '../models/User.js'
import genErr from '../error.js'
import axios from 'axios'
import Orders from '../models/Orders.js'

export const makeOrder = async (req,res,next) => {
    try {
        console.log(req.body.amount)
        const options = {
            amount: Number(req.body.amount)*100,  
            currency: "INR",
            receipt: "order_rcptid_11"
          }
          const succ = await instance.orders.create(options)
          res.status(200).json(succ)
    } catch (error) {
        console.log(error)
    }
}

export const afterPayment = async (req, response, next) => {
    const razorpay_payment_id = req.body.razorpay_payment_id
    const objStr = req.query.obj
    const {item_id, item_type, reciever_address, reciever_pincode, reciever_name, reciever_phone} = JSON.parse(objStr)
    let item = {}
    
    if(item_type=='FootWear') {
        try {
            item = await Shoes.findById({_id: item_id})
        } catch (error) {
            next(genErr(error))
        }
    }
    if(item_type=='Clothing') {
        try {
            item = await Clothing.findById({_id: item_id})
        } catch (error) {
            next(genErr(error))
        }
    }
    if(item_type=='Accessories') {
        try {
            item = await Accessories.findById({_id: item_id})
        } catch (error) {
            next(genErr(error))
        }
    }
    const seller = await User.findById({_id: item.ownerId})
    const DTDC_obj = {
        consignments : [{
            customer_code: item.ownerId,
            service_type_id: "PRIORITY",
            load_type: "NON-DOCUMENT",
            reference_number: "",
            declared_value: String(item.newCost),
            commodity_name: item.type,
            num_pieces: "1",
            origin_details : {
                name: seller.name,
                phone: seller.phone,
                address_line_1: item.pickupAddress,
                pincode: item.pinOrigin
            },
            destination_details: {
                name: reciever_name,
                phone: reciever_phone,
                address_line_1: reciever_address,
                pincode: reciever_pincode
            },
            return_details: {
                name: seller.name,
                phone: seller.phone,
                address_line_1: item.pickupAddress,
                pincode: item.pinOrigin
            },
            pieces_detail: [{
                declared_value: String(item.newCost),
                weight: "1",
                height: "2",
                length: "5",
                width: "5"
            }]
        }]
    }
    console.log(DTDC_obj,DTDC_obj.consignments[0].origin_details,DTDC_obj.consignments[0].return_details,DTDC_obj.consignments[0].destination_details)
    const headers = {
        'api-key' : process.env.DTDC_API_KEY
    }
    axios.post('http://demodashboardapi.shipsy.in/api/customer/integration/consignment/softdata',DTDC_obj,{ headers })
    .then( async (res)=>{
        const DTDC_ref_no = res.data.data[0].reference_number
        const DTDC_success = res.data.data[0].success
        const DTDC_reason = res.data.data[0].reason
        console.log(res.data.data)

        //SAVING TO ORDERS DOCS

        const ordersObj = {
            buyerId: req.user.id,
            sellerId: item.ownerId,
            itemId: item_id,
            pickupAddress: String(item.pickupAddress + item.pinOrigin),
            deliverAddress: String(reciever_address + reciever_pincode),
            itemType: item_type,
            price: item.newCost,
            razorpay_payment_id: razorpay_payment_id,
            DTDC_reference_number: DTDC_ref_no,
            DTDC_success: DTDC_success,
            DTDC_reason: DTDC_reason
        }
        const newOrder = new Orders(ordersObj)
        try {
            const savedOrder = await newOrder.save()
            item.buyerId = req.user.id
            item.buyerAddress = reciever_address
            response.redirect('http://localhost:3000/sell-success')
        } catch (error) {
            console.log(error)
            response.redirect('http://localhost:3000/sell-error')
        }
    }).catch(async (err)=>{
        instance.payments.refund(razorpay_payment_id,{
            speed: "normal",
        }).then((res)=> {
            console.log(res)    
        }).catch((err)=>{
            console.log(err)
        })
        const ordersObj = {
            buyerId: req.user.id,
            sellerId: item.ownerId,
            itemId: item_id,
            pickupAddress: String(item.pickupAddress + item.pinOrigin),
            deliverAddress: String(reciever_address + reciever_pincode),
            itemType: item_type,
            price: item.newCost,
            razorpay_payment_id: razorpay_payment_id,
            DTDC_reference_number: 'none',
            DTDC_success: 'false',
            DTDC_reason: 'DTDC Err',
            note: JSON.stringify(err)
        }

        const newOrder = new Orders(ordersObj)
        try {
            const savedOrder = await newOrder.save()
        } catch (error) {
            console.log(error)
        }
        response.redirect('http://localhost:3000/sell-error')
        console.log(err)
    })
  }