import React from 'react'
import Card from '../../components/myComponent/Card'
import background from '../../public/mixed/Rectangle.svg'
import ProductCards from '../../components/myComponent/ProductCards'

const page = () => {
    return (
        <>
            <div className='grid justify-center h-dvh w-dvw' style={{ backgroundImage: `url(${background.src})` }}>
                <Card />
                <ProductCards />
            </div>
        </>
    )
}

export default page