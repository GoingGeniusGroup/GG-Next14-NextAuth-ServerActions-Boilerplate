'use client'

import { useRef, useState } from 'react'

const TagSwiper = ({ facultyTags, handleInputTagsChange }) => {
  const scrollRef = useRef(null)
  const [isDragging, setIsDragging] = useState(false)
  const [startX, setStartX] = useState(0)
  const [scrollLeft, setScrollLeft] = useState(0)

  const handleMouseDown = (e) => {
    setIsDragging(true)
    setStartX(e.pageX - scrollRef.current.offsetLeft)
    setScrollLeft(scrollRef.current.scrollLeft)
  }

  const handleMouseLeave = () => {
    setIsDragging(false)
  }

  const handleMouseUp = () => {
    setIsDragging(false)
  }

  const handleMouseMove = (e) => {
    if (!isDragging) return
    e.preventDefault()
    const x = e.pageX - scrollRef.current.offsetLeft
    const walk = (x - startX) * 2
    scrollRef.current.scrollLeft = scrollLeft - walk
  }

  return (
    <div
      className='w-full overflow-x-scroll cursor-grab'
      style={{
        scrollbarWidth: 'none', // Firefox
        msOverflowStyle: 'none', // Internet Explorer 10+
      }}
      ref={scrollRef}
      onMouseDown={handleMouseDown}
      onMouseLeave={handleMouseLeave}
      onMouseUp={handleMouseUp}
      onMouseMove={handleMouseMove}
    >
      <style jsx>{`
        div::-webkit-scrollbar {
          display: none; // Safari and Chrome
        }
      `}</style>
      <div className='flex gap-x-3 py-2 whitespace-nowrap'>
        {facultyTags
          ? facultyTags.map((tag, index) => (
              <button
                key={index}
                className='px-3 py-1 text-sm font-medium text-gray-700 bg-gray-100 rounded-full hover:bg-gray-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500'
                onClick={() => handleInputTagsChange(tag)}
              >
                {tag}
              </button>
            ))
          : ''}
      </div>
    </div>
  )
}

export default TagSwiper
