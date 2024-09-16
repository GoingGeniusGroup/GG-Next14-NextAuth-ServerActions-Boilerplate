'use client';
import React, { useEffect, useState, useMemo } from 'react';

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

    useEffect(() => {
        async function fetchProducts(): Promise<void> {
            try {
                const response: Response = await fetch('https://fakestoreapi.com/products');
                if (!response.ok) throw new Error('Failed to fetch products');
                const data: Product[] = await response.json();
                setProducts(data);
            } catch (err: unknown) {
                if (err instanceof Error) {
                    setError(err.message);
                } else {
                    setError('An unknown error occurred');
                }
            } finally {
                setLoading(false);
            }
        }
        fetchProducts();
    }, []);

    const renderProducts = useMemo(() => {
        return products.map((product: Product) => (
            <div key={product.id} className="bg-white m-2 rounded-2xl shadow w-72 min-h-[400px] flex flex-col justify-between">
                <ul className="border flex flex-col gap-4 p-5 rounded-lg shadow-xl h-full">
                    <li className="font-semibold">{product.title}</li>
                    <li className="flex justify-center">
                        <img src={product.image} alt={product.title} className="h-24 w-auto" />
                    </li>
                    <li className="font-bold">Price: ${product.price}</li>
                    <li className="line-clamp-3">Description: {product.description}</li>
                    <li className="mt-auto">
                        <button className="bg-yellow-500 w-full p-3 rounded-md">Add to Cart</button>
                    </li>
                    <li>
                        <button className="bg-blue-500 w-full p-3 rounded-md">Buy Now</button>
                    </li>
                </ul>
            </div>
        ));
    }, [products]);

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;

    return (
        <div>
            <h1 className='text-3xl font-bold text-center mt-4'>Products</h1>
            <div className="container mx-auto flex flex-wrap justify-center">
                {renderProducts}
            </div>
        </div>
    );
}

export default Product;
