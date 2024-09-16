'use client'
import Image from 'next/image'
import React from 'react'
import Button from './Button'

function ProductCards() {
  return (
    <div className='w-[32rem] h-[22rem] mt-10 flex border'>
      <div className='h-full flex-[50%]'>
        <Image src='' alt='12' />
      </div>
      <div className='flex flex-col border h-full flex-[50%] gap-2'>
        <div className='flex flex-col border p-5'>
          <h3 className='text-[1.4rem]'>title</h3>
          <h4 className='text-[1rem]'>sub title</h4>
          <p className='text-sm'>Lorem ipsum dolor sit amet consectetur adipisicing elit. Nostrum natus fuga enim, odio facilis obcaecati recusandae tempora porro perspiciatis dolor ratione dolorum in omnis pariatur quae quo. Laboriosam, quibusdam necessitatibus</p>
        </div>
        <div className='flex item-center  gap-5 border p-5'>
          <p>price</p>
          {/* <Button >buy now</Button> */}
        </div>
      </div>
    </div>
  )
}

export default ProductCards
