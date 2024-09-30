
import SalesInvoice from "@/src/components/Invoice/SaleInvoice";
import {  getInvoice } from "@/src/server-actions/order/order";
import { InvoiceType } from "@/types/ordertype";


import React from "react";

const page = async ({
  params,
}: {
  params: {
    id: string;
  };
}) => {
  const Invoicedata: InvoiceType  = await getInvoice(params.id);
  
  return (
    <>
      <SalesInvoice invoiceProp={Invoicedata} hidden={false} />
    </>
  );
};

export default page;
