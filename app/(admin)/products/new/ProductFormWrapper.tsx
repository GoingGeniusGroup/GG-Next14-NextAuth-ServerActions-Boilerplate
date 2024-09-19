'use client'

import { useSession } from 'next-auth/react'

import ProductForm from '@/components/Product/ProductForm'
import { Spinner } from '@/components/ui/Spinner'
import { useRouter } from 'next/navigation'

export function ProductFormWrapper() {
  const { data: session, status } = useSession()
  const router = useRouter()

  if (status === 'loading') {
    return <Spinner />
  }

  if (status === 'unauthenticated') {
    router.push('/login')
    return null
  }

  return <ProductForm />
}