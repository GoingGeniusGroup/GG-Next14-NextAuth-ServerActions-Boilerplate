import React, { ReactNode } from 'react'

const PageHeader = ({children}:{ children :ReactNode}) => {
  return (
    <h1 className="text-xl font-bold mb-6">{children}</h1>
  )
}

export default PageHeader
