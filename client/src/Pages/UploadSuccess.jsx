import React from 'react'
import succImg from '../images/uploadSuccess.png'
import checkGr from '../images/check-green.png'

const UploadSuccess = () => {
  return (
    <div className='flex flex-col items-center'>
      <img src={succImg} alt="IMG LOAD ERROR" className='aspect-1 w-1/3' />
      <div className='flex items-center'>
        <img src={checkGr} alt="IMG LOAD ERROR" className='inline-block aspect-1 w-10' />
          <span className='text-xl ml-2 font-inter font-bold'>
          YOUR REQUEST HAS BEEN SUBMITTED...
          </span> 
      </div>

    </div>
  )
}

export default UploadSuccess