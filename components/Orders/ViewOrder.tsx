"use client";
import { formatOrderDate } from "@/lib/utils";
import Link from "next/link";
import React from "react";
import { OrderType } from "@/types/ordertype";

const ViewOrder = ({ order }: { order: OrderType }) => {
  const totalamount = order?.carts.reduce((total, cart) => {
    return total + cart.amount;
  }, 0);

  return (
    <>
      <ul className="mt-8 space-y-5 lg:mt-12 sm:space-y-6 lg:space-y-10">
        <li className="overflow-hidden bg-white border border-gray-200 rounded-md">
          <div className="lg:flex">
            <div className="w-full border-b border-gray-200 lg:max-w-xs lg:border-b-0 lg:border-r bg-gray-50">
              <div className="px-4 py-6 sm:p-6 lg:p-8">
                <div className="grid grid-cols-2 gap-6 md:grid-cols-4 lg:grid-cols-1">
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Order ID
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {order?.id}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">Date</p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {formatOrderDate(order?.orderDate)}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Quantity
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      {order?.quantity}
                    </p>
                  </div>
                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Total Amount
                    </p>
                    <p className="text-sm font-bold text-gray-900 mt-0.5">
                      ${totalamount}
                    </p>
                  </div>

                  <div>
                    <p className="text-sm font-medium text-gray-500">
                      Order Status
                    </p>
                    <div className="mt-0.5 flex items-center">
                      <div className="inline-flex items-center justify-center flex-shrink-0 w-3 h-3 rounded-full text-white bg-amber-400 mr-1.5">
                        <svg
                          className="w-2 h-2"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke="currentColor"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            stroke-width="2"
                            d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                          />
                        </svg>
                      </div>
                      <span className="text-sm font-bold text-gray-900">
                        {" "}
                        {order?.status}{" "}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="flex-1 px-4 py-6 sm:p-6 lg:p-8">
              <ul className="space-y-7">
                {order?.carts.map((cart) => (
                  <li className="relative flex pb-10 sm:pb-0">
                    <div className="flex-shrink-0">
                      <img
                        className="object-cover rounded-lg w-28 h-28"
                        src="https://cdn.rareblocks.xyz/collection/clarity-ecommerce/images/order-details/3/product-1.png"
                        alt=""
                      />
                    </div>

                    <div className="flex flex-col justify-between flex-1 ml-5">
                      <div className="sm:grid sm:grid-cols-2 sm:gap-x-5">
                        <div>
                          <p className="text-base font-bold text-gray-900">
                            {cart.product.name}
                          </p>
                          <p className="mt-1.5 text-sm font-medium text-gray-500">
                            {cart.variants.length > 0
                              ? cart.variants.map((var_opt) => {
                                  return var_opt.option.value + " ";
                                })
                              : ""}
                          </p>
                        </div>

                        <div className="mt-4 sm:mt-0">
                          <p className="text-base font-bold text-left text-gray-900 sm:text-right">
                            $
                            {cart.variants.length > 0
                              ? cart.variants.find(
                                  (var_product) =>
                                    var_product.variant.name === "Size"
                                )?.salePrice || cart.product.salePrice
                              : cart.product.salePrice}
                          </p>
                        </div>
                      </div>

                      <div className="absolute bottom-0 left-0 sm:relative">
                        <div className="flex space-x-5">
                          <a
                            href="#"
                            title=""
                            className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          >
                            {" "}
                            View Product{" "}
                          </a>

                          <span className="text-gray-200"> | </span>

                          <a
                            href="#"
                            title=""
                            className="p-1 -m-1 text-sm font-medium text-gray-500 transition-all duration-200 rounded hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900"
                          >
                            {" "}
                            Similar Product{" "}
                          </a>
                        </div>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>

              <hr className="mt-8 border-gray-200" />

              <div className="flex items-center mt-8 space-x-5">
                <button
                  type="button"
                  className="inline-flex items-center justify-center px-4 py-2.5 text-sm font-bold text-gray-900 transition-all duration-200 bg-white border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-500 hover:bg-gray-100"
                >
                  <Link href={`/order/invoice/${order?.id}`}>View Invoice</Link>
                </button>
              </div>
            </div>
          </div>
        </li>
      </ul>
    </>
  );
};

export default ViewOrder;
