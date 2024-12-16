"use client";

import Image from "next/image";
import { useState } from "react";

interface GalleryImageProps {
  src: string;
  alt: string;
  blurDataURL?: string;
  priority?: boolean;
}

export function GalleryImage({
  src,
  alt,
  blurDataURL,
  priority = false,
}: GalleryImageProps) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className="relative aspect-square">
      <Image
        src={src}
        alt={alt}
        fill
        className={`
          object-cover transition-opacity duration-300
          ${isLoading ? "opacity-0" : "opacity-100"}
        `}
        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
        priority={priority}
        placeholder={blurDataURL ? "blur" : "empty"}
        blurDataURL={blurDataURL}
        onLoadingComplete={() => setIsLoading(false)}
      />
      {isLoading && (
        <div className="absolute inset-0 bg-gray-200 animate-pulse" />
      )}
    </div>
  );
}
