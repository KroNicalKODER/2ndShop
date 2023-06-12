import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom';
import "bootstrap-icons/font/bootstrap-icons.css"

const SidepaneMob = () => {
    const [showpane,setShowpane] = useState(false)
    const defaultStyle = " bg-white inline-flex flex-col py-11 hover:w-[80px] hover:text-blue-500 transition-all h-[50px] w-[65px] justify-center items-center";
    const activeStyle = " bg-white inline-flex flex-col py-11 h-[50px] w-[80px] text-blue-500 transition-all justify-center items-center"
    
    if(showpane)
  return (
    
    <div className='fixed transition-all z-[1000] flex justify-center mt-[calc(100vh-5rem-30px)] w-full'>
        <div className='w-fit bg-white h-full shadow-md border-2 border-blue-600 px-2'>
        <Link to='/'>
                <button className=" bg-white inline-flex hover:w-[80px] hover:text-blue-500 transition-all flex-col h-[50px] w-[65px] rounded-tr-md justify-center items-center">
                    <i className=" text-xl bi bi-house-door-fill"></i>
                    <span className=' text-xs font-montserrat font-medium mt-1'>HOME</span>
                </button>
            </Link> 
            <NavLink to='/items' className={({isActive})=>isActive?activeStyle:defaultStyle}>
                <i className=" bi bi-watch text-xl"></i>
                <span className=' text-xs font-montserrat font-medium mt-2'>ITEMS</span>
            </NavLink> 
            <NavLink to='/profile' className={({isActive})=>isActive?activeStyle:defaultStyle}>
                <i className=" bi bi-person-circle text-xl"></i>
                <span className=' text-xs font-montserrat font-medium mt-2 '>PROFILE</span>
            </NavLink>

            <NavLink to='/sell' className={({isActive})=>isActive?activeStyle:defaultStyle}>                
                <i className=" bi bi-plus-circle text-xl"></i>
                <span className=' text-xs font-montserrat font-medium mt-2 '>SELL</span>
            </NavLink>
            <button onClick={()=>setShowpane(false)} className={defaultStyle}>
                <i class="bi bi-x-circle"></i>
                <span className=' text-xs font-montserrat font-medium mt-2 '>Close</span>

            </button>
        </div>
    </div>
  )
  else{
    return (
        <div className='fixed transition-all z-[1000] flex justify-end mt-[calc(100vh-5rem-30px)] w-full'>
            <button
                className='rounded-[50%] px-3 bg-blue-800 text-white h-fit py-2 mr-4'
                onClick={()=>setShowpane(true)}
                >
                <i class="bi bi-list"></i>
            </button>
        </div>
    )
  }
}

export default SidepaneMob