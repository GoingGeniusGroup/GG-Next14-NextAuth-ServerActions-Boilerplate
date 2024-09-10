'use client'

import { CardBody, CardContainer, CardItem } from '@/components/card/card'
import Image from 'next/image'

import { useState } from 'react'

import QRCode from 'qrcode'
import { usePathname } from 'next/navigation'

export default function TicketCard() {
  // Flip Card QR
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  QRCode.toDataURL(pathname).then(setImgSrc)
  // Flip Card QR end

  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
  }
  return (
    <>
      <CardBody>
        <div className='mx-auto flex justify-center py-4'>
          {/* Event Image  */}
          <div className='group h-72 w-96 p-3 [prespective:1000px]'>
            {/* Flip the card when clicked */}
            <div
              className={`relative size-full rounded-xl shadow-md shadow-purple-500 transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
              onClick={handleFlip}
            >
              <div className='absolute inset-0'>
                <Image
                  className='rounded-lg object-cover shadow-xl shadow-black/40'
                  alt="event's picture"
                  src='/image1.png'
                  fill={true}
                />
                <div className='absolute p-5 text-white'>
                  <div className='flex justify-between'>
                    <h5 className='mb-2 text-2xl font-bold tracking-tight '>Events name</h5>
                    <Image width={50} height={50} src='/logo.png' alt='logo' />
                  </div>
                  {/* Event Details */}
                  <div className='flex flex-col text-sm text-white'>
                    <nav className='mb-1 flex list-none flex-wrap'>
                      <li className='my-2 mb-1 w-full'>
                        <p>1634 Fittro Street, Little Rock</p>
                      </li>
                      <li className='my-2 mb-5 w-full font-bold text-cyan-400'>
                        <p>Person Name</p>
                      </li>
                      <li className='my-2 mb-1 w-full'>
                        <p>25 March 2025 | 16:04</p>
                      </li>

                      <li className='my-2 mb-1 w-full'>
                        <p>QYAT67F</p>
                      </li>
                    </nav>
                  </div>
                </div>
              </div>
              <div className='absolute inset-0 flex size-full items-center rounded-lg bg-black px-12 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
                {/* <QRCodeComponent /> */}
                <Image
                  className='mx-auto rounded-xl object-cover'
                  alt='qr code'
                  src={imgSrc}
                  width={200}
                  height={200}
                />
              </div>
            </div>
          </div>
        </div>
      </CardBody>
    </>
  )
}
