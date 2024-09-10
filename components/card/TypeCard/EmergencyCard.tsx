import Image from 'next/image'

export default function EmergencyCard({
  type,
  isFlipped,
  handleFlip,
  user,
  name,
  blood_group,
  emergency_contact,
  emergency_details,
  emergency_address,
  imgSrc,
}) {
  return (
    <>
      <div
        className={`relative size-full rounded-xl shadow-md transition-all  duration-500 [transform-style:preserve-3d] 
            ${isFlipped ? '[transform:rotateY(180deg)]' : ''}`}
        onClick={handleFlip}
      >
        {/* Card Front */}

        <Image unoptimized src='/card/redcard.png' alt='Card Front' fill className='rounded-lg object-cover' />
        <div className='absolute top-0 flex w-full justify-end'>
          <p className='bg-gradient-to-r from-red-500 to-white bg-clip-text pr-2 font-bold text-transparent drop-shadow-sm'>
            {type.toUpperCase()}
          </p>
        </div>
        <div className='absolute inset-0 cursor-default rounded-xl '>
          {/* Card Details */}
          <div className='absolute top-5 flex flex-col p-5 text-sm text-white'>
            <nav className='mb-1 flex list-none flex-wrap'>
              <ul className='mb-2 w-full text-xl font-semibold'>
                {user != null ? (
                  user.first_name != null && user.last_name != null ? (
                    <li>{user.first_name.toUpperCase() + ' ' + user.last_name.toUpperCase()}</li>
                  ) : (
                    <li>PERSON NAME</li>
                  )
                ) : (
                  <li>PERSON NAME</li>
                )}
              </ul>
              <ul>
                <li className='my-2 mb-1 w-full'>{name}</li>
              </ul>
              <div className='flex w-full justify-between'>
                <ul>
                  <li className='my-2 mb-1 w-full'>Blood Group : {blood_group}</li>
                  <li className='my-2 mb-1 w-full'>Emergency Contact : {emergency_contact}</li>
                </ul>
              </div>
            </nav>
          </div>
        </div>
        <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
          <div className='text-base font-bold text-gray-200 dark:text-violet-400'>GOING GENIUS</div>
          <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
        </div>

        {/* QRCode */}
        <div className='absolute inset-0 rounded-lg bg-black px-12 py-8 text-center text-slate-200 [backface-visibility:hidden] [transform:rotateY(180deg)]'>
          <div className='flex items-center justify-between'>
            <ul className='flex w-[60%] flex-col justify-start'>
              <li className='font-semibold text-gray-200 dark:text-violet-400'>Details</li>
              <li className='flex-wrap break-words'>{emergency_details}</li>

              <li className='font-semibold text-gray-200 dark:text-violet-400'>Emergency Address</li>
              <li className='flex-wrap break-words'> {emergency_address}</li>
            </ul>

            {imgSrc && (
              <Image className='mb-4 rounded-sm object-cover' alt='qr code' src={imgSrc} width={92} height={92} />
            )}
          </div>
          <div className='absolute bottom-2 left-4 flex w-full items-center justify-between'>
            <div className='text-base font-bold text-gray-200 dark:text-purple-600'>GOING GENIUS</div>
            <Image className='mr-5 mt-1' width={30} height={30} src='/GGlogo.png' alt='logo' />
          </div>
        </div>
      </div>
    </>
  )
}
