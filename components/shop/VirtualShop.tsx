"use client";

import React, { useState, useEffect, useRef } from "react";
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
import { gsap } from "gsap";

// Zod schemas (unchanged)
const ProductSchema = z.object({
  id: z.number(),
  name: z.string(),
  price: z.number(),
  image: z.string(),
  category: z.string(),
  description: z.string(), // Add description field
});

const CartItemSchema = ProductSchema.extend({
  quantity: z.number(),
});

type Product = z.infer<typeof ProductSchema>;
type CartItem = z.infer<typeof CartItemSchema>;

// Updated mock data for products
const products: Product[] = [
  {
    id: 1,
    name: "Classic T-Shirt",
    price: 19.99,
    image: "https://purepng.com/public/uploads/large/white-tshirt-n0j.png",
    category: "Clothing",
    description:
      "A comfortable and versatile classic t-shirt, perfect for everyday wear.",
  },
  {
    id: 2,
    name: "Denim Jeans",
    price: 49.99,
    image:
      "https://static.vecteezy.com/system/resources/thumbnails/021/938/733/small_2x/blue-jeans-isolated-on-a-transparent-background-png.png",
    category: "Clothing",
    description:
      "High-quality denim jeans that offer both style and durability.",
  },
  {
    id: 3,
    name: "Sneakers",
    price: 79.99,
    image:
      "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSByAWaWoInX4M5P9luXYgAU-Y9W7FisXvTbQ&s",
    category: "Shoes",
    description:
      "Comfortable and stylish sneakers suitable for various activities.",
  },
  {
    id: 4,
    name: "Hoodie",
    price: 39.99,
    image:
      "https://png.pngtree.com/png-vector/20240402/ourmid/pngtree-blank-black-male-hoodie-sweatshirt-long-sleeve-with-clipping-path-mens-png-image_12258589.png",
    category: "Clothing",
    description: "A cozy hoodie that's perfect for layering or lounging.",
  },
  {
    id: 5,
    name: "Sunglasses",
    price: 29.99,
    image:
      "https://img.drz.lazcdn.com/static/pk/p/b6326aee217bb925d7bc39cd65fead89.jpg_720x720q80.jpg",
    category: "Accessories",
    description:
      "Stylish sunglasses that provide both UV protection and a fashionable look.",
  },
];

const categories = ["All", "Clothing", "Shoes", "Accessories"];

const VirtualShop = ({ isMobile = false }) => {
  const [cart, setCart] = useState<Record<number, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const imageRef = useRef<HTMLImageElement>(null);

  useEffect(() => {
    if (selectedProduct && imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { y: 20, opacity: 0 },
        { y: 0, opacity: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [selectedProduct]);

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
    <div
      className={`mx-auto px-2 pb-4 bg-yellow-200 pt-20 min-h-screen ${
        isMobile ? "h-full overflow-y-auto" : ""
      }`}
    >
      <header className="mb-4 p-2 sticky top-0 z-20 bg-white/40 rounded-md backdrop-blur-md">
        {isMobile ? (
          <>
            <div className="flex items-center justify-center mb-2 ">
              <h2 className="text-lg font-bold">SHOP</h2>
            </div>
            <div
              className="absolute left-2 top-2 cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 -right-2"
                >
                  {totalItems}
                </Badge>
              )}
            </div>
          </>
        ) : (
          <div className="absolute top-8 right-4 z-20">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge variant="destructive">{totalItems}</Badge>
              )}
            </div>
          </div>
        )}
        <nav className="w-full">
          <ScrollArea className="w-full">
            <div className="flex space-x-2 pb-2">
              {categories.map((category) => (
                <Button
                  key={category}
                  variant={
                    selectedCategory === category ? "default" : "outline"
                  }
                  size="sm"
                  className={`text-xs whitespace-nowrap ${
                    selectedCategory === category
                      ? "font-semibold text-white"
                      : "text-black"
                  }`}
                  onClick={() => setSelectedCategory(category)}
                >
                  {category}
                </Button>
              ))}
            </div>
            <ScrollBar orientation="horizontal" />
          </ScrollArea>
        </nav>
      </header>

      <div className="flex size-full bg-purple-200">
        <div
          className={`w-[70%] p-2 grid ${
            isMobile
              ? "grid-cols-2"
              : "grid-cols-1 sm:grid-cols-2 lg:grid-cols-4"
          } gap-2 sm:gap-4`}
        >
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg h-auto bg-white text-black shadow-sm cursor-pointer"
              onClick={() => setSelectedProduct(product)}
            >
              <div
                className={`relative overflow-hidden ${
                  isMobile ? "h-24" : "sm:h-48 h-40"
                }`}
              >
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="hover:scale-110 transition-transform duration-300 object-contain"
                  unoptimized
                  loading="lazy"
                />
              </div>
              <div className="p-2">
                <h3 className="font-semibold text-xs sm:text-sm mb-1 truncate">
                  {product.name}
                </h3>
                <p className="text-gray-600 text-xs mb-1">
                  ${product.price.toFixed(2)}
                </p>
                <Button
                  onClick={(e) => {
                    e.stopPropagation();
                    addToCart(product.id);
                  }}
                  className="w-full text-xs"
                  size="sm"
                  variant="black"
                >
                  Add to Cart
                  {cart[product.id] && (
                    <Badge variant="cool" className="ml-1 text-xs">
                      {cart[product.id]}
                    </Badge>
                  )}
                </Button>
              </div>
            </div>
          ))}
        </div>
        <div className="flex-grow bg-pink-300 p-4 relative">
          {selectedProduct ? (
            <>
              <h2 className="text-2xl font-bold mb-4">
                {selectedProduct.name}
              </h2>
              <div className="relative h-64 mb-4">
                <Image
                  ref={imageRef}
                  src={selectedProduct.image}
                  alt={selectedProduct.name}
                  fill
                  className="object-contain"
                  unoptimized
                  loading="lazy"
                />
              </div>
              <p className="text-lg font-semibold mb-2">
                ${selectedProduct.price.toFixed(2)}
              </p>
              <p className="mb-4">{selectedProduct.description}</p>
              <Button
                onClick={() => addToCart(selectedProduct.id)}
                className="w-full"
                size="lg"
              >
                Add to Cart
              </Button>
            </>
          ) : (
            <p className="text-center text-gray-500">
              Select a product to view details
            </p>
          )}
        </div>
      </div>

      {/* Cart sheet */}
      <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
        <SheetContent
          className={`w-full ${isMobile ? "sm:max-w-[100vw]" : "sm:max-w-lg"}`}
        >
          <SheetHeader>
            <SheetTitle>Your Cart</SheetTitle>
            <SheetDescription>
              Review your items, adjust quantities, or proceed to checkout.
            </SheetDescription>
          </SheetHeader>
          <ScrollArea
            className={`flex-grow mt-4 ${
              isMobile ? "h-[calc(100vh-250px)]" : "h-[calc(100vh-200px)]"
            }`}
          >
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
                      unoptimized
                      loading="lazy"
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
};

export default VirtualShop;
