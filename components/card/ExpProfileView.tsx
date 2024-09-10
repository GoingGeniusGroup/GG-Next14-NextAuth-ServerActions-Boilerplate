'use client'
import Image from 'next/image'
import { useState } from 'react'
import QRCode from 'qrcode'
import { MdFlipCameraAndroid } from 'react-icons/md'
import { usePathname } from 'next/navigation'

export default function ExpProfileView({ type, projectName, skills, toolsAndTech, description, handleIsFlip }) {
  // Flip Card QR
  const [imgSrc, setImgSrc] = useState('')
  const pathname = usePathname()
  QRCode.toDataURL(pathname).then(setImgSrc)
  // Flip Card QR end

  const [isFlipped, setIsFlipped] = useState(false)

  const handleFlip = () => {
    setIsFlipped(!isFlipped)
    handleIsFlip(!isFlipped)
  }
  return (
    <>
      {/* Event Image  */}
      <div className='group relative size-full'>
        {/* Flip the card when clicked */}
        <div
          className={`relative size-full rounded-xl shadow-md transition-all duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? 'z-40 [transform:rotateY(180deg)] ' : ''}`}
          onClick={handleFlip}
        >
          <Image
            unoptimized
            src='/card/abstract2.webp'
            alt='Experience'
            fill
            className='rounded-lg object-cover'
            priority
          />
          <div className='absolute top-0 flex w-full justify-end'>
            <p className='pr-3 pt-1 font-bold text-pink-300'>{type.toUpperCase()}</p>
          </div>
          <div className='absolute inset-0 cursor-default rounded-xl '>
            {/* Card Details */}
            <div className='absolute top-5 flex flex-col p-5 text-sm text-white '>
              <nav className='mb-1 flex list-none flex-wrap'>
                <ul>
                  <li className='mb-2 w-full text-xl font-semibold'>
                    <p>{projectName.toUpperCase()}</p>
                  </li>
                  <li className='my-2 mb-1 w-full'>
                    <p>Skills : {skills}</p>
                  </li>
                  <li className='my-2 mb-1 w-full'>
                    <p>Tools : {toolsAndTech}</p>
                  </li>
                </ul>
              </nav>
            </div>
            <div className='absolute bottom-2 right-2'>
              <MdFlipCameraAndroid size={24} color='white' />
            </div>
          </div>

          {/* Back */}
          <div className='absolute inset-0 rounded-lg text-center text-slate-200 [transform:rotateY(180deg)] [backface-visibility:hidden]'>
            <div className='relative size-full bg-black'>
              <div className='relative size-[90px]'>
                {imgSrc && (
                  <Image className='rounded-sm object-cover' alt='qr code' src={imgSrc} width={92} height={92} />
                )}
              </div>
              <div>{description}</div>
              <div className='absolute bottom-2 right-2'>
                <MdFlipCameraAndroid size={24} color='white' />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
