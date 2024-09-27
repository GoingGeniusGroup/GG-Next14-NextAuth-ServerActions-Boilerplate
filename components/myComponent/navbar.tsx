import Image from "next/image";
import React from "react";
import { useForm } from "react-hook-form";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import Button from "./Button";
import { useState } from 'react'
// import Button from './Button'

// Define the type for the Navbar component's props (currently no props)
interface NavbarProps {

}

interface Product {
  productName: string;
  productId: number;
  expiryDate: string;
  receivedDate: string;
  price: number;
  barcode: string;
  productImage: string;
}

interface NavbarProps {}

// Navbar component with typed props
const Navbar: React.FC<NavbarProps> = () => {
  const [isHidden, setIsHidden] = useState<boolean>(false);
  const addProduct = () => {
    setIsHidden(!isHidden);
  };
  return (
    <nav className="ml-5">
      <div className="flex justify-between px-8 bg-white-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 h-16">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold text-slate-200 ">name</h2>
        </div>
        <div className="flex items-center gap-6">
          <button className="bg-blue-500 text-white px-4 py-2 rounded-full" onClick={addProduct} >add product</button>
          {isHidden && (
            <form className="grid grid-cols-1 gap-3 justify-end absolute -left-120 top-10" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-3 w-full">
                <div className="flex flex-col justify-center mt-5 gap-2">
                  <label htmlFor="productImage" className="text-white/90 capitalize">product image</label>
                  <input type="file" id="productImage" name="productImage" />
                </div>
              </div>
            </form>
          )}

          <span>
            <MdOutlineMail className="text-3xl text-slate-200" />
          </span>
          <span>
            <IoMdNotificationsOutline className="text-3xl text-slate-200" />
          </span>
          <Image
            className="border-solid border-2 border-slate-200 bg-yellow-500 rounded-full"
            src="/logo/logo.svg"
            height={40}
            width={41.8}
            alt="logo"
          />
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
