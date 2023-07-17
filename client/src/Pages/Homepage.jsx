import React, { useEffect, useState } from 'react'
import Sell from '../Data/Sell.json'
import "bootstrap-icons/font/bootstrap-icons.css"
import './Homepage.css'
import Card from '../Components/Card'
import axios, { all } from 'axios'
import Select from "react-select";



const Homepage = () => {

    const [allItems, setAllItems] = useState([])
    const [filteredItems, setFilteredItems] = useState([])
    const [skip, setSkip] = useState(0)
    const [isEnd, setIsEnd] = useState(false)
    const [availableFilters, setAvailableFilters] = useState({
        gender: [],
        category: [],
        subCategory: [],
        brandName: [],
        sizee: []
    })

    const [filters, setFilters] = useState({
        gender: 'Select',
        category: 'Select',
        subCategory: 'Select',
        age: 10000000,
        brandName: 'Select',
        sizee: 'Select',
        startPrice: 0,
        endPrice: 10000000,
    })
    const populateAvailableFilters = () => {
        const updatedFilters = {
            gender: [...new Set(allItems.map(item => item.gender))],
            category: [...new Set(allItems.map(item => item.type))],
            subCategory: [...new Set(allItems.map(item => item.subCategory))],
            brandName: [...new Set(allItems.map(item => item.brandName))],
            sizee: [...new Set(allItems.map(item => item.size))],
        };
        console.log(allItems)
        setAvailableFilters(updatedFilters);
    };
    useEffect(() => {
        populateAvailableFilters()
        // console.log(availableFilters)
    },
        [filters, skip, allItems])
    function applyFilters() {
        return allItems.filter(item => {
            // Gender filter
            if (filters.gender !== 'Select' && item.gender !== filters.gender) {
                return false;
            }

            // Category filter
            if (filters.category !== 'Select' && item.category !== filters.category) {
                return false;
            }

            // Subcategory filter
            if (filters.subCategory !== 'Select' && item.subCategory !== filters.subCategory) {
                return false;
            }

            // Age filter
            if (item.age > filters.age) {
                return false;
            }

            // Brand filter
            if (filters.brandName !== 'Select' && item.brandName !== filters.brandName) {
                return false
            }

            //Size filter
            if (filters.sizee !== 'Select' && item.size !== filters.sizee) {
                return false
            }

            // Price range filter
            if (item.newCost < Number(filters.startPrice) || item.newCost > Number(filters.endPrice)) {
                return false;
            }

            // All filters passed
            return true;
        });
    }

    const handleFilterChange = (event) => {
        const { name, value } = event.target;
        if(name==='age' && value===''){
            value = '10000000'
        }
        if(name==='startPrice' && value===''){
            value = '0'
        }
        if(name==='endPrice' && value===''){
            value = '1000000000'
        }
        // For single-select filters, update the filter value directly
        setFilters(prevFilters => ({
            ...prevFilters,
            [name]: value
        }));


    };

    const [goodType, setGoodType] = useState('resale')
    const [gender, setGender] = useState('Male')

    const fetchItems = async (skip) => {
        try {
            await axios.get(`/item?skip=${skip}`)
                .then((response) => {
                    if (response.data.data?.length === 0) {
                        setIsEnd(true)
                        return
                    }
                    setAllItems([...allItems, ...response.data.data])
                })
                .catch((error) => {
                    console.log(error)
                })
        } catch (error) {
            console.log(error)
        }

    }

    useEffect(() => {
        fetchItems(skip)
    }, [skip])

    useEffect(() => {
        setFilteredItems(allItems)
        setFilteredItems(applyFilters())
        console.log(filters)
    }, [filters, allItems])

    const handleScroll = (e) => {
        const { offsetHeight, scrollTop, scrollHeight } = e.target;

        if (offsetHeight + scrollTop >= scrollHeight) {
            setSkip(skip + 10);
        }
    }

    return (
        <div className='flex flex-col'>
            {/* <div className="fixed cursor-pointer flex justify-center items-center z-[10] rounded-[50%] mt-[80vh] self-baseline w-[50px] h-[50px] bg-blue-400"><i className='bi text-white bi-arrow-up'/></div> */}
            <div className='flex mr-12 css-query font-inter text-sm'>
                <div className='flex-[1] bg-white w-fit px-8 ml-4 py-4 mt-5 rounded-md shadow-md'>
                    <div className='flex items-center'>
                        <div className='font-ubuntu text-lg font-bold mb-2 flex items-center text-gray-700'>Filters <i className='text-sm ml-2 bi-filter bi'></i></div>
                    </div>
                    <div className='mt-3 justify-between flex items-center'>
                        <span>Gender : </span>
                        <div className="flex">
                            <input type="radio" name="gender" value='Male' onChange={e => handleFilterChange(e)} className='peer/male' id="sell-gender-male" hidden />
                            <label htmlFor="sell-gender-male" className='border py-1 text-sm rounded-bl-md rounded-tl-md px-3 border-black peer-checked/male:border-blue-500 peer-checked/male:text-blue-500'> Male </label>
                            <input type="radio" name="gender" value='Female' onChange={e => handleFilterChange(e)} className='peer/female' id="sell-gender-female" hidden />
                            <label htmlFor="sell-gender-female" className='border py-1 text-sm px-3 border-black peer-checked/female:border-blue-500 peer-checked/female:text-blue-500'> Female </label>
                            <input type="radio" name="gender" value='Select' onChange={e => handleFilterChange(e)} className='peer/select' id="sell-gender-select" hidden />
                            <label htmlFor="sell-gender-select" className='border py-1 text-sm rounded-br-md rounded-tr-md px-3 border-black peer-checked/select:border-blue-500 peer-checked/select:text-blue-500'> Select </label>
                        </div>
                    </div>
                    <hr className="w-full mt-2" />
                    <div className='mt-3 justify-between flex items-center'>
                        <span>Sub-Category</span>
                        <select name="subCategory" className='border border-black rounded-md px-2 py-1' id="">
                            <option value="Select">Select</option>
                            {availableFilters.subCategory.map(item => (
                                <option key={item} value={item}>
                                    {item}
                                 </option>
                            ))}
                        </select>
                    </div>
                    <hr className="w-full mt-2" />
                    <div className='flex mt-3 justify-between css-query-wrap'>
                        <div className='flex py-1 px-2 shadow-sm rounded-md'>
                            <div className=''>
                                <label htmlFor="sizee"> Size: </label>
                                {/* {JSON.stringify(availableFilters)} */}
                                <select name="sizee" onChange={handleFilterChange}>
                                    <option key='select' value='Select'>Select</option>
                                    {availableFilters.sizee.map(item => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>

                            </div>
                        </div>
                        <div className='py-1 px-2 shadow-sm css-query-margin'>
                            <label for='category'>Category: </label>
                            <select name="category" className='border border-black px-2 py-1 rounded-md' id="" onChange={handleFilterChange}>
                                <option key='select' value='Select'>Select</option>
                                {availableFilters.category.map(item => (
                                    <option key={item} value={item}>
                                        {item}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <hr className="w-full mt-2" />

                    <div className='flex mt-3 justify-between css-query-wrap'>
                        <div className=' py-1 px-2 shadow-sm'>
                            <div className='flex justify-between'>
                                <label for='brandName'>Brands: </label>
                                <select name="brandName" className='ml-5 border border-black rounded-md' id="" onChange={handleFilterChange}>
                                    <option key='select' value='Select'>Select</option>
                                    {availableFilters.brandName.map(item => (
                                        <option key={item} value={item}>
                                            {item}
                                        </option>
                                    ))}
                                </select>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <label htmlFor="age">Age: </label>
                                <input type="number" placeholder='Age(months)' name="age" onChange={handleFilterChange} className='border pl-1 w-20 border-black rounded-md' id="" />
                            </div>
                        </div>
                        <div className='py-1 px-2 shadow-sm css-query-margin'>
                            <div className='flex justify-between'>
                                <label htmlFor="startPrice " className='whitespace-nowrap'>Min-Price : </label>
                                <input type="number" className='border px-1 ml-1 border-black rounded-md' name="startPrice" id="" onChange={handleFilterChange} placeholder='Min Price'/>
                            </div>
                            <div className='flex justify-between mt-3'>
                                <label htmlFor="endPrice" className='whitespace-nowrap'>Max-Price : </label>
                                <input type="number" className='border px-1 ml-1 border-black rounded-md' name="endPrice" id="" onChange={handleFilterChange} placeholder='Max Price' />
                            </div>

                        </div>
                    </div>
                    <hr className="w-full mt-2" />
                </div>
                <div className='flex-[1] bg-white w-fit px-8 ml-4 py-4 mt-5 rounded-md shadow-md'>
                    <div className='font-ubuntu text-lg font-bold mb-2 flex items-center text-gray-700'>Select Goods<i className='text-sm ml-2 bi-bag-fill bi'></i></div>
                    <ul class="flex flex-col">
                        <li onClick={() => setGoodType('redesign')}>
                            <input type="radio" id="redesign" name="hosting" value="redesign" class="hidden peer" required />
                            <label for="redesign" className="transition-all flex-col inline-flex p-5 text-gray-500 bg-white border border-gray-200 rounded-t-md cursor-pointer dark:hover:text-gray-300 dark:border-gray-700 dark:peer-checked:text-blue-500 peer-checked:border-blue-600 peer-checked:text-blue-600 hover:text-gray-600 hover:bg-gray-100 dark:text-gray-400 dark:bg-gray-800 dark:hover:bg-gray-700">
                                <span className='font-inter font-normal text-black'>Fashion Redesign</span>
                                <span className='font-inter text-sm'>Buy Redesigned Accessories By Designers accross globe.</span>
                            </label>
                        </li>
                        <li onClick={() => setGoodType('resale')}>
                            <input type="radio" id="resale" name="hosting" value="resale" class="hidden peer" checked />
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
                    (filteredItems.length > 0) &&
                    (filteredItems.map((item) => (
                        <Card key={item._id} props={item} />
                    )))
                }
            </div>
            {isEnd && <div className='text-xs text-green-600'> You had reached the end</div>}
        </div>
    )
}

export default Homepage