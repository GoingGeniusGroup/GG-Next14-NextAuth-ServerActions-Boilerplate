import React from "react";
import ProductForm from "../_components/ProductForm";

import { auth } from "@/auth";
import PageHeader from "@/app/_components/PageHeader";
import { getCategories } from "@/actions/category";
import { getSuppliers } from "@/actions/supplier";
import { SelectType } from "@/types/orderType";
import { getTaxes } from "@/actions/tax";
import TaxForm from "@/components/comp/Product/TaxForm";



const page = async () => {
  const session = await auth();
  const userId = session?.user.id;
  const categoriesData:SelectType = await getCategories(true);
  const suppliersData: SelectType = await getSuppliers(true);
  const taxs: SelectType = await getTaxes(true);

  return (
    <div className="py-5">
        <div className="flex justify-center">
        <PageHeader> Add a Product </PageHeader>
        </div>
     
      <ProductForm userId={userId} suppliers={suppliersData} categories={categoriesData} taxs={taxs}/>
    </div>
  );
};

export default page;
