"use client";
import { Button } from "@/components/ui/button";
import DOMPurify from "isomorphic-dompurify";
import Image from "next/image";
import Link from "next/link";
import React from "react";

interface Product {
  
    name: string;
    id: string;
    category?: {
        categoryName: string;
    };
    description: string | null;
    costPrice: number | null;
    quantityInStock: number;
    salePrice: number | null;
    status: boolean;
    image: string | null

}
const ProductList = ({
  products
}: {
  products: Product[] | null
}) => {



  return (
    <>
      <div className="container mx-auto mt-12 flex gap-x-8 gap-y-16 justify-between flex-wrap">
        {products?.map((product) => (
          <Link
            href={"/products/" + product.id}
            className="w-full flex flex-col gap-4 sm:w-[45%] lg:w-[22%]"
            key={product.id}
          >
            <div className="relative w-full h-80">
              <Image
                src={product?.image || "/product.png"}
                alt=""
                fill
                sizes="25vw"
                className="absolute object-cover rounded-md z-10 hover:opacity-0 transition-opacity easy duration-500"
              />
            </div>
            <div className="flex justify-between">
              <span className="font-medium">{product.name}</span>
              <span className="font-semibold">${product.salePrice}</span>
            </div>
            {product.description && (
              <div
                className="text-sm text-gray-500"
                dangerouslySetInnerHTML={{
                  __html: DOMPurify.sanitize(product.description || ""),
                }}
              ></div>
            )}
            <Button
            variant={"outline"}
             className="rounded-2xl ring-1 ring-indigo-500 text-indigo-500 w-max py-2 px-4 text-xs hover:bg-indigo-600 hover:text-white">
              Add to Cart
            </Button>
          </Link>
        ))}
      </div>
    </>
  );
};

export default ProductList;
