import React, { useState }     from 'react'
import logo from '../images/logo.png'
import Login from './Login'
import Register from './Register'

const Navbar = () => {
  const [showLogin, setShowLogin] = useState(false)
  const [showRegister, setShowRegister] = useState(false)
  const handleCloseRegister=()=>{
    setShowRegister(false)
  }
  const handleClose = () => {
    setShowLogin(false);
  }
  return (
    <div className='max-h-20 flex items-center justify-between shadow-md py-3 rounded-md px-5 bg-white'>
        <img src={logo} alt="logo" className='max-h-9'/>
        <div className='flex items-center space-x-4 flex-col'>
            <span className='font-inter font-bold text-lg tracking-[0.4rem]'>SHARING SMILES</span>
        </div>
        <div className='btns flex items-center font-inter font-semibold text-sm'>
            <button onClick={()=>setShowLogin(true)} className='mx-2 rounded-md border-2 px-4 py-1 border-black transition duration-200 hover:bg-black hover:text-white'>Login</button>
            <span className=''>OR</span>
            <button onClick={()=>setShowRegister(true)} className='mx-2 rounded-md border-2 px-4 py-1 border-black transition duration-200 hover:bg-black hover:text-white'>Register</button>
        </div>
        <Login show={showLogin} handleCloseLogin = {handleClose}/>
        <Register showRegister={showRegister} handleCloseRegister = {handleCloseRegister}/>
    </div>
  )
}

export default Navbar