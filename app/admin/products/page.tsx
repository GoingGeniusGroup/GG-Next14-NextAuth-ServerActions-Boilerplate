import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductTable from "./_components/ProductTable";
import PageHeader from "@/app/_components/PageHeader";

const page = () => {
  return (
    <>
      <div className="container mx-auto flex justify-between items-center gap-4 py-5">
       <PageHeader>  All Products</PageHeader>
        <Button asChild className="bg-indigo-500 hover:bg-indigo-700">
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductTable />
    </>
  );
};

export default page;
