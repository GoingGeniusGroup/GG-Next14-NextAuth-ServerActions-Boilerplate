"use client";
import React, { useEffect, useState } from "react";
import Button from "./Button";
import Image from "next/image";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: string;
  image: string;
  rating: {
    rate: number;
    count: number;
  };
}

function ProductCards() {
  const [product, setProduct] = useState<Product | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const res = await fetch("https://fakestoreapi.com/products/1");
        if (!res.ok) throw new Error("Failed to fetch product");
        const fetchedProduct: Product = await res.json();
        setProduct(fetchedProduct);
      } catch (err) {
        setError("Error fetching product. Please try again.");
      } finally {
        setIsLoading(false);
      }
    };

    fetchProduct();
  }, []);

  if (isLoading)
    return (
      <div className="flex justify-center items-center h-screen">
        Loading...
      </div>
    );
  if (error)
    return (
      <div className="flex justify-center items-center h-screen text-red-500">
        {error}
      </div>
    );
  if (!product) return null;

  return (
    <div className="flex justify-center items-center min-h-screen bg-[rgba(37,36,36,0.5)] rounded-md overflow-hidden">
      <div className="w-full max-w-2xl mt-10 flex rounded-lg overflow-hidden shadow-lg border-b border-r border-gray-300">
        <div className="h-[22rem] w-1/2 bg-white">
          <Image
            src={product.image}
            alt={product.title || "Product image"}
            placeholder="blur"
            blurDataURL={product.image}
            className="w-full h-full object-contain p-4"
            width={100}
            height={100}
          />
        </div>
        <div className="flex flex-col h-[22rem] flex-1 gap-2 backdrop-filter backdrop-blur-sm bg-opacity-10">
          <div className="flex flex-col p-5 flex-grow">
            <h3 className="text-xl font-semibold mb-1">{product.title}</h3>
            <h4 className="text-base capitalize text-gray-400 mb-2">
              {product.category}
            </h4>
            <p className="text-sm line-clamp-4">{product.description}</p>
          </div>
          <div className="flex items-center justify-between px-5 py-3">
            <p className="text-lg font-bold">${product.price.toFixed(2)}</p>
            <Button text="Buy Now" />
          </div>
        </div>
      </div>
    </div>
  );
}

export default ProductCards;
