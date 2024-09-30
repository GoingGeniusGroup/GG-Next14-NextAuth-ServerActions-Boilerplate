import ProductList from "@/src/components/Product/ProductList";
import { ProductCardSkeleton } from "@/src/components/Product/ProductSkeleton";
import { getProducts } from "@/src/services/product";
import React, { Suspense } from "react";

const page = async () => {
  return (
    <div>
      <Suspense
        fallback={
          <>
          <div className="grid"> </div>
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
            <ProductCardSkeleton />
          </>
        }
      >
        <ProductSuspense />
      </Suspense>
    </div>
  );
};

export default page;

async function ProductSuspense() {

  const product = await getProducts();


  return <ProductList products={product} />;
}
