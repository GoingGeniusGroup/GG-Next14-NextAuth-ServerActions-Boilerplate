"use client";

import React, { useState } from "react";
import { ShoppingCart } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ScrollArea, ScrollBar } from "@/components/ui/scrollarea";
import ProductList from "./subComponents/ProductList";
import ProductDetail from "./subComponents/ProductDetail";
import CartSheet from "./subComponents/CartSheet";
import { Product, CartItem } from "./subComponents/types";
import { Switch } from "../ui/switch/switch";
import { GiEarthAmerica } from "react-icons/gi";
import { TbHexagon3D } from "react-icons/tb";
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger,
} from "@/components/ui/tooltip/tooltip";
import { Label } from "@/components/ui/label";
import VirtualProductList from "./subComponents/VirtualProductList";

import physicalProducts from "@/core/data/physicalProduct";
import virtualProducts from "@/core/data/virtualProduct";

const VirtualShop = () => {
  const [cart, setCart] = useState<Record<string, number>>({});
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState("All");
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [isPhysicalView, setIsPhysicalView] = useState(true);

  // Get products based on the current view
  const products = isPhysicalView ? physicalProducts : virtualProducts;

  // Dynamically extract categories from the products
  const categories = [
    "All",
    ...new Set(products.map((product) => product.category)),
  ];

  const addToCart = (productId: number) => {
    const productType = isPhysicalView ? "physical" : "virtual";
    const cartKey = `${productType}-${productId}`;
    setCart((prevCart) => ({
      ...prevCart,
      [cartKey]: (prevCart[cartKey] || 0) + 1,
    }));
  };

  const removeFromCart = (productId: number) => {
    const productType = isPhysicalView ? "physical" : "virtual";
    const cartKey = `${productType}-${productId}`;
    setCart((prevCart) => {
      const newCart = { ...prevCart };
      if (newCart[cartKey] > 1) {
        newCart[cartKey]--;
      } else {
        delete newCart[cartKey];
      }
      return newCart;
    });
  };

  const totalItems = Object.values(cart).reduce((sum, count) => sum + count, 0);

  const cartItems: CartItem[] = Object.entries(cart).map(([key, quantity]) => {
    const [productType, productId] = key.split("-");
    const product =
      productType === "physical"
        ? physicalProducts.find((p) => p.id === parseInt(productId))
        : virtualProducts.find((p) => p.id === parseInt(productId));
    return { ...product!, quantity, productType };
  });

  const totalPrice = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  // Filter the products based on the selected category
  const filteredProducts =
    selectedCategory === "All"
      ? products
      : products.filter((product) => product.category === selectedCategory);

  const handleViewChange = () => {
    setIsPhysicalView(!isPhysicalView);
    setSelectedCategory("All");
  };

  return (
    <div className={`mx-auto px-2 pb-4`}>
      <header className="mb-4 p-2 sticky top-0 z-20 bg-white/40 rounded-md backdrop-blur-md">
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
        <nav className="w-full flex flex-col">
          {/* Physical and virtual filter */}
          <div className="md:absolute md:top-3 md:right-12 z-20">
            <div className="flex items-center space-x-1">
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="dim" className="p-0">
                    <Label htmlFor="switch-view">
                      <GiEarthAmerica size={25} />
                    </Label>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Physical</p>
                </TooltipContent>
              </Tooltip>
              <Switch
                id="switch-view"
                className="data-[state=unchecked]:bg-black data-[state=checked]:bg-black"
                onCheckedChange={handleViewChange} // Update state based on the switch
              />

              <Tooltip>
                <TooltipTrigger asChild>
                  <Button variant="dim" className="p-0">
                    <Label htmlFor="switch-view">
                      <TbHexagon3D size={25} />
                    </Label>
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Virtual</p>
                </TooltipContent>
              </Tooltip>
            </div>
          </div>
          {/* SubFilters */}
          <ScrollArea className={`md:w-[70%] w-full`}>
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

      <div className="flex flex-col md:flex-row md:h-[calc(100vh-120px)]">
        <div className={`md:w-[70%] p-2 overflow-y-auto`}>
          {isPhysicalView ? (
            <ProductList
              products={filteredProducts} // Physical products list
              cart={cart}
              onAddToCart={addToCart}
              onSelectProduct={setSelectedProduct}
              isMobile={false}
            />
          ) : (
            <VirtualProductList
              products={filteredProducts} // Virtual products list
              cart={cart}
              onAddToCart={addToCart}
              onSelectProduct={setSelectedProduct}
            />
          )}
        </div>
        <div className="md:w-[30%] px-4 py-2 md:sticky md:right-0 md:top-[80px] md:h-[calc(100vh-120px)] overflow-y-auto fixed top-30 right-10 size-[250px]">
          <div className="bg-white rounded-lg shadow-lg p-6 border border-gray-200/30">
            <ProductDetail product={selectedProduct} onAddToCart={addToCart} />
          </div>
        </div>
      </div>

      <CartSheet
        isOpen={isCartOpen}
        onClose={() => setIsCartOpen(false)}
        cartItems={cartItems}
        onAddToCart={addToCart}
        onRemoveFromCart={removeFromCart}
        totalPrice={totalPrice}
        isMobile={false}
      />
    </div>
  );
};

export default VirtualShop;