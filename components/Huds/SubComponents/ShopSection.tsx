"use client";

import React, { useState } from "react";
import { ShoppingCart, X, Plus, Minus } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import {
  Sheet,
  SheetContent,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetDescription,
} from "@/components/ui/sheet";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import { z } from "zod";
import Image from "next/image";

// Zod schemas
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
});

const CartItemSchema = ProductSchema.extend({
  quantity: z.number(),
});

type Product = z.infer<typeof ProductSchema>;
type CartItem = z.infer<typeof CartItemSchema>;

// Mock data for products
const products: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 19.99,
    image: "/placeholder.svg",
    category: "Clothing",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 49.99,
    image: "/placeholder.svg",
    category: "Clothing",
  },
  {
    id: 3,
    name: "Sneakers",
    price: 79.99,
    image: "/placeholder.svg",
    category: "Shoes",
  },
  {
    id: 4,
    name: "Hoodie",
    price: 39.99,
    image: "/placeholder.svg",
    category: "Clothing",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 29.99,
    image: "/placeholder.svg",
    category: "Accessories",
  },
];

const categories = ["All", "Clothing", "Shoes", "Accessories"];

export default function ShopSection() {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");

  const addToCart = (productId: number) => {
    setCart((prevCart) => ({
      ...prevCart,
      [productId]: (prevCart[productId] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: number) => {
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[productId] > 1) {
        newCart[productId]--;
      } else {
        delete newCart[productId];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const cartItems: CartItem[] = Object.entries(cart).map(([id, quantity]) => {
    const product = products.find((p) => p.id === parseInt(id));
    return CartItemSchema.parse({ ...product, quantity });
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  return (
    <div className="container mx-auto px-4 py-6 sm:py-8">
      <header className="relative flex items-center mb-8">
        <nav className="mb-0 w-full sm:w-auto">
          <ScrollArea className="w-full">
            <div className="flex space-x-2 sm:space-x-4 pb-2 sm:pb-0">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  className="text-sm sm:text-base whitespace-nowrap"
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </nav>
        <div className="absolute -top-8 -right-4">
          <div
            className="relative cursor-pointer"
            onClick={() => setIsCartOpen(true)}
          >
            <ShoppingCart className="w-6 h-6" />
            {totalItems > 0 && (
              <Badge variant="destructive" className="absolute -top-2 -right-2">
                {totalItems}
              </Badge>
            )}
          </div>
        </div>
      </header>

      <main>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg overflow-hidden shadow-lg"
            >
              <div className="relative overflow-hidden sm:h-48 h-40">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                />
              </div>
              <div className="p-3 sm:p-4">
                <h3 className="font-semibold text-sm sm:text-base mb-1 sm:mb-2 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs sm:text-sm mb-2 sm:mb-3">
                  ${product.price.toFixed(2)}
                </p>
                <Button
                  onClick={() => addToCart(product.id)}
                  className="w-full text-xs sm:text-sm"
                  size="sm"
                >
                  Add to Cart
                  {cart[product.id] && (
                    <Badge variant="secondary" className="ml-2">
                      {cart[product.id]}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
      </main>

      {/* Cart sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent className="w-full sm:max-w-lg">
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review your items, adjust quantities, or proceed to checkout.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea className="flex-grow mt-4 h-[calc(100vh-200px)]">
            {cartItems.length === 0 ? (
              <p className="text-center text-gray-500">Your cart is empty.</p>
            ) : (
              <div className="space-y-4">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <Image
                      src={item.image}
                      alt={item.name}
                      width={64}
                      height={64}
                      className="object-cover rounded"
                    />
                    <div className="flex-grow">
                      <h4 className="font-semibold">{item.name}</h4>
                      <p className="text-sm text-gray-500">
                        ${item.price.toFixed(2)} x {item.quantity}
                      </p>
                      <p className="text-sm font-semibold">
                        Total: ${(item.price * item.quantity).toFixed(2)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => removeFromCart(item.id)}
                        aria-label={`Decrease quantity of ${item.name}`}
                      >
                        <Minus className="h-4 w-4" />
                      </Button>
                      <span className="w-8 text-center">{item.quantity}</span>
                      <Button
                        size="icon"
                        variant="outline"
                        onClick={() => addToCart(item.id)}
                        aria-label={`Increase quantity of ${item.name}`}
                      >
                        <Plus className="h-4 w-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </ScrollArea>
          <SheetFooter className="mt-4">
            <div className="w-full">
              <div className="flex justify-between items-center mb-4">
                <span className="font-semibold">Total:</span>
                <span className="font-semibold text-lg">
                  ${totalPrice.toFixed(2)}
                </span>
              </div>
              <Button
                className="w-full"
                disabled={cartItems.length === 0}
                onClick={() => alert("Proceeding to checkout")}
              >
                Checkout
              </Button>
            </div>
          </SheetFooter>
        </SheetContent>
      </Sheet>
    </div>
  );
}
