import CheckoutPage from '@/components/shop/order'
import { getAproduct } from '@/services/product'
import { productType } from '@/types/productType'
import React from 'react'

const page = async ({params} : {
    params:{
        id:string
    }
}) => {

  const product: productType= await getAproduct(params.id)
  return (
    <div>
        <CheckoutPage product ={ product} />
      
    </div>
  )
}

export default page
