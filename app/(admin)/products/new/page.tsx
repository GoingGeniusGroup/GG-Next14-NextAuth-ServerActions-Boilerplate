import React from "react";
import ProductForm from "../_components/ProductForm";

import { auth } from "@/auth";
import PageHeader from "@/app/_components/PageHeader";

const page = async () => {
  const session = await auth();
  const userId = session?.user.id;

  return (
    <div className="py-5">
        <div className="flex justify-center">
        <PageHeader> Add a Product </PageHeader>
        </div>
     
      <ProductForm userId={userId} />
    </div>
  );
};

export default page;
