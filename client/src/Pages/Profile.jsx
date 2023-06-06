import React from 'react'
import Avatar from '../images/avatar.png'
import "bootstrap-icons/font/bootstrap-icons.css"


const Profile = () => {
  return (
    <div className='h-fit bg-white rounded-lg my-3 mx-2 mr-6 px-4'>
        <div className='flex py-3 items-center w-full max-h-20 '>
          <div className="rounded-[50%] w-fit">
            <img className='object-cover h-16 rounded-lg' src={Avatar} alt='Avatar'/>
          </div>
          <div className='font-inter font-semibold text-lg ml-4'>Username</div>
          <button className='hover:text-blue-500 transition'><i class="bi bi-pencil ml-8"></i></button>
        </div>
        <hr className='w-full'/>
        <div className='py-3'>
          <span>E-mail- </span>
          <span>abcd@xyz.com</span>
        </div>
        <hr className='w-full'/>
        <div className='py-3'>
          <span>Phone- </span>
          <span>1234567890</span>
        </div>
        <hr className='w-full'/>
        <div className='py-3'>
          <span>Address- </span>
          <span className='ml-8'>1234 Street Name, City, State 12345</span>
        </div>
        <hr className='w-full'/>
        
        

    </div>
  )
}

export default Profile