import React, { useState } from 'react'
import addImg from '../images/AddImage.png'
import './item.css'

const Item = (props) => {
    let imgsArray = [addImg,addImg,addImg,addImg,addImg]
    const [currIndex,setCurrIndex] = useState(0)
  return (
    <div>
        <div className="flex bg-white mt-3 px-4 min-h-fit min-w-fit mr-3 rounded-md css-item-col">
            <div className="flex-[1]">
            <div className='flex-[1] rounded-md bg-white mx-3 px-3 mt-3 h-fit'>
            <div className=' rounded-lg my-3'>
                        <div className='border border-black flex justify-center h-96 w-auto'>
                            <img src={imgsArray[currIndex]} className=' h-96' alt="" />
                        </div>
            </div>
            <div className="flex my-3">
                <div className="aspect-1 ml-1 border border-black flex-[1]">
                    <img src={imgsArray[0]} alt="oin" />
                </div>
                <div className="aspect-1 ml-1 border border-black flex-[1]">
                    <img src={imgsArray[1]} alt="oin" />
                </div>
                <div className="aspect-1 ml-1 border border-black flex-[1]">
                    <img src={imgsArray[2]} alt="oin" />
                </div>
                <div className="aspect-1 ml-1 border border-black flex-[1]">
                    <img src={imgsArray[3]} alt="oin" />
                </div>
                <div className="aspect-1 ml-1 border border-black flex-[1]">
                    <img src={imgsArray[4]} alt="oin" />
                </div>
            </div>
        </div>
            </div>
            <div className='flex-[1] font-inter text-sm mt-2'>
                <hr className="w-full my-2" />
                <div className="w-full flex justify-between px-4">
                    <span>Brand - </span>
                    <span>ZARA</span>
                </div>
                <hr className="w-full my-2" />
                <div className="w-full flex justify-between px-4">
                    <span>Size - </span>
                    <span>XL</span>
                </div>
                <hr className="w-full my-2" />
                <div className="w-full flex justify-between px-4">
                    <span>Old Price - </span>
                    <span>10000</span>
                </div>
                <hr className="w-full my-2" />
                <div className="w-full flex justify-between px-4">
                    <span>New Price - </span>
                    <span>1000</span>
                </div>
                <hr className="w-full my-2" />
                <div className="w-full flex justify-between px-4">
                    <span>Link - </span>
                    <span>click</span>
                </div>
                <hr className="w-full my-2" />
                <div className="w-full flex justify-between px-4">
                    <span>Age(in months) : </span>
                    <span>16</span>
                </div>
                <hr className="w-full my-2" />
                <div className="w-full flex justify-between px-4">
                    <span>Note From Buyer</span>
                    <textarea disabled className='overflow-scroll py-2 border-slate-700 border rounded-md text-xs    text-gray-500 px-2 scrollbar-hide' value='Dont Buy this' id="" cols="30" rows="3"></textarea>
                </div>
                <hr className="w-full my-2" />
                <div className="w-full flex justify-between px-4">
                    <label htmlFor="buy-address">Address : </label>
                    <input type="text" className='h-6 border border-black rounded-md text-sm pl-2' placeholder='Enter address' name="buy-address" id="buy-address" />
                </div>
                <div className="w-full flex justify-between mt-3 px-4">
                    <label htmlFor="buy-address">Pincode : </label>
                    <input type="text" className='h-6 border border-black rounded-md text-sm pl-2' placeholder='Enter Pincode' name="buy-address" id="buy-address" />
                </div>
                <div className='mt-4 w-full justify-center flex css-button-wrap'>
                    <button className='bg-amber-700 text-white px-10 py-1 mx-2 rounded-md css-button-margin'>Buy</button>
                    <button className='bg-teal-700 text-white px-4 py-1 mx-2 rounded-md css-button-margin'>Add to Cart</button>
                    <button className='bg-blue-700 text-white px-4 py-1 mx-2 rounded-md css-button-margin'>Share</button>
                </div>
            </div>
        </div>
    </div>
  )
}

export default Item