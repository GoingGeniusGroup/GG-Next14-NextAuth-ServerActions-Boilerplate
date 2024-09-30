"use client";
import Image from "next/image";
import React, { useEffect } from "react";
import logo from "@/public/invoice-logo.jpg";
import PageHeader from "@/app/_components/PageHeader";
import { Button } from "@/components/ui/button";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import useGloabalContext from "@/src/context/GlobalProvider";

import { InvoiceType } from "@/types/orderType";
import { formatOrderDate } from "@/lib/utils";
interface SalesInvoiceProps {
  hidden: boolean;
  invoiceProp?: InvoiceType;
}

const SalesInvoice: React.FC<SalesInvoiceProps> = ({
  hidden,
  invoiceProp,
}) => {
  const { order } = useGloabalContext();

  const invoice = hidden ? order : invoiceProp;

  const totalAmount = invoice?.carts.reduce((total, cart) => {
    return total + cart.amount;
  }, 0)?.toFixed(2);

  const totalTax = invoice?.carts.reduce((total, cart) => {
    return total + ((cart.product?.tax?.rate ?? 0) / 100) * cart.amount;
  }, 0)?.toFixed(2);

  const { handleGeneratePdf, pdfRef } = useGloabalContext();

  useEffect(() => {
    if (pdfRef.current && hidden) {
      handleGeneratePdf(pdfRef.current, invoice?.InvoiceId, false);
    }
  }, [pdfRef]);

  return (
    <>
      <div
        className={`max-w-4xl mx-auto flex justify-between pt-5 ${
          hidden ? "hidden" : ""
        }`}
      >
        <PageHeader> Sale Invoice</PageHeader>
        <Button
          type="button"
          onClick={() => {
            pdfRef.current
              ? handleGeneratePdf(pdfRef.current, invoice?.InvoiceId, true)
              : null;
          }}
          className="inline-flex items-center justify-center px-4 py-3 text-xs font-bold text-gray-900 transition-all duration-200 bg-gray-100 binvoice binvoice-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-200"
        >
          Download Invoice
        </Button>
      </div>

      <div
        className="max-w-4xl mx-auto binvoice binvoice-gray-500 p-8 rounded-sm"
        ref={pdfRef}
      >
        {/* Header */}
        <div className="flex justify-between binvoice-b binvoice-gray-500 pb-8">
          <div className="flex flex-col">
            <h2>Bill From:</h2>
            <p>Vendify Store</p>
            <p>150 Nayashor Street</p>
            <p>Nepal</p>
            <p>Vendifystore12@gmail.com</p>
          </div>
          <Image src={logo} alt="limifood logo" className="w-36 h-36" />
        </div>
        {/* Header End */}
        <div className="flex justify-between binvoice-b binvoice-gray-500 py-8">
          <div className="flex flex-col">
            <h2>Bill To:</h2>
            <p>{invoice?.user?.name}</p>
            <p>{`${invoice?.streetAddress}, ${invoice?.city}, ${invoice?.state}`}</p>
            <p>{invoice?.user?.email}</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p>Invoice #</p>
              <p className="text-gray-500">{invoice?.InvoiceId}</p>
            </div>
            <div className="flex justify-between">
              <p>Invoice Date: </p>
              <p className="text-gray-500">
                {formatOrderDate(invoice?.invoiceDate)}
              </p>
            </div>
            <div className="flex justify-between">
              <p>Amount Due: </p>
              <p className="text-gray-500">${totalAmount}</p>
            </div>
          </div>
        </div>

        <div className="relative overflow-x-auto">
          <Table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
            <TableHeader className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
              <TableRow>
                <TableHead className="px-6 py-3">Item</TableHead>
                <TableHead className="px-6 py-3">Item Description</TableHead>
                <TableHead className="px-6 py-3">Qty</TableHead>
                <TableHead className="px-6 py-3">Unit Cost</TableHead>
                <TableHead className="px-6 py-3">Discount</TableHead>
                <TableHead className="px-6 py-3">Tax</TableHead>
                <TableHead className="px-6 py-3">Line Total</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {invoice?.carts.map((cart, index) => {
                const productPrice =
                  cart.variants.length > 0
                    ? cart.variants.find(
                        (var_p) => var_p.variant.name === "Size"
                      )?.salePrice || cart.product.salePrice
                    : cart.product.salePrice;

                const discount =
                  cart.variants.length > 0
                    ? ((cart.variants.find(
                        (var_p) => var_p.variant.name === "Size"
                      )?.discount ?? 0) / 100) ||
                      (cart.product.discount ?? 0) / 100
                    : (cart.product.discount ?? 0) / 100;

                const discountPrice = discount > 0 ? discount * productPrice : 0;

                const tax = cart.product.tax ? cart.product.tax.rate : 0;

                const finalPrice = discount
                  ? productPrice - discount * productPrice
                  : productPrice;
                const total = cart.quantity * finalPrice;

                const taxPrice = ((tax / 100) * total).toFixed(2);
                const lineTotal = (total + parseFloat(taxPrice)).toFixed(2);

                return (
                  <TableRow
                    key={index}
                    className="bg-white binvoice-b dark:bg-gray-800 dark:binvoice-gray-700"
                  >
                    <TableCell className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white">
                      {cart.product.name}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      {cart.variants.length > 0
                        ? cart.variants
                            .map((variant) => variant.option?.value)
                            .join(", ")
                        : "No variants"}
                    </TableCell>
                    <TableCell className="px-6 py-4">{cart.quantity}</TableCell>
                    <TableCell className="px-6 py-4">
                      ${productPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-6 py-4">
                      ${discountPrice.toFixed(2)}
                    </TableCell>
                    <TableCell className="px-6 py-4">${taxPrice}</TableCell>
                    <TableCell className="px-6 py-4">${lineTotal}</TableCell>
                  </TableRow>
                );
              })}
            </TableBody>
          </Table>
        </div>

        <div className="flex justify-between binvoice-b binvoice-gray-500 py-8">
          <div className="flex flex-col">
            <h2>NOTES</h2>
            <p>Free Shipping for 30 Days Money back guarantee</p>
          </div>
          <div className="flex flex-col">
            <div className="flex justify-between">
              <p>SubTotal: </p>
              <p className="text-gray-500">${totalAmount}</p>
            </div>
            <div className="flex justify-between">
              <p>Tax</p>
              <p>${totalTax}</p>
            </div>
            <div className="flex justify-between">
              <p>Total</p>
              <p>${(parseFloat(totalAmount ?? "0") + parseFloat(totalTax ?? "0")).toFixed(2)}</p>
            </div>
          </div>
        </div>
        <div className="flex justify-center items-center pt-8">
          <Image src={logo} alt="limifood logo" className="w-20 h-20" />
        </div>
      </div>
    </>
  );
};

export default SalesInvoice;
