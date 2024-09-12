import React from 'react'
import Card from '../_components/Card'
import background from '../../public/mixed/Rectangle.svg'

const page = () => {
    return (
        <>
            <div className='grid justify-center h-dvh w-dvw' style={{ backgroundImage: `url(${background.src})` }}>
                <Card />
            </div>
        </>
    )
}

export default page