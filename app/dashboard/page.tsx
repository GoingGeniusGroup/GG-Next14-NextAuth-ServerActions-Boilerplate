import React from "react";
import InventorySummary from "../../components/layouts/myComponent/InventorySummary";
import SalesOverview from "../../components/layouts/myComponent/SalesOverview";
import PurchaseOverview from "../../components/layouts/myComponent/PurchaseOverview";
import Sidebar2 from "../../components/layouts/myComponent/Sidebar2";
import Navbar from "../../components/layouts/myComponent/navbar";
import ProductSummary from "../../components/layouts/myComponent/ProductSummary";
import LowQuantity from "../../components/layouts/myComponent/LowQuantity";
import BG from "../../public/bg/bg.jpg";
import TopSelling from "@/components/layouts/myComponent/TopSelling";

const page = () => {
  return (
    <>
      <div
        className="flex md:flex-row px-8 pt-8 pb-4 bg-cover bg-no-repeat bg-center min-h-dvh"
        style={{ backgroundImage: `url(${BG.src})` }}
      >
        <div className="min-h-dvh">
          <Sidebar2 />
        </div>
        <div className=" flex flex-col w-full h-full">
          <div>
            <Navbar />
          </div>
          <div className="pl-5 pt-5">
            <div className="flex gap-x-4 mb-4 w-full">
              <SalesOverview />
              <InventorySummary />
            </div>
            <div className="flex gap-x-4 mb-4 w-full">
              <PurchaseOverview />
              <ProductSummary />
            </div>
            <div className="flex w-full gap-4">
              <div className="w-7/12">
                <TopSelling />
              </div>
              <div className="w-5/12 bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border border-gray-100">
                <LowQuantity />
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default page;
