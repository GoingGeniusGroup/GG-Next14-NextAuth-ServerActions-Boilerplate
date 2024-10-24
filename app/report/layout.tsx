"use client";
import React, { useState } from "react";
import Sidebar2 from "../../components/comp/myComponent/Sidebar2";
import Navbar from "../../components/comp/myComponent/navbar";
import BG from "../../public/bg/bg.jpg";

const Page = ({ children }: { children: React.ReactNode }) => {
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
          <div className="pl-5 pt-5">{children}</div>
        </div>
      </div>
    </>
  );
};

export default Page;
