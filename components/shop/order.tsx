"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import { ShoppingCart } from "lucide-react"
import ProductCard from "./Item"
import { productType } from "@/types/productType"

export type product = productType & {
  discountV:number,
  finalPrice:number,
  productPrice: number


}

export default function CheckoutPage({product} : {
    product: productType
}) {
 

  const [quantity, setQuantity] = useState<number>(1)





  const productPrice = product.salePrice ?? 0;
  const discount = product.discount ? product.discount : 0;

  const finalPrice =
    discount > 0
      ? (productPrice - (discount / 100) * productPrice).toFixed(2)
      : productPrice.toFixed(2);

    const finalProduct:product = {
        ...product,
        discountV: discount,
        finalPrice: parseFloat(finalPrice),
        productPrice: productPrice,
      }

      const shipping = 5.99
      const total = parseFloat(finalPrice)* quantity + shipping

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-6">Checkout</h1>
      <div className="grid md:grid-cols-2 gap-6">
      <Card>
      <CardHeader>
            <CardTitle>Shipping Address</CardTitle>
          </CardHeader>
      <div className=" pt-4">

    
          <CardContent>
            <form className="space-y-4">
              <div className="grid grid-cols-2 gap-4 ">
                <div className="space-y-2">
                  <Label htmlFor="firstName">First Name</Label>
                  <Input id="firstName" placeholder="John" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="lastName">Last Name</Label>
                  <Input id="lastName" placeholder="Doe" />
                </div>
                
              </div>
              <div className="space-y-2">
                <Label htmlFor="address">Address</Label>
                <Input id="address" placeholder="123 Main St" />
              </div>
              <div className="grid grid-cols-2 gap-4">
                <div className="space-y-2">
                  <Label htmlFor="city">City</Label>
                  <Input id="city" placeholder="New York" />
                </div>
                <div className="space-y-2">
                  <Label htmlFor="zipCode">ZIP Code</Label>
                  <Input id="zipCode" placeholder="10001" />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="country">Country</Label>
                <Input id="country" placeholder="United States" />
              </div>
            </form>
          </CardContent>
          <CardFooter>
            <Button className="w-full">Pay ${total.toFixed(2)}</Button>
          </CardFooter>
          </div>
      <h1 className="text-2xl font-bold mb-6">Packages</h1>
          <ProductCard product={finalProduct} setQuantity={setQuantity} quantity={quantity}/>
       
        </Card>

     
        <Card>
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <ShoppingCart className="h-5 w-5" />
              Order Summary
            </CardTitle>
          </CardHeader>
          <CardContent>
            
              <div className="flex justify-between items-center mb-2">
                <span> 
                  
                    {product.name}  <span className="text-sm font-bold ">  X {quantity} 
                    </span> </span>
                <span>${(parseFloat(finalPrice) * quantity).toFixed(2)}</span>
              </div>
            
            <Separator className="my-4" />
            <div className="flex justify-between items-center mb-2">
              <span>Subtotal</span>
              <span>${(parseFloat(finalPrice)* quantity).toFixed(2)}</span>
            </div>
            <div className="flex justify-between items-center mb-2">
              <span>Shipping</span>
              <span>${shipping.toFixed(2)}</span>
            </div>
            <Separator className="my-4" />
            <div className="flex justify-between items-center font-bold">
              <span>Total</span>
              <span>${total.toFixed(2)}</span>
            </div>
          </CardContent>
        </Card>
    

      
      </div>
    </div>
  )
}