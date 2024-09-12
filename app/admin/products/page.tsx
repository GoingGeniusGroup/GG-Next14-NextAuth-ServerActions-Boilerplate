import React from "react";
import { CheckCircle2 } from "lucide-react";


import { Button } from "@/components/ui/button";
import PageHeader from "@/components/PageHeader/PageHeader";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../../components/ui/dropdown-menu";
import Link from "next/link";
import ProductTable from "./_components/ProductTable";
import ProductForm from "@/components/form/ProductForm";
import ProductModel from "@/components/Model/ProductModel";
import { db } from "@/lib/db";

const page = () => {
  return (
    <>
      <div className="container mx-auto flex justify-between items-center gap-4">
        <PageHeader>All Products</PageHeader>

        <Button asChild variant={"secondary"}>
          <Link href="/admin/products/new">Add Product</Link>
        </Button>
      </div>
      <ProductTable />
      <ProductModel/>
    </>
  );
};

export default page;
