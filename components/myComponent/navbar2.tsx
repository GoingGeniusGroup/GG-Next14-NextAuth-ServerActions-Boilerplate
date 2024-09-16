import Image from "next/image";
import React from "react";
import { IoMdNotificationsOutline } from "react-icons/io";
import { MdOutlineMail } from "react-icons/md";
import Button from './Button'

// Define the type for the Navbar component's props (currently no props)
interface NavbarProps {
  
}

// Navbar component with typed props
const Navbar: React.FC<NavbarProps> = () => {
  return (
    <nav className="ml-5">
      <div className="flex justify-between px-8 bg-white-400 rounded-lg bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 h-16">
        <div className="flex items-center">
          <h2 className="text-3xl font-bold text-slate-200 ">name</h2>
        </div>
        <div className="flex items-center gap-6">
          <Button onClick={undefined} />
          <span>
            <MdOutlineMail className="text-3xl text-slate-200" />
          </span>
          <span>
            <IoMdNotificationsOutline className="text-3xl text-slate-200" />
          </span>
          <Image
            className="border-solid border-2 border-slate-200 bg-yellow-500 rounded-full"
            src='/logo/logo.svg'
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
