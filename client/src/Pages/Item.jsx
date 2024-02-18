import React, { useEffect, useState } from 'react'
import addImg from '../images/AddImage.png'
import './item.css'
import axios from 'axios'
import { useParams } from 'react-router-dom'


const Item = (props) => {
    const [id, setId] = useState(useParams().id)
    const [type, setType] = useState(useParams().type)
    const [item, setItem] = useState()
    const [orderId, setOrderId] = useState()
    const [key, setKey] = useState()
    const [address,setAddress] = useState()
    const [pincode,setPincode] = useState()
    const [name,setName] = useState()
    const [phone,setPhone] = useState()

    const fetchItem = async () => {
        try {
            await axios.get(`/item/${id}/${type}`)
                .then((response) => {
                    setItem(response.data)
                })
                .catch((err) => console.log(err))
        } catch (error) {

        }

    }

    const handleBuyClick = async () => {
        try {
            const { data: { key } } = await axios.get("/payment/getapikey")

            const { data: { order } } = await axios.post("/payment/order", { amount: Number(item.newCost) })
            
            console.log(order)
            const obj = {
                item_id : id,
                item_type: type,
                reciever_address: address,
                reciever_pincode: pincode,
                reciever_name: name,
                reciever_phone: phone
            }
            const objStr = JSON.stringify(obj)
            const options = {
                key,
                amount: Number(item.newCost*100),
                currency: "INR",
                name: "2nd-Shop",
                description: "RazorPay test",
                image: "https://avatars.githubusercontent.com/u/93596474?v=4",
                order_id: item.id,
                callback_url: `http://localhost:8800/api/payment/afterPayment?obj=${objStr}`,
                prefill: {
                    name: "Gaurav Kumar",
                    email: "gaurav.kumar@example.com",
                    contact: "9999999999"
                },
                notes: {
                    "address": "Razorpay Corporate Office"
                },
                theme: {
                    "color": "#121212"
                }
            };
            const razor = new window.Razorpay(options);
            razor.open()
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        fetchItem()
    }, [])
    let imgsArray = [addImg, addImg, addImg, addImg, addImg]
    const [currIndex, setCurrIndex] = useState(0)
    return (
        <div>
            {
                !item &&
                <div className='w-full mt-7 text-blue-500 flex justify-center'>
                    Loading...
                </div>

            }
            {item &&
                <div className="flex bg-white mt-3 px-4 min-h-fit min-w-fit mr-3 rounded-md css-item-col">
                    <div className="flex-[1]">
                        <div className='flex-[1] rounded-md bg-white mx-3 px-3 mt-3 h-fit'>
                            <div className=' rounded-lg my-3'>
                                <div className='border border-black flex justify-center h-96 w-auto'>
                                    <img src={item.images[currIndex]} className=' h-96' alt="" />
                                </div>
                            </div>
                            <div className="flex my-3 h-16 border border-black justify-center py-1">
                                {item.images.map((value, index) => (
                                    <button className="ml-1" onClick={() => setCurrIndex(index)}>
                                        <img src={value} className='max-w-full max-h-full' alt="oin" />
                                    </button>
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className='flex-[1] font-inter text-sm mt-2'>
                        <hr className="w-full my-2" />
                        <div className="w-full flex justify-between px-4">
                            <span>Brand - </span>
                            <span>{item.brandName}</span>
                        </div>
                        <hr className="w-full my-2" />
                        <div className="w-full flex justify-between px-4">
                            <span>Size - </span>
                            <span>{item.size}</span>
                        </div>
                        <hr className="w-full my-2" />
                        <div className="w-full flex justify-between px-4">
                            <span>Old Price - </span>
                            <span>{item.oldCost}</span>
                        </div>
                        <hr className="w-full my-2" />
                        <div className="w-full flex justify-between px-4">
                            <span>New Price - </span>
                            <span>{item.newCost}</span>
                        </div>
                        <hr className="w-full my-2" />
                        <div className="w-full flex justify-between px-4">
                            <span>Link - </span>
                            <span><a href={item.orgLink}>click</a></span>
                        </div>
                        <hr className="w-full my-2" />
                        <div className="w-full flex justify-between px-4">
                            <span>Age(in months) : </span>
                            <span>{item.age}</span>
                        </div>
                        <hr className="w-full my-2" />
                        <div className="w-full flex justify-between px-4">
                            <span>Title</span>
                            <textarea disabled className='overflow-scroll py-2 border-slate-700 border rounded-md text-xs text-gray-500 px-2 scrollbar-hide' value={item.noteForBuyer} id="" cols="30" rows="3"></textarea>
                        </div>
                        <hr className="w-full my-2" />
                        <div className="w-full flex justify-between px-4">
                            <label htmlFor="buy-address">Name : </label>
                            <input type="text" className='h-6 border border-black rounded-md text-sm pl-2' onChange={(e)=>setName(e.target.value)} placeholder='Enter name' name="buy-name" id="buy-name" />
                        </div>
                        <div className="w-full flex justify-between px-4 mt-3">
                            <label htmlFor="buy-address">Phone : </label>
                            <input type="text" className='h-6 border border-black rounded-md text-sm pl-2' onChange={(e)=>setPhone(e.target.value)} placeholder='Enter phone' name="buy-phone" id="buy-phone" />
                        </div>
                        <div className="w-full flex justify-between px-4 mt-3">
                            <label htmlFor="buy-address">Address : </label>
                            <input type="text" className='h-6 border border-black rounded-md text-sm pl-2' onChange={(e)=>setAddress(e.target.value)} placeholder='Enter address' name="buy-address" id="buy-address" />
                        </div>
                        <div className="w-full flex justify-between mt-3 px-4">
                            <label htmlFor="buy-address">Pincode : </label>
                            <input type="text" className='h-6 border border-black rounded-md text-sm pl-2' onChange={(e)=>setPincode(e.target.value)} placeholder='Enter Pincode' name="buy-pincode" id="buy-pincode" />
                        </div>
                        <div className='mt-4 w-full justify-center flex css-button-wrap'>
                            <button className='bg-amber-700 text-white px-10 py-1 mx-2 mb-3 rounded-md css-button-margin' onClick={handleBuyClick}>Buy</button>
                            <button className='bg-teal-700 text-white px-4 py-1 mx-2 mb-3 rounded-md css-button-margin'>Add to Cart</button>
                            <button className='bg-blue-700 text-white px-4 py-1 mx-2 mb-3 rounded-md css-button-margin'>Share</button>
                        </div>
                    </div>
                </div>
            }

        </div>
    )
}

export default Item