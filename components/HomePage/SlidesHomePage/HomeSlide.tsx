import Link from 'next/link'

const HomeSlide = () => {
  return (
    <>
      <div
        className='size-full lg:ml-auto lg:w-[50%]'
        style={{
          backgroundImage: 'url(../../../public/homepage/image.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          backgroundRepeat: 'no-repeat',
        }}
      ></div>
      <div className='absolute inset-0 flex flex-col items-center justify-center'>
        <div className='w-[800px]'>
          <h1 className='text-center text-2xl font-bold leading-10 text-white lg:text-6xl'>
            One Genius ID for every
            <br />
            <p className='mt-4'>Genius Tech</p>
          </h1>
          <p className='mt-10 text-center text-sm text-white lg:text-2xl'>
            Keep all your Genius Services secured with 1 Genius ID <br /> Developer Features Coming Soon
          </p>
          <div className='flex justify-center'>
            <Link
              className='relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 '
              href='/hud'
              aria-label='get started button'
            >
              Get Started
              <div className='absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300'></div>
            </Link>
          </div>
        </div>
      </div>
    </>
  )
}

export default HomeSlide
