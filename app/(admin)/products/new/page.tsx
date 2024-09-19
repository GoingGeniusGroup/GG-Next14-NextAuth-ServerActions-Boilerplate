
import { Suspense } from 'react'
import { ProductFormWrapper } from './ProductFormWrapper'


export default function NewProductPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductFormWrapper />
    </Suspense>
  )
}
