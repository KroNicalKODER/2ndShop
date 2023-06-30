import React from 'react'
import failImg from '../images/error-cross.png'

const SellError = () => {
  return (
    <div className='flex flex-col items-center'>
      <img src={failImg} alt="IMG LOAD ERROR" className='aspect-1 w-1/3' />
      <div className='flex items-center'>
          <span className='text-xl ml-2 font-inter font-bold'>
          Some Error OCCURED...
          </span>
      </div>
      <div className='flex items-center'>
          <span className='text-xl text-green-500 ml-2 font-inter font-bold'>
          Try Logging in Again...
          </span>
      </div>

    </div>
  )
}

export default SellError