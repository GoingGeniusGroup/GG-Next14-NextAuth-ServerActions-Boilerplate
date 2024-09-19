import React from "react";
import { FcSalesPerformance } from "react-icons/fc";
import { FiTrendingUp } from "react-icons/fi";
import { GiProfit } from "react-icons/gi";
import { FaRegMoneyBillAlt } from "react-icons/fa";





const SalesOverview: React.FC = () => {
  return (
    <div className="bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-sm bg-opacity-15 border border-gray-100 flex flex-col gap-y-4 p-5 w-7/12 text-white">
      <div>
        <h2 className="capitalize text-lg">sales overview</h2>
      </div>
      <div className=" flex flex-row justify-between">
        <div className=" flex flex-col items-center gap-3">
          <div >
            <FcSalesPerformance className="text-3xl drop-shadow-2xl" />
          </div>
          <div className="flex justify-between items-center gap-3">
            <h4>82</h4>
            <p>sales</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div>
          <FiTrendingUp className="text-3xl drop-shadow-2xl" />
          </div>
          <div className="flex justify-between items-center gap-3">
            <h4>₹ 13,573</h4>
            <p>revenue</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div>
          <GiProfit className="text-3xl text-green-400 drop-shadow-2xl " />
          </div>
          <div className="flex justify-between items-center gap-3">
            <h4>₹ 8999</h4>
            <p>profit</p>
          </div>
        </div>
        <div className="flex flex-col items-center gap-3">
          <div>
          <FaRegMoneyBillAlt className="text-3xl drop-shadow-2xl text-green-500" />
          </div>
          <div className="flex justify-between items-center gap-3">
            <h4>₹ 17,432</h4>
            <p>cost</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SalesOverview;
