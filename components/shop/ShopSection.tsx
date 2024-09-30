"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import ProductList from "./subComponents/ProductList";
import { Product, CartItem } from "./subComponents/types";
import CartSheet from "./subComponents/CartSheet";

interface ShopProps {
  products: Product[];
  categories: string[];
  isMobile?: boolean;
}

const ShopSection: React.FC<ShopProps> = ({
  products,
  categories,
  isMobile,
}) => {
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
    return { ...product!, quantity };
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
      className={`container mx-auto px-2 pb-4 ${
        isMobile ? "h-full overflow-y-auto" : ""
      }`}
    >
      <header className="mb-4 p-2 z-20 bg-white/40 rounded-md backdrop-blur-md">
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
          <div className="absolute top-5 right-4 z-20">
            <div
              className="relative cursor-pointer"
              onClick={() => setIsCartOpen(true)}
            >
              <ShoppingCart className="w-6 h-6" />
              {totalItems > 0 && (
                <Badge
                  variant="destructive"
                  className="absolute -top-2 right-[-1px] size-4 p-1 flex justify-center"
                >
                  {totalItems}
                </Badge>
              )}
            </div>
          </div>
        )}
        <nav className="w-full">
          <ScrollArea className="w-full">
            <div className="flex space-x-2 pb-2 pt-4">
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

      <div className="flex h-[calc(100vh-120px)]">
        <div className={`w-full p-2 overflow-y-auto`}>
          <ProductList
            products={filteredProducts}
            cart={cart}
            onAddToCart={addToCart}
            isMobile={isMobile || false}
          />
        </div>
      </div>

      {/* Cart sheet */}
      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
        isMobile={isMobile || false}
      />
    </div>
  );
};

export default ShopSection;
