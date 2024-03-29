import React, { useState } from 'react'
import axios from 'axios'

import "bootstrap-icons/font/bootstrap-icons.css"


const Register = ({showRegister, handleCloseRegister}) => {

    const [name,setName] = useState("")
    const [password,setPassword] = useState("")
    const [address,setAddress] = useState("")
    const [phone,setPhone] = useState("")
    const [email,setEmail] = useState("")
    const [err,setErr] = useState()
    const [pincode,setPincode] = useState()
    
    const handleRegister = async(e) => {
        e.preventDefault()
        try {
            const user = await axios.post("/auth/register",{name,email,password,phone,address,pincode})
            setErr(<div className='text-xs mt-3 text-green-500 font-inter'> Registration Successfull..!!! </div>)
        } catch (error) {
            setErr(<div className='text-xs mt-3 text-red-500 font-inter'> Registration Failed..!!! </div>)
            console.log(error)
        }
    }
    const handleClose = (e) => {
        if(e.target.id === 'register-popup') handleCloseRegister()
        setErr()
    }
    if(!showRegister) {
        return null;
     }


    return (
        <div id='register-popup' onClick={handleClose} className='fixed flex justify-center items-center transition duration-1000 ease-in-out inset-0 bg-opacity-30 backdrop-blur-sm bg-black z-[100]'>
            <div className=' border rounded-lg px-24 py-10 bg-slate-100 shadow-md'>
                <div className='w-full flex flex-col'>
                    <div className='mb-3'>REGISTER</div>
                    <form className='w-full flex flex-col ring-1 ring-black'>
                        <input
                            type='text'
                            placeholder='Enter Name'
                            className='w-full px-2 py-1 '
                            onChange={e=>setName(e.target.value)}
                        />
                        <hr className="w-full" />
                        <input
                            type='text'
                            placeholder='Enter Phone Number'
                            className='w-full px-2 py-1 '
                            onChange={e=>setPhone(e.target.value)}
                        />
                        <hr className="w-full" />
                        <input
                            type='text'
                            placeholder='Enter Email'
                            className='w-full px-2 py-1 '
                            onChange={e=>setEmail(e.target.value)}
                        />
                        <hr className="w-full" />
                        <input
                            type='text'
                            placeholder='Enter Address'
                            className='w-full px-2 py-1 '
                            onChange={e=>setAddress(e.target.value)}
                        />
                        <hr className="w-full" />
                        <input
                            type='password'
                            placeholder='Enter Password'
                            className='w-full px-2 py-1 '
                            onChange={e=>setPassword(e.target.value)}
                        />
                        <input
                            type='text'
                            placeholder='Enter Pincode'
                            className='w-full px-2 py-1 '
                            onChange={e=>setPincode(e.target.value)}
                        />
                        
                        <hr className="w-full" />
                    </form>
                    
                </div>
                <div className='mt-10 flex justify-around'>
                    <button type="button"
                        className="px-6 py-2.5 bg-purple-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-purple-700 hover:shadow-lg focus:bg-purple-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-purple-800 active:shadow-lg transition duration-150 ease-in-out"
                        onClick={handleCloseRegister}
                        >

                        Close
                    </button>
                    <button type="button"
                        className="px-6 py-2.5 bg-blue-600 text-white font-medium text-xs leading-tight uppercase rounded shadow-md hover:bg-blue-700 hover:shadow-lg focus:bg-blue-700 focus:shadow-lg focus:outline-none focus:ring-0 active:bg-blue-800 active:shadow-lg transition duration-150 ease-in-out ml-10"
                        onClick={handleRegister}
                        >
                        Register
                    </button>
                </div>
                    {err}
            </div>
        </div>
    )
}

export default Register