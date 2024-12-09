import { auth } from '@/auth'
import QRPage from '@/components/comp/qr/qr-page'
import React from 'react'

const page = async() => {
    const session = await auth()
    console.log('====================================');
    console.log(session);
    console.log('====================================');
  return (
    <div>
      <QRPage/>
    </div>
  )
}

export default page
