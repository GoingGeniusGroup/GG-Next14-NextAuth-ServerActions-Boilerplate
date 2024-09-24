"use client";
import React, { useEffect, useState, useMemo } from "react";
import Button from "../../../components/myComponent/Button";

// Define Product type once, outside of any function
type Product = {
  id: number;
  title: string;
  price: number;
  description: string;
  image: string;
  // Add other properties as needed
};

function Product() {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [displayCount, setDisplayCount] = useState(3);

  useEffect(() => {
    async function fetchProducts(): Promise<void> {
      try {
        const response: Response = await fetch(
          "https://fakestoreapi.com/products"
        );
        if (!response.ok) throw new Error("Failed to fetch products");
        const data: Product[] = await response.json();
        setProducts(data);
      } catch (err: unknown) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unknown error occurred");
        }
      } finally {
        setLoading(false);
      }
    }
    fetchProducts();
  }, []);

  const renderProducts = useMemo(() => {
    return products.map((product: Product) => (
      <div
        key={product.id}
        className="bg-white-400 bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 m-2 rounded-xl shadow w-72  flex flex-col justify-between overflow-hidden"
      >
        <ul className="border flex flex-col gap-2 p-5 rounded-lg shadow-xl h-full">
          <li className="flex justify-center">
            <img
              src={product.image}
              alt={product.title}
              className="h-52 w-auto object-contain"
            />
          </li>
          <li className="font-semibold text-xl line-clamp-1">
            {product.title}
          </li>
          <li className="font-bold text-base">Price: ${product.price}</li>
          <li className="line-clamp-3 text-sm">
            Description: {product.description}
          </li>
          <li className="mt-auto">
            <button className="bg-yellow-500 w-full p-3 rounded-md">
              Add to Cart
            </button>
          </li>
          <li>
            <button className="bg-blue-500 w-full p-3 rounded-md">
              Buy Now
            </button>
          </li>
        </ul>
      </div>
    ));
  }, [products]);

  if (loading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div className="flex flex-col gap-2">
      <div className="container flex justify-end">
        <Button text="Add Product" />
      </div>

      <div className="container flex flex-col gap-2">
        <div className="flex flex-wrap items-start">
          {renderProducts.slice(0, displayCount)}
        </div>
        <div className="flex justify-center">
          {displayCount < products.length && (
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={() => setDisplayCount(displayCount + 3)}
            >
              Load More
            </button>
          )}
          {displayCount >= products.length && (
            <button
              className="bg-blue-500 text-white p-2 rounded-md"
              onClick={() => setDisplayCount(3)}
            >
              Show Less
            </button>
          )}
        </div>
      </div>
    </div>
  );
}

export default Product;
