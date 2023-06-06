import React from 'react'
import Card from '../Components/Card'

const Items = () => {
  return (
    <div>
        <div className='py-3'>
          <div className='flex justify-between mr-6'>
            <div className='font-ubuntu'>Items In Cart</div>
            <div className='text-xs underline'>See All</div>
          </div>
          <div className="flex flex-wrap">
            <Card inCart='true' page='profile'/>
            <Card inCart='true' page='profile'/>
            <Card inCart='true' page='profile'/>
            <Card inCart='true' page='profile'/>
          </div>
        </div>
        <hr className='w-full'/>
        <div className='py-3'>
          <div className='flex justify-between mr-6'>
            <div className='font-ubuntu'>Items Requested</div>
            <div className='text-xs underline'>See All</div>
          </div>
          <div className="flex flex-wrap">
            <Card page='profile' component='sell' />
            <Card page='profile' component='sell' />
            <Card page='profile' component='sell' />
            <Card page='profile' component='sell'/>
          </div>
        </div>
        
        <hr className='w-full'/>
        <div className='py-3'>
          <div className='flex justify-between mr-6'>
            <div className='font-ubuntu'>Items Sold</div>
            <div className='text-xs underline'>See All</div>
          </div>
          <div className="flex flex-wrap">
            <Card page='profile' component='sell' sold='true'/>
            <Card page='profile' component='sell' sold='true'/>
            <Card page='profile' component='sell' sold='true'/>
            <Card page='profile' component='sell' sold='true'/>
          </div>
        </div>
        <hr className='w-full'/>
        <div className='py-3'>
          <div className='flex justify-between mr-6'>
            <div className='font-ubuntu'>Items Bought</div>
            <div className='text-xs underline'>See All</div>
          </div>
          <div className="flex flex-wrap ">
            <Card page='profile'/>
            <Card page='profile'/>
            <Card page='profile'/>
            <Card page='profile'/>
          </div>
        </div>
    </div>
  )
}

export default Items