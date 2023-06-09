import React, { useState } from 'react'
import ClothBrands from '../Data/ClothingCompanies.json'

const Sell = () => {

    const [oldPrice,setOldPrice] = useState(<div class="relative h-10 mt-3 w-fit min-w-[200px] flex">
                                                <input
                                                className="peer h-full w-full rounded-[7px] border border-black  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                                                placeholder=" "
                                                />
                                                <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                                                Old Price
                                                </label>
                                            </div>)

    const handleTypeChange = (e) => {
        if(e.target.value === 'Resell'){
            setOldPrice(<div class="relative h-10 mt-3 w-fit min-w-[200px] flex">
            <input
            className="peer h-full w-full rounded-[7px] border border-black  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Old Price
            </label>
    </div>)
        } else {
            setOldPrice(<div class="relative h-10 mt-3 w-fit min-w-[200px] flex">
            <input
            disabled
            className="peer h-full w-full rounded-[7px] border border-black  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
            placeholder=" "
            value='-'
            />
            <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
            Old Price
            </label>
    </div>)
        }
        
    }

  return (
    <div className='bg-white flex rounded-md py-10 px-7 my-3 w-[calc(100%-20px)]'>
        <div>
            <div>
                <label htmlFor="Category"> Category : </label>
                <select className='border border-black py-2 rounded-md' name="Category" id="">
                    <option value="Clothing">Clothing</option>
                    <option value="Footwear">Footwear</option>
                    <option value="Accessories">Accessories</option>
                </select>
            </div>
            
            

            <div className='flex mt-3 items-center'>
                <div class="relative h-10 w-fit min-w-[200px] flex">
                    <input
                    className="peer h-full w-full rounded-[7px] border border-black  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Brand Name
                    </label>
                </div>
                <div>
                    <span className="ml-4">OR</span>
                    <select className='border py-2 border-black ml-3 rounded-md ' name="brand-name-select" id="brand-name-select">
                        <option value="other">Others</option>
                        {ClothBrands.map( data => {
                            return(
                                <option value={data}>{data}</option>
                            )
                        })}
                    </select>
                </div>
            </div>
            <div className='mt-2 flex items-center'>
                <span>Size: </span>
                <div className='my-1 ml-5'>
                    <div className="flex w-fit">
                        <div className=''>
                            <input type="radio" className='peer/XS' name="size" id="XS" hidden />
                            <label for="XS" className='px-3 py-[0.10rem] border border-black peer-checked/XS:border-2 peer-checked/XS:border-blue-500 peer-checked/XS:text-blue-500'> XS </label>
                        </div>
                        <div className=''>
                            <input type="radio" className='peer/S' name="size" id="S" hidden />
                            <label for="S" className='px-3 py-[0.10rem] border border-black peer-checked/   S:border-2 peer-checked/S:border-blue-500 peer-checked/S:text-blue-500'> S </label>
                        </div>
                        <div className=''>
                            <input type="radio" className='peer/M' name="size" id="M" hidden />
                            <label for="M" className='px-3 py-[0.10rem] border border-black peer-checked/M:border-2 peer-checked/M:border-blue-500 peer-checked/M:text-blue-500'>M</label>
                        </div>
                        <div className=''>
                            <input type="radio" className='peer/L' name="size" id="L" hidden />
                            <label for="L" className='px-3 py-[0.10rem] border border-black peer-checked/L:border-2 peer-checked/L:border-blue-500 peer-checked/L:text-blue-500'>L</label>
                        </div>
                        <div className=''>
                            <input type="radio" className='peer/XL' name="size" id="XL" hidden />
                            <label for="XL" className='px-3 py-[0.10rem] border border-black peer-checked/XL:border-2 peer-checked/XL:border-blue-500 peer-checked/XL:text-blue-500'>XL</label>
                        </div>
                        <div className=''>
                            <input type="radio" className='peer/2XL' name="size" id="2XL" hidden />
                            <label for="2XL" className='px-3 py-[0.10rem] border border-black peer-checked/2XL:border-2 peer-checked/2XL:border-blue-500 peer-checked/2XL:text-blue-500'>2XL</label>
                        </div>
                        <div className=''>
                            <input type="radio" className='peer/3XL' name="size" id="3XL" hidden />
                            <label for="3XL" className='px-3 py-[0.10rem] border border-black peer-checked/3XL:border-2 peer-checked/3XL:border-blue-500 peer-checked/3XL:text-blue-500'>3XL</label>
                        </div>
                    </div>
                </div>
            </div>

            <div class="relative h-10 mt-3 w-fit min-w-[200px] flex">
                    <input
                    className="peer h-full w-full rounded-[7px] border border-black  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    Age(in months)
                    </label>
            </div>
            <div>
                <label for="type"> Type : </label>
                <select name="type" defaultValue='Resell' id="type" onChange={e=>handleTypeChange(e)} className='border border-black mt-3'>
                    <option value="Redesigned">Redesigned</option>
                    <option value="Resell" selected>Resell</option>
                </select>
            </div>
            <div>
                {oldPrice}
            </div>
            <div class="relative h-10 mt-3 w-fit min-w-[200px] flex">
                    <input
                    className="peer h-full w-full rounded-[7px] border border-black  bg-transparent px-3 py-2.5 font-sans text-sm font-normal text-blue-gray-700 outline outline-0 transition-all placeholder-shown:border placeholder-shown:border-blue-gray-200 placeholder-shown:border-t-blue-gray-200 focus:border-2 focus:border-blue-500 focus:border-t-transparent focus:outline-0 disabled:border-0 disabled:bg-blue-gray-50"
                    placeholder=" "
                    />
                    <label className="before:content[' '] after:content[' '] pointer-events-none absolute left-0 -top-1.5 flex h-full w-full select-none text-[11px] font-normal leading-tight text-blue-gray-400 transition-all before:pointer-events-none before:mt-[6.5px] before:mr-1 before:box-border before:block before:h-1.5 before:w-2.5 before:rounded-tl-md before:border-t before:border-l before:border-blue-gray-200 before:transition-all after:pointer-events-none after:mt-[6.5px] after:ml-1 after:box-border after:block after:h-1.5 after:w-2.5 after:flex-grow after:rounded-tr-md after:border-t after:border-r after:border-blue-gray-200 after:transition-all peer-placeholder-shown:text-sm peer-placeholder-shown:leading-[3.75] peer-placeholder-shown:text-blue-gray-500 peer-placeholder-shown:before:border-transparent peer-placeholder-shown:after:border-transparent peer-focus:text-[11px] peer-focus:leading-tight peer-focus:text-blue-500 peer-focus:before:border-t-2 peer-focus:before:border-l-2 peer-focus:before:border-blue-500 peer-focus:after:border-t-2 peer-focus:after:border-r-2 peer-focus:after:border-blue-500 peer-disabled:text-transparent peer-disabled:before:border-transparent peer-disabled:after:border-transparent peer-disabled:peer-placeholder-shown:text-blue-gray-500">
                    New Price
                    </label>
            </div>

        </div>
    </div>
  )
}

export default Sell