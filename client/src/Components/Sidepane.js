import React from 'react'
import "bootstrap-icons/font/bootstrap-icons.css"
import { Link, NavLink } from 'react-router-dom'

const Sidepane = () => {
    const defaultStyle = "skew-y-6 bg-white inline-flex flex-col py-11 hover:w-[80px] hover:text-blue-500 transition-all h-[50px] w-[65px] justify-center items-center";
    const activeStyle = "skew-y-6 bg-white inline-flex flex-col py-11 h-[50px] w-[80px] text-blue-500 transition-all justify-center items-center"
  return (
    <div className='fixed mt-40'>
        {/* HOME ITEMS PROFILE SELL*/}
        <div className='flex flex-col'>
            <Link to='/'>
                <button className="skew-y-6 bg-white inline-flex py-11 hover:w-[80px] hover:text-blue-500 transition-all flex-col h-[50px] w-[65px] rounded-tr-md justify-center items-center">
                    <i className="-skew-y-6 text-xl bi bi-house-door-fill"></i>
                    <span className='-skew-y-6 text-xs font-montserrat font-medium mt-2'>HOME</span>
                </button>
            </Link> 
            <NavLink to='/items' className={({isActive})=>isActive?activeStyle:defaultStyle}>
                <i className="-skew-y-6 bi bi-watch text-xl"></i>
                <span className='-skew-y-6 text-xs font-montserrat font-medium mt-2'>ITEMS</span>
            </NavLink> 
            <NavLink to='/profile' className={({isActive})=>isActive?activeStyle:defaultStyle}>
                <i className="-skew-y-6 bi bi-person-circle text-xl"></i>
                <span className='-skew-y-6 text-xs font-montserrat font-medium mt-2 '>PROFILE</span>
            </NavLink>

            <NavLink to='/sell' className={({isActive})=>isActive?activeStyle:defaultStyle}>                
                <i className="-skew-y-6 bi bi-plus-circle text-xl"></i>
                <span className='-skew-y-6 text-xs font-montserrat font-medium mt-2 '>SELL</span>
            </NavLink> 
        </div>
    </div>
  )
}

export default Sidepane