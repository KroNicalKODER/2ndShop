import React, { useEffect, useState } from 'react'
import Card from '../Components/Card'
import axios from 'axios'

const Items = () => {

  const [cartItems,setCartItems] = useState([])

  const fetchCartItems = async() => {
    await axios.get('/user/cart')
    .then((res)=>{
      setCartItems(res.data)
    })
    .catch((err)=> {
      console.log(err)
    })
  }

  useEffect(()=>{
    fetchCartItems()
  },cartItems)
  return (
    <div>
        <div className='bg-white mt-4 px-4 py-4 shadow-md rounded-md mr-4'>
          <h1 className='font-ubuntu font-bold text-2xl'>CART</h1>
          {
            cartItems.length==0 && <div>Loading...</div>
          }
          <div className='flex flex-wrap'>

          {
            cartItems.length>0 &&
            
            (cartItems.map((item)=>(
              <Card key={item._id} props={{...item,inCart: 'true'}} />
              )))
            }
            
          </div>
        </div>
    </div>
  )
}

export default Items