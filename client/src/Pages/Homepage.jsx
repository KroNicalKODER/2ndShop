import React, { useEffect, useState } from 'react'
import Sell from '../Data/Sell.json'
import "bootstrap-icons/font/bootstrap-icons.css"
import './Homepage.css' 
import Card from '../Components/Card'
import axios, { all } from 'axios'


const Homepage = () => {

    const [allItems,setAllItems] = useState([])
    const [skip,setSkip] = useState(0)
    const [isEnd,setIsEnd] = useState(false)

    const [goodType,setGoodType] = useState('resale')
    const [gender,setGender] = useState('Male')

    const fetchItems = async (skip) => {
        try {
            await axios.get(`/item?skip=${skip}`)
            .then((response) => {
                if(response.data.data?.length===0) {
                    setIsEnd(true)
                    return
                }
                setAllItems([...allItems,...response.data.data])
            })
            .catch((error)=>{
                console.log(error)
            })
        } catch (error) {
            console.log(error)
        }
        
    }

    useEffect(()=>{
        fetchItems(skip)
    },[skip])

    const handleScroll = (e)=> {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(skip+10);
        }
    }

  return (
    <div className='flex flex-col'>
        {/* <div className="fixed cursor-pointer flex justify-center items-center z-[10] rounded-[50%] mt-[80vh] self-baseline w-[50px] h-[50px] bg-blue-400"><i className='bi text-white bi-arrow-up'/></div> */}
        <div className='flex mr-12 css-query '>
            <div className='flex-[1] bg-white w-fit px-8 ml-4 py-4 mt-5 rounded-md shadow-md'>
                <div className='flex items-center'>
                    <div className='font-ubuntu text-lg font-bold mb-2 flex items-center text-gray-700'>Filters <i className='text-sm ml-2 bi-filter bi'></i></div>
                    <input type="text" className='mx-2 ml-4 py-1 w-full border px-2 border-black rounded-lg' placeholder='Search...'/>
                </div>
                <div className='mt-3 justify-between flex items-center'>
                    <span>Gender : </span>
                    <div className="flex">
                        <input type="radio" name="gender" value='Male' onChange={e=>setGender(e.target.value)} className='peer/male' id="sell-gender-male" hidden />
                        <label htmlFor="sell-gender-male" className='border py-1 text-sm rounded-bl-md rounded-tl-md px-3 border-black peer-checked/male:border-blue-500 peer-checked/male:text-blue-500'> Male </label>
                        <input type="radio" name="gender" value='Female' onChange={e=>setGender(e.target.value)} className='peer/female' id="sell-gender-female" hidden />
                        <label htmlFor="sell-gender-female" className='border py-1 text-sm rounded-br-md rounded-tr-md px-3 border-black peer-checked/female:border-blue-500 peer-checked/female:text-blue-500'> Female </label>
                    </div>
                </div>
                <div className='flex mt-3 justify-between css-query-wrap'>
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
                    <div className='py-1 px-2 shadow-sm border-2 border-blue-200 rounded-md css-query-margin'>
                        <label for='Type'>Type: </label>
                        <select name="" id="Type">
                            <option value="UpperWear">Upper Wear</option>
                            <option value="LowerWear">Lower Wear</option>
                            <option value="Shoes">Shoes</option>
                            <option value="Acccessories">Accessories</option>
                        </select>
                    </div>
                </div>
                <div className='flex mt-3 justify-between css-query-wrap'>
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
                    <div className='py-1 px-2 shadow-sm border-2 border-blue-200 rounded-md css-query-margin'>
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
        <div className='flex flex-wrap'>
            {
                // JSON.stringify(allItems)
                (allItems.length > 0) &&
                (allItems.map((item)=>(
                     <Card key={item._id} props={item}/>
                )))
            }
        </div>
        {isEnd && <div className='text-xs text-green-600'> You had reached the end</div>}
    </div>
  )
}

export default Homepage