import React from "react";
import { IoBagSharp } from "react-icons/io5";
import { FaRupeeSign } from "react-icons/fa";
import { TbBasketCancel } from "react-icons/tb";
import { MdAssignmentReturn } from "react-icons/md";

const PurchaseOverview: React.FC = () => {
  return (
    <div className=" bg-gray-300 rounded-md bg-clip-padding backdrop-filter backdrop-blur-lg bg-opacity-20 border text-white border-gray-100 flex flex-col gap-y-4 p-5 w-7/12">
      <div className="">
        <h2 className="capitalize text-lg">purchase overview</h2>
      </div>
      <div className=" flex flex-row justify-between">
        <div className=" flex flex-col items-center gap-3">
          <div>
            <IoBagSharp className="text-3xl text-blue-500" />
          </div>
          <div className="flex justify-between items-center gap-3">
            <h4>82</h4>
            <p>Purchase</p>
          </div>
        </div>
        <div className=" flex flex-col items-center gap-3">
          <div>
            <FaRupeeSign className="text-3xl text-green-600" />
          </div>
          <div className=" flex justify-between items-center gap-3">
            <h4>₹ 13,573</h4>
            <p>cost</p>
          </div>
        </div>
        <div className=" flex flex-col items-center gap-3">
          <div>
            <TbBasketCancel className="text-3xl text-pink-600" />
          </div>
          <div className=" flex justify-between items-center gap-3">
            <h4>5</h4>
            <p>cancel</p>
          </div>
        </div>
        <div className=" flex flex-col items-center gap-3">
          <div>
            <MdAssignmentReturn className="text-3xl text-pink-600" />
          </div>
          <div className=" flex justify-between items-center gap-3">
            <h4>₹ 17,432</h4>
            <p>return</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PurchaseOverview;
