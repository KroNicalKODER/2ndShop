import React, { useState } from 'react'
import Dropzone from 'react-dropzone'

import SellData from '../Data/Sell.json'
import ClothBrand from '../Data/ClothingCompanies.json'
import ShoesBrand from '../Data/ShoesCompanies.json'
import AddImg from '../images/AddImage.png'

import './sell.css'

const Sell = () => {

    const [showBrandInput,setShowBrandInput] = useState(true)
    const [isRedesigned, setIsRedesigned] = useState(true)
    const [subCategory, setSubCategory] = useState([{"name" : "select option"}])
    const [sizeArray, setSizeArray] = useState(["select option"])
    const [subbCategory,setSubbCategory] = useState()
    const [genderState,setGender] = useState('Male')
    const [category,setCategory] = useState('Clothing')
    let imgsArray = [AddImg,AddImg,AddImg,AddImg,AddImg]
    const [currIndex,setCurrIndex] = useState(0)

    const handleBrandInput = (e) => {
        if(e.target.value !== 'Others') setShowBrandInput(false)
        else setShowBrandInput(true)
    }
    const handleRedesigned = (e) => {
        if(e.target.value === 'Redesigned') setIsRedesigned(true);
        else setIsRedesigned(false);
    }
    const setGenderforSub = (e) => {
        setGender(e.target.value)
        const subDataArray = SellData.filter(
            data => data.gender === e.target.value
        )
        const subData = subDataArray[0].category
        const subCategory = subData.filter(
            data => data.name === category
        )
        setSubCategory(subCategory[0].subCategory)
        // console.log(subCategory[0].subCategory)
    }
    const setCatForSub = (e) => {
        const subDataArray = SellData.filter(
            data => data.gender === genderState
        )
        setCategory(e.target.value)
        const subData = subDataArray[0].category
        const subCategory = subData.filter(
            data => data.name === e.target.value
        )
        setSubCategory(subCategory[0].subCategory)
        // console.log(subCategory[0].subCategory)
    }

    const handleSetSubbCategory = (e) => {
        setSubbCategory(e.target.value)
        const sizes = subCategory.filter( data => data.name === e.target.value)
        setSizeArray(sizes[0].size)
        // console.log(sizes[0].size)
    }

    const handleDrop = ()=>{

    }

  return (
    <div className='flex justify-center items-center css-sell-col'>
        <div className='flex-[2] px-3 mx-2 bg-white rounded-md mt-3 font-inter shadow-md'>
            <div className='mt-3'>
                FORM -
            </div>
            <hr className="w-full mb-4 " />
            <div className='mt-3'>
                <input type="radio" name="red" value='Redesigned' onChange={handleRedesigned} className='peer/redesign' id="sell-redesign" hidden/>
                <label htmlFor="sell-redesign" className='border py-1 text-sm rounded-bl-md rounded-tl-md px-3 border-black peer-checked/redesign:border-blue-500 peer-checked/redesign:text-blue-500'> Redesigned </label>
                <input type="radio" name="red" value='Resell' onChange={handleRedesigned} className='peer/resale' id="sell-resale" hidden/>
                <label htmlFor="sell-resale" className='border py-1 text-sm rounded-br-md rounded-tr-md px-3 border-black peer-checked/resale:border-blue-500 peer-checked/resale:text-blue-500'> Resell </label>
            </div>
            <div className='mt-3 justify-between flex items-center'>
                <span>Gender : </span>
                <div className="flex">
                    <input type="radio" name="gender" value='Male' onChange={setGenderforSub} className='peer/male' id="sell-gender-male" hidden/>
                    <label htmlFor="sell-gender-male" className='border py-1 text-sm rounded-bl-md rounded-tl-md px-3 border-black peer-checked/male:border-blue-500 peer-checked/male:text-blue-500'> Male </label>
                    <input type="radio" name="gender" value='Female' onChange={setGenderforSub} className='peer/female' id="sell-gender-female" hidden/>
                    <label htmlFor="sell-gender-female" className='border py-1 text-sm rounded-br-md rounded-tr-md px-3 border-black peer-checked/female:border-blue-500 peer-checked/female:text-blue-500'> Female </label>
                </div>
            </div>
            <hr className="w-full mt-2" />
            <div className='mt-2 flex justify-between' >
                <span>Category : </span>
                <div className="flex">
                    <input type="radio" name="category" value='Clothing' onChange={setCatForSub} className='peer/clothing' id="sell-category-clothing" hidden/>
                    <label htmlFor="sell-category-clothing" className='border py-1 text-sm rounded-bl-md rounded-tl-md px-3 border-black peer-checked/clothing:border-blue-500 peer-checked/clothing:text-blue-500'> Cloths </label>
                    <input type="radio" name="category" value='FootWear' onChange={setCatForSub} className='peer/footwear' id="sell-category-footwear" hidden/>
                    <label htmlFor="sell-category-footwear" className='border py-1 text-sm px-3 border-black peer-checked/footwear:border-blue-500 peer-checked/footwear:text-blue-500'> Footwear </label>
                    <input type="radio" name="category" value='Accessories' onChange={setCatForSub} className='peer/access' id="sell-category-access" hidden/>
                    <label htmlFor="sell-category-access" className='border py-1 text-sm rounded-br-md rounded-tr-md px-3 border-black peer-checked/access:border-blue-500 peer-checked/access:text-blue-500'> Accessories </label>
                </div>
            </div>
            <hr className="w-full mt-2" />
            <div className="mt-2 flex justify-between">
                <span>Sub Category : </span>
                <select onChange={handleSetSubbCategory} name="sub-category" className='text-sm border border-black rounded-md py-1' id="">
                    {
                        subCategory.map((data,index) => {
                            return (
                                <option value={data.name} key={index}>{data.name}</option>
                            )
                        })
                    }
                </select>
            </div>
            <hr className="w-full mt-2" />
            <div class="relative mt-2 min-h-6 h-fit items-center w-full justify-between flex">
                <label className="">
                    Brand Name : 
                </label>
                <div className='h-full'>
                {
                    showBrandInput &&
                    <input
                    className="ml-1 h-full text-sm border border-black rounded-md pl-2"
                    placeholder="Enter Here"
                    id='sell-brand-name'
                    />
                }

                {
                    !showBrandInput &&
                    <input
                    className="ml-1 h-full text-sm border border-black rounded-md pl-2"
                    placeholder="Already Selected"
                    id='sell-brand-name'
                    disabled
                    />
                    
                }
                
                <span className='mx-3'>OR</span>
                {
                    (category == 'Clothing' && (
                        <select onChange={handleBrandInput} name="brand-name" className='border border-black rounded-md px-2 h-full text-sm' id="sell-brand-name-file">
                            {
                                ClothBrand.map((data,index)=>{
                                    return(
                                        <option value={data} key={index}>{data}</option>
                                    )
                                })
                            }
                        </select>
                    ))
                }
                {
                    (category == 'FootWear' && (
                        <select onChange={handleBrandInput} name="brand-name" className='border border-black rounded-md px-2 h-full text-sm' id="sell-brand-name-file">
                            {
                                ShoesBrand.map((data,index)=>{
                                    return(
                                        <option value={data} key={index}>{data}</option>
                                    )
                                })
                            }
                        </select>
                    ))
                }
                </div>     
            </div>
            <hr className="w-full mt-2" />
            <div className="mt-2 flex justify-between">
                <span>Size : </span>
                <select className='border border-black rounded-md px-2 py-1 text-sm' name="size" id="">
                    {
                        sizeArray.map((data,index)=>{
                            return(
                                <option value={data} key={index}>{data}</option>
                            )
                        })
                    }
                </select>
            </div>
            <hr className="w-full mt-2" />
            <div className="mt-2 h-6 items-center justify-between w-full min-w-[200px] flex">
                <label htmlFor="sell-age">Age: </label>
                <input type="text" name="sell-age" id="sell-age" placeholder='Enter Age' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
            </div>
            <hr className="w-full mt-2" />
            <div className="mt-2 h-6 items-center justify-between w-full min-w-[200px] flex">
                <label htmlFor="sell-link">Link: </label>
                <input type="text" name="sell-link" id="sell-link" placeholder='Enter Link' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
            </div>

            {
                !isRedesigned 
                ?
                <>
                <hr className="w-full mt-2" />
                <div className="mt-2 h-6 items-center w-full justify-between flex">
                    <label htmlFor="sell-old-price">OldPrice: </label>
                    <input type="text" name="sell-old-price" id="sell-old-price" placeholder='Enter Old Price' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
                </div>
                </>
                :
                <>
                <hr className="w-full mt-2" />
                <div className="mt-2 h-6 items-center w-full justify-between flex">
                    <label htmlFor="sell-old-price">OldPrice: </label>
                    <input disabled type="text" name="sell-old-price" id="sell-old-price" placeholder='Enter Old Price' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
                </div>
                </>
            }
            <hr className="w-full mt-2" />
            <div className="mt-2 h-6 items-center w-full justify-between flex">
                <label htmlFor="sell-new-price">Sell At : </label>
                <input type="text" name="sell-new-price" id="sell-new-price" placeholder='Enter New Price' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
            </div>
            <hr className="w-full mt-2" />
            <div className="mt-3 h-6 items-center w-full justify-between flex">
                <label htmlFor="sell-address">Address : </label>
                <input type="text" name="sell-address" id="sell-address" placeholder='Enter Address' className='h-full border border-black rounded-md ml-2 pl-2 text-sm' />
            </div>
            <div className="my-3 h-6 items-center w-full justify-between flex">
                <label htmlFor="sell-note">Note for buyer : </label>
                <textarea name="sell-note" id="sell-note" placeholder='Enter note' className='h-full border border-black rounded-md py-2 ml-2 pl-2 text-sm' />
            </div>
            
        </div>
        <div className='flex-[1] rounded-md bg-white mx-3 px-3 mt-3 h-fit'>
            <div className=' rounded-lg my-3'>
                <Dropzone onDrop={acceptedFiles => console.log(acceptedFiles)}>
                    {({getRootProps, getInputProps}) => (
                        <div className='border border-black h-fit' {...getRootProps()}>
                            <input {...getInputProps()} />
                            <img src={imgsArray[currIndex]} className='' alt="" />
                        </div>
                    )}
                </Dropzone>
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
            <button className='bg-violet-700 text-white font-montserrat text-sm py-1 px-3 rounded-md cursor-pointer my-3'>Submit</button>
            <div className="h-0 css-extra-width"></div>
        </div>
    </div>
  )
}

export default Sell