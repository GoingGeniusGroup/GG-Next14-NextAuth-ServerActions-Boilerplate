import React from "react";
import Link from "next/link";
import DashboardIcon from "@mui/icons-material/Dashboard";
import InventoryIcon from "@mui/icons-material/Inventory";
import AssessmentIcon from "@mui/icons-material/Assessment";
import AddBusinessIcon from '@mui/icons-material/AddBusiness';
import AddchartIcon from '@mui/icons-material/Addchart';
import StoreIcon from '@mui/icons-material/Store';
import LogoutIcon from '@mui/icons-material/Logout';
import SettingsIcon from '@mui/icons-material/Settings';
import '../index.css';
import Image from "next/image";

const Sidebar = () => {
  return (
    <>
      <div className="flex flex-col gap-3" id="sidebar">
        <div className="mx-auto mt-4">
          <Image className="w-16 h-16" alt="" src="logo.svg" />
        </div>
        <div className="flex flex-col gap-1 w-full capitalize">
          <div className="w-full">
            <Link
              href="/dashboard"
              className=" bg-slate-300 gap-3 flex flex-row pl-3 py-3 ml-6 rounded-lg hover:bg-blue-400 text-black">
              <DashboardIcon />
              <span>Dashboard</span>
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/dashboard"
              className="flex flex-row gap-3 bg-slate-300 pl-3 py-3 ml-6 rounded-lg hover:bg-blue-400 text-black">
              <InventoryIcon />
              <span>inventory</span>
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/dashboard"
              className="flex flex-row gap-3 bg-slate-300 pl-3 py-3 ml-6 rounded-lg hover:bg-blue-400 text-black">
              <AssessmentIcon />
              <span>report</span>
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/dashboard"
              className="flex flex-row gap-3 bg-slate-300 pl-3 py-3 ml-6 rounded-lg hover:bg-blue-400 text-black">
              <AddBusinessIcon />
              <span>suppliers</span>
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/dashboard"
              className="flex flex-row gap-3 bg-slate-300 pl-3 py-3 ml-6 rounded-lg hover:bg-blue-400 text-black">
              <AddchartIcon />
              <span>order</span>
            </Link>
          </div>
          <div className="w-full">
            <Link
              href="/dashboard"
              className="flex flex-row gap-3 bg-slate-300 pl-3 py-3 ml-6 rounded-lg hover:bg-blue-400 text-black">
              <StoreIcon />
              <span>manage store</span>
            </Link>
          </div>
        </div>
        <div className="flex flex-col justify-center gap-1 capitalize mt-14">
          <Link
            href="/dashboard"
            className="bg-slate-300 gap-3 flex flex-row pl-3 py-3 ml-6 rounded-lg hover:bg-blue-400 text-black">
            <SettingsIcon />
            <span>setting</span>
          </Link>
          <Link
            href="/dashboard"
            className="bg-slate-300 gap-3 flex flex-row pl-3 py-3 ml-6 rounded-lg hover:bg-blue-400 text-black">
            <LogoutIcon />
            <span>log out</span>
          </Link>
        </div>
      </div>
    </>
  );
};

export default Sidebar;
