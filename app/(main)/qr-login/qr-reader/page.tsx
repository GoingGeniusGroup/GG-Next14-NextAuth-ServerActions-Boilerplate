import { auth } from '@/auth'
import QrReader from '@/components/comp/qr/qr-reader'
import React from 'react'

const page = async() => {
  const session = await auth()
  return (
    <div>
        <QrReader session={session!}/>
      
    </div>
  )
}

export default page
