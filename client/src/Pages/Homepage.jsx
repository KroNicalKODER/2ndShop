import React, { useState } from 'react'
import Main from '../Components/Main'
import "bootstrap-icons/font/bootstrap-icons.css"



const Homepage = () => {
    const [goodType,setGoodType] = useState('resale')
  return (
    <div className='flex flex-col'>
        <div className="fixed cursor-pointer flex justify-center items-center z-[10] rounded-[50%] mt-[80vh] self-baseline w-[50px] h-[50px] bg-blue-400"><i className='bi text-white bi-arrow-up'/></div>
        <div className='flex mr-12'>
            <div className='flex-[1] bg-white w-fit px-8 ml-4 py-4 mt-5 rounded-md shadow-md'>
                <div className='flex items-center'>
                    <div className='font-ubuntu text-lg font-bold mb-2 flex items-center text-gray-700'>Filters <i className='text-sm ml-2 bi-filter bi'></i></div>
                    <input type="text" className='mx-2 ml-4 py-1 w-full border px-2 border-black rounded-lg' placeholder='Search...'/>
                </div>
                <div className='flex mt-3 justify-between'>
                    <div className=' py-1 px-2 shadow-sm border-2 border-blue-200 rounded-md'>
                        <label for='size'>Size: </label>
                        <select name="" id="size">
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="2XL">2XL</option>
                            <option value="3XL">3XL</option>
                        </select>
                    </div>
                    <div className='py-1 px-2 shadow-sm border-2 border-blue-200 rounded-md'>
                        <label for='Type'>Type: </label>
                        <select name="" id="Type">
                            <option value="UpperWear">Upper Wear</option>
                            <option value="LowerWear">Lower Wear</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Acccessories">Accessories</option>
                        </select>
                    </div>
                </div>
                <div className='flex mt-3 justify-between'>
                    <div className=' py-1 px-2 shadow-sm border-2 border-blue-200 rounded-md'>
                        <label for='size'>Brands: </label>
                        <select name="" id="size">
                            <option value="XS">XS</option>
                            <option value="S">S</option>
                            <option value="M">M</option>
                            <option value="L">L</option>
                            <option value="XL">XL</option>
                            <option value="2XL">2XL</option>
                            <option value="3XL">3XL</option>
                        </select>
                    </div>
                    <div className='py-1 px-2 shadow-sm border-2 border-blue-200 rounded-md'>
                        <label for='Type'>Price: </label>
                        <select name="" id="Type">
                            <option value="UpperWear">Upper Wear</option>
                            <option value="LowerWear">Lower Wear</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Acccessories">Accessories</option>
                        </select>
                    </div>
                </div>
                <div className='py-1 px-2 shadow-sm border-2 border-blue-200 rounded-md w-fit mt-3'>
                        <label for='Type'>Age(in months): </label>
                        <select name="" id="Type">
                            <option value="UpperWear">Upper Wear</option>
                            <option value="LowerWear">Lower Wear</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Acccessories">Accessories</option>
                        </select>
                    </div>
            </div>
            <div className='flex-[1] bg-white w-fit px-8 ml-4 py-4 mt-5 rounded-md shadow-md'>
                <div className='font-ubuntu text-lg font-bold mb-2 flex items-center text-gray-700'>Select Goods<i className='text-sm ml-2 bi-bag-fill bi'></i></div>
                <ul class="flex flex-col">
                    <li onClick={()=>setGoodType('redesign')}>
                        <input type="radio" id="redesign" name="hosting" value="redesign" class="hidden peer" required/>
                        <label for="redesign" className="transition-all flex-col inline-flex p-5 text-gray-500 bg-white border border-gray-200 rounded-t-md cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">                           
                            <span className='font-inter font-normal text-black'>Fashion Redesign</span>
                            <span className='font-inter text-sm'>Buy Redesigned Accessories By Designers accross globe.</span>
                        </label>
                    </li>
                    <li onClick={()=>setGoodType('resale')}>
                        <input type="radio" id="resale" name="hosting" value="resale" class="hidden peer" checked/>
                        <label for="resale" className="transition-all flex-col inline-flex p-5 text-gray-500 bg-white border border-gray-200 rounded-b-md cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                            <span className='font-inter font-normal text-black'>Rebuy Goods</span>
                            <span className='font-inter text-sm'>Buy Again The Used Goods Sold by Others.</span>
                        </label>
                    </li>
                </ul>
                
            </div>
        </div>
        <Main type={goodType}/>
    </div>
  )
}

export default Homepage