import React from 'react'
import shirt from '../images/shirt.webp'
import { Link } from 'react-router-dom'

const Card = ({props}) => {
  let inProfile = false
  let inSell = false
  let sold = false
  let inCart = false
  let size ='bg-white border w-full max-w-[16rem] border-gray-200 rounded-lg shadow my-1 dark:bg-gray-800 dark:border-gray-700'
  if(props.component === 'sell'){
    inSell = true
  }
  if(props.inCart==='true'){
    inCart = true
  }
  if(props.sold==='true'){
    sold = true
  }
  if(props.page === 'profile'){
    size = 'bg-white border w-full max-w-[15rem] border-gray-200 rounded-lg shadow my-1 dark:bg-gray-800 dark:border-gray-700'
    inProfile = true
  }
  return (
    <div className='flex flex-wrap mx-2 my-1'>
      <div className={size}>
        <div className='aspect-w-8 aspect-h-7 rounded-lg'>
          <img className="object-cover rounded-lg" src={props.images[0]} alt="product" />        
        </div>
          <div className="px-5 pb-5">
            <div className="w-full flex justify-center">
              <div className="font-montserrat text-xs mt-2 tracking-widest text-gray-600">{props.brandName}</div>
            </div>
            <div className="font-inter text-sm">The Best Shirt in the history of the world</div>
            <div className="flex justify-between">
              <div className="font-montserrat">
                <span className="text-sm text-slate-600">Size: </span>
                <span className="text-sm">{props.size} </span>
              </div>
              <div className="font-montserrat">
                <span className="text-sm text-slate-600">Age(months): </span>
                <span className="text-sm">{props.age} </span>
              </div>
            </div>
            <div className="font-montserrat">
              <span className="text-sm text-slate-600">LINK: </span>
              <span className="text-sm underline"><a href={props.orgLink}>Click Here</a> </span>
            </div>
            <div className="w-full flex flex-col items-center font-inter">
              <div className="text-red-600 text-lg line-through">Rs. {props.oldCost}</div>
              <div className="">Rs. {props.newCost}</div>
            </div>
            { 
              inProfile 
              ?
                inSell
                ?
                  sold
                  ?
                  <div className='w-full flex justify-center'>
                    <button className='text-sm font-inter px-4 py-2 rounded-lg bg-gray-200 border-2 border-gray-600'>Sold on 12-10-2013</button>
                  </div>
                  :
                  <div className='w-full flex justify-center'>
                    <button className='text-sm font-inter px-4 py-2 rounded-lg bg-gray-200 border-2 border-gray-600'>Requested on 12-10-2013</button>
                  </div>
                :
                inCart
                ?
                <Link to={"item/test"}>
                  <div className="flex mt-2 items-center justify-center">
                    <button className="text-white bg-amber-700 hover:bg-amber-800 ml-1 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-inter text-xs px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Buy Now</button>
                  </div>
                </Link>
                : 
                <div className='w-full flex justify-center'>
                  <button className='text-sm font-inter px-4 py-2 rounded-lg bg-gray-200 border-2 border-gray-600'>Bought on 12-10-2013</button>
                </div>
              :
              <div className="flex mt-2 items-center justify-center">
                <button className="text-white bg-blue-700 hover:bg-blue-800 mr-1 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-inter text-xs px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">Add to cart</button>
                <Link to={{ pathname: `/item/${props._id}/${props.type}`, state: {data:props} }}>
                  <div className="flex items-center justify-center">
                    <button 
                      className="text-white bg-amber-700 hover:bg-amber-800 ml-1 focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-lg font-inter text-xs px-3 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                        Buy Now
                    </button>
                  </div>
                </Link>
              </div>
            }
          </div>
      </div>

    </div>

  )
}

export default Card