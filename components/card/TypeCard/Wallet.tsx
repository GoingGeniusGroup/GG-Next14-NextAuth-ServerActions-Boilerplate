'use client'

import { useState, useEffect, useRef } from 'react'
import Image from 'next/image'
import { usePathname } from 'next/navigation'
import QRCode from 'qrcode'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import { FaStarOfLife } from 'react-icons/fa'

export default function Wallet({ first_name, last_name, email, dob, contact, address, balance, height, width }) {
  const [imgSrc, setImgSrc] = useState('')
  const [isHidden, setIsHidden] = useState(false)
  const [isFlipped, setIsFlipped] = useState(false)
  const pathname = usePathname()
  const timeoutRef = useRef(null)

  useEffect(() => {
    QRCode.toDataURL(pathname).then(setImgSrc)
  }, [pathname])

  const toggleHidden = () => setIsHidden(!isHidden)
  const handleFlip = () => setIsFlipped(!isFlipped)

  const handleHoldStart = () => {
    timeoutRef.current = setTimeout(() => {
      setIsFlipped((prev) => !prev)
    }, 500) // Hold for 500ms to flip
  }

  const handleHoldEnd = () => {
    clearTimeout(timeoutRef.current)
  }

  return (
    <div
      className='group relative'
      style={{ height: `${height}px`, width: `${width}px` }}
      onTouchStart={handleHoldStart}
      onTouchEnd={handleHoldEnd}
      onMouseDown={handleHoldStart}
      onMouseUp={handleHoldEnd}
      onMouseLeave={handleHoldEnd}
    >
      <div
        className={`relative size-full rounded-xl shadow-md transition-all duration-500 [transform-style:preserve-3d] ${
          isFlipped ? '[transform:rotateY(180deg)]' : ''
        }`}
      >
        {/* Front of the card */}
        <div className='absolute inset-0 size-full text-white [backface-visibility:hidden]'>
          <Image
            src='/card/ljsd.png'
            alt='GID'
            fill
            sizes='(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
            priority
            className='rounded-lg object-cover'
          />
          <div className='relative inset-0 flex flex-col p-2'>
            {/* Balance and Hide/Show Button */}
            <div className='absolute right-2 top-1 flex items-center gap-x-2'>
              <div className={`font-bold ${isHidden ? 'text-gray-400' : 'text-gray-200'}`}>
                {isHidden ? balance.toString().replace(/\d/g, 'X') : balance}
              </div>
              <button type='button' aria-label='hide-unhide button' onClick={toggleHidden} className='text-gray-200'>
                {isHidden ? <FaEye /> : <FaEyeSlash />}
              </button>
            </div>

            {/* Card Details */}
            <div className='text-sm'>
              <p className='mb-1 text-gray-600'>{email || 'abc@gmail.com'}</p>
            </div>
          </div>
        </div>

        {/* Back of the card (QR Code) */}
        <div className='absolute inset-0 rounded-xl bg-black px-12 text-center text-white [backface-visibility:hidden] [transform:rotateY(180deg)]'>
          <div className='flex h-full items-center justify-center'>
            {imgSrc && <Image className='rounded-sm' alt='qr code' src={imgSrc} width={92} height={92} />}
          </div>
          <div className='absolute inset-x-4 bottom-2 flex items-center justify-between'>
            <div className='text-base font-semibold'>GOING GENIUS</div>
            <Image width={30} height={30} src='/GGlogo.png' alt='logo' />
          </div>
        </div>
      </div>
    </div>
  )
}
