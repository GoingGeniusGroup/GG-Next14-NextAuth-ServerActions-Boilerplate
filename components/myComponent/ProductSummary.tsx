import React from 'react'
import { IoPersonCircleOutline } from "react-icons/io5";
import { TbCategory } from "react-icons/tb";

const ProductSummary = () => {
  return (
    <div className='bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-15 border border-gray-100 border-opacity-40 flex flex-col gap-y-4 p-5 w-5/12 text-white'>
      <div>
        <h2 className='capitalize text-lg'>Product Summary</h2>
      </div>
      <div className='flex justify-between'>
        <div className='flex flex-col text-center gap-y-2'>
          <div className='flex justify-center'>
          <IoPersonCircleOutline className='text-3xl text-blue-500' />
          </div>
          <div >
            <p>31</p>
            <h4>Number of Suppliers</h4>
          </div>
        </div>
        <div className='flex flex-col text-center gap-y-2'>
          <div className='flex justify-center'>
          <TbCategory className='text-3xl text-green-300' />
          </div>
          <div >
            <p>31</p>
            <h4>Number of Categories</h4>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProductSummary