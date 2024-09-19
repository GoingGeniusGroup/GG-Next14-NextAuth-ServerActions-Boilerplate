import React from 'react'
// import Card from '../../components/myComponent/Card'
import background from '../../public/mixed/Rectangle.svg'
// import ProductCards from '../../components/myComponent/ProductCards'
import AddToCart from '@/components/myComponent/AddToCart'

const page = () => {
    return (
        <>
            <div className='grid justify-center min-h-dvh w-dvw' style={{ backgroundImage: `url(${background.src})` }}>
               <AddToCart />
            </div>
        </>
    )
}

export default page