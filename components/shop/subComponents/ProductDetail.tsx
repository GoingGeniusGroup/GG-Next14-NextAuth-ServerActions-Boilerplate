import React, { useRef, useEffect, useState } from "react";
import Image from "next/image";
import { Button } from "@/components/ui/button";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { gsap } from "gsap";
import { Product } from "./types";

interface ProductDetailProps {
  product: Product | null;
  onAddToCart: (productId: number) => void;
}

const ProductDetail: React.FC<ProductDetailProps> = ({
  product,
  onAddToCart,
}) => {
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const imageRef = useRef<HTMLImageElement>(null);
  const sliderRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (product && sliderRef.current) {
      gsap.fromTo(
        sliderRef.current,
        { opacity: 0, y: 20 },
        { opacity: 1, y: 0, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [product]);

  useEffect(() => {
    if (imageRef.current) {
      gsap.fromTo(
        imageRef.current,
        { opacity: 0, scale: 0.9 },
        { opacity: 1, scale: 1, duration: 0.5, ease: "power2.out" }
      );
    }
  }, [currentImageIndex]);

  const nextImage = () => {
    if (product) {
      setCurrentImageIndex((prev) => (prev + 1) % product.images.length);
    }
  };

  const prevImage = () => {
    if (product) {
      setCurrentImageIndex(
        (prev) => (prev - 1 + product.images.length) % product.images.length
      );
    }
  };

  if (!product) {
    return (
      <p className="text-center text-gray-500">
        Select a product to view details
      </p>
    );
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4">{product.name}</h2>
      <div ref={sliderRef} className="relative h-64 mb-4">
        <Image
          ref={imageRef}
          src={product.images[currentImageIndex]}
          alt={product.name}
          fill
          className="object-contain"
          unoptimized
          loading="lazy"
        />
        <Button
          size="icon"
          variant="ghost"
          className={`absolute left-0 top-1/2 transform -translate-y-1/2 ${
            product.images.length === 1 ? "hidden" : ""
          }`}
          onClick={prevImage}
        >
          <ChevronLeft className="h-6 w-6" />
        </Button>
        <Button
          size="icon"
          variant="ghost"
          className={`absolute right-0 top-1/2 transform -translate-y-1/2 ${
            product.images.length === 1 ? "hidden" : ""
          }`}
          onClick={nextImage}
        >
          <ChevronRight className="h-6 w-6" />
        </Button>
      </div>
      <p className="text-lg font-semibold mb-2">${product.price.toFixed(2)}</p>
      <p className="mb-4">{product.description}</p>
      <Button
        onClick={() => onAddToCart(product.id)}
        variant="black"
        className="w-full"
        size="lg"
      >
        Add to Cart
      </Button>
    </>
  );
};

export default ProductDetail;
