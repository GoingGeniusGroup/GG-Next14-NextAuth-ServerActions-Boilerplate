"use client"
import { useState } from 'react'
import Image from 'next/image'
import { Minus, Plus } from 'lucide-react'
import { Button } from "@/components/ui/button"
import { Card } from "@/components/ui/card"
import { productType } from '@/types/productType'

export default function ProductCard({ product} : {
    product: productType
}
) {
  const [quantity, setQuantity] = useState(1)

  const incrementQuantity = () => setQuantity(prev => prev + 1)
  const decrementQuantity = () => setQuantity(prev => Math.max(1, prev - 1))
  const productPrice = product.salePrice ?? 0;
  const discount = product.discount ? product.discount : 0;

  const finalPrice =
    discount > 0
      ? (productPrice - (discount / 100) * productPrice).toFixed(2)
      : productPrice.toFixed(2);

  return (
    <Card className="p-4 shadow-sm  ">
      <div className="flex items-start space-x-4">
        <div className="flex-shrink-0">
          <Image
            src={product.image ? product.image : "/placeholder.svg"}
            alt="Product Image"
            width={80}
            height={80}
            className="rounded-lg object-cover"
          />
        </div>
        <div className="flex-grow">
          <div className="flex justify-between items-start">
            <div>
              <h3 className="text-lg font-semibold text-gray-900">{ product.name}</h3>
              <p className="mt-1 text-sm text-gray-500">
                    {product.description}
              </p>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-gray-900">${discount> 0 ?finalPrice:productPrice  }</div>
              { discount > 0 && <div className={`text-sm text-gray-500 ${discount> 0 ?'line-through':''}`}>${productPrice}</div>}
              <div className="text-sm font-medium text-green-600">{discount}% OFF</div>
            </div>
          </div>
          <div className="mt-4 flex justify-between items-center">
            <div className="text-sm text-gray-600">In stock</div>
            <div className="flex items-center space-x-2">
              <Button
                variant="outline"
                size="icon"
                onClick={decrementQuantity}
                aria-label="Decrease quantity"
              >
                <Minus className="h-4 w-4" />
              </Button>
              <span className="text-lg font-medium w-8 text-center">{quantity}</span>
              <Button
                variant="outline"
                size="icon"
                onClick={incrementQuantity}
                aria-label="Increase quantity"
              >
                <Plus className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </div>
    </Card>
  )
}