"use client";
import React, { useState } from "react";
import { BsArrowLeftShort, BsSearch } from "react-icons/bs";
import { BiSolidDashboard } from "react-icons/bi";
import { MdInventory } from "react-icons/md";
import { HiOutlineDocumentReport } from "react-icons/hi";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosLogOut } from "react-icons/io";
import { MdOutlineSell } from "react-icons/md";
import { PiUserFocusThin } from "react-icons/pi";
import { MdKeyboardArrowDown } from "react-icons/md";
import Image from "next/image";

// Type for submenu items
interface SubmenuItem {
  subId: number;
  name: string;
  link: string;
  isActive?: boolean;
}

// Type for main menu items
interface MenuItem {
  id: number;
  name: string;
  link?: string;
  icon: React.ReactNode; // Icons as React elements
  isActive?: boolean;
  submenu?: boolean;
  submenuItems?: SubmenuItem[]; // Optional submenu items array
  spacing?: boolean;
  onClick?: () => void;
  hr?: JSX.Element;
}

// Sidebar2 component
// ... existing imports ...

// Move menu array declaration here, before the component
const menu: MenuItem[] = [
  {
    id: 1,
    name: "Dashboard",
    link: "/dashboard",
    icon: <BiSolidDashboard />,
    isActive: true,
  },
  {
    id: 2,
    name: "Inventory",
    link: "/dashboard/inventory",
    icon: <MdInventory />,
    isActive: false,
  },
  {
    id: 3,
    name: "Product",
    link: "/product",
    icon: <MdOutlineSell />,
    isActive: false,
    submenu: true,
    submenuItems: [
      {
        subId: 1,
        name: "add product",
        link: "/product/addproduct",
      },
      {
        subId: 2,
        name: "product list",
        link: "/product/productlist",
      },
      {
        subId: 3,
        name: "product category",
        link: "/product/productcategory",
      },
    ],
  },
  {
    id: 4,
    name: "Report",
    icon: <HiOutlineDocumentReport />,
    submenu: true,
    isActive: false,
    submenuItems: [
      {
        subId: 1,
        name: "Product Summary",
        link: "/dashboard/report/product-summary",
      },
      {
        subId: 2,
        name: "Purchase",
        link: "/dashboard/report/purchase",
      },
      {
        subId: 3,
        name: "Sales",
        link: "/dashboard/report/sales",
      },
    ],
  },
  {
    id: 5,
    name: "Customers",
    link: "/dashboard/customers",
    spacing: true,
    hr: <hr className="border border-emerald-300 rounded-lg text-center" />,
    icon: <PiUserFocusThin />,
    isActive: false,
  },
  {
    id: 6,
    name: "Settings",
    link: "/dashboard/settings",
    icon: <IoSettingsOutline />,
    isActive: false,
  },
  {
    id: 7,
    name: "Logout",
    link: "/dashboard/logout",
    icon: <IoIosLogOut />,
    isActive: false,
  },
];

const Sidebar2: React.FC = () => {
  const [active, setActive] = useState<boolean>(true);
  const [open, setOpen] = useState<number | null>(null); // Track open submenu by ID
  const [menuItems, setMenuItems] = useState<MenuItem[]>(menu);

  const handleClick = (id: number) => {
    const updatedMenu = menu.map((item) => ({
      ...item,
      isActive: item.id === id ? true : false,
    }));
    setMenuItems(updatedMenu);
  };

  return (
    <aside className="flex min-h-[122vh]">
      <div
        className={`bg-white-400 rounded-md bg-clip-padding backdrop-filter backdrop-blur-md bg-opacity-30 border border-gray-100 p-5 pt-8 ${
          active ? "w-72" : "w-[5.3rem]"
        } duration-300 relative rounded-xl`}
      >
        <BsArrowLeftShort
          className={`bg-white text-green-800 rounded-full border border-cyan-800 text-3xl absolute -right-3 top-9 cursor-pointer ${
            !active && "rotate-180"
          }`}
          onClick={() => setActive(!active)}
        />
        <div className="inline-flex items-center">
          <Image
            src="/logo/logo.svg"
            alt="logo"
            width={38}
            height={38}
            className={`bg-yellow-400 text-black text-4xl rounded-md cursor-pointer block float-left mr-2 duration-500 ${
              !active && "rotate-[360deg]"
            }`}
          />
          <h2
            className={`text-white origin-left font-medium text-2xl duration-300 ${
              !active && "scale-0"
            }`}
          >
            G.Genius
          </h2>
        </div>
        <div
          className={`flex items-center rounded-md mt-6 bg-lime-200 ${
            !active ? "px-2.5" : "px-4"
          } py-2`}
        >
          <BsSearch
            className={`text-slate-600 block text-lg cursor-pointer float-left mr-1 ${
              !active && "mr-2"
            }`}
          />
          <input
            type="text"
            placeholder="Search"
            className={`text-black text-base bg-transparent focus:outline-none w-full ${
              !active && "hidden"
            }`}
          />
        </div>

        <ul className="pt-6">
          {menuItems.map((menuItem) => (
            <React.Fragment key={menuItem.id}>
              {menuItem.hr && (
                <hr className="border border-emerald-300 rounded-lg text-center mt-14" />
              )}
              <li
                key={menuItem.id}
                className={`text-white text-sm flex items-center gap-x-2 cursor-pointer p-1.5 duration-200 hover:bg-zinc-600 rounded-md ${
                  menuItem.spacing ? "mt-4" : "mt-2"
                } ${menuItem.isActive ? "bg-zinc-600" : ""}`}
                onClick={() => handleClick(menuItem.id)}
              >
                <span
                  className={`block float-left duration-300 ${
                    !active ? "text-3xl" : "text-2xl"
                  }`}
                  onClick={() => setActive(!active)}
                >
                  {menuItem.icon}
                </span>
                <a
                  href={menuItem.link}
                  className={`text-white text-base font-medium flex-1 duration-500 ${
                    !active && "hidden"
                  }`}
                  onClick={() =>
                    setOpen(open === menuItem.id ? null : menuItem.id)
                  }
                >
                  {menuItem.name}
                </a>
                {menuItem.id === 3 && active && (
                  <MdKeyboardArrowDown
                    // onClick={() => setOpen(open === menuItem.id ? null : menuItem.id)} // Toggle submenu
                    className={`${
                      open === menuItem.id && "rotate-180"
                    } text-2xl text-white`}
                  />
                )}
                {menuItem.id === 4 && active && (
                  <MdKeyboardArrowDown
                    // onClick={() => setOpen(open === menuItem.id ? null : menuItem.id)} // Toggle submenu
                    className={`${
                      open === menuItem.id && "rotate-180"
                    } text-2xl text-white`}
                  />
                )}
              </li>

              {/* Submenu Items */}
              {menuItem.submenu && open && active && (
                <ul className="text-white text-sm cursor-pointer p-2 rounded-md ml-3 bg-transparent">
                  {menuItem.submenuItems?.map((submenuItem) => (
                    <li
                      key={submenuItem.subId}
                      className={`text-white text-sm flex items-center gap-x-4 cursor-pointer p-2 px-5 rounded-md hover:bg-slate-400`}
                    >
                      <a
                        href={submenuItem.link}
                        className="text-white text-sm font-medium capitalize"
                      >
                        {submenuItem.name}
                      </a>
                    </li>
                  ))}
                </ul>
              )}
            </React.Fragment>
          ))}
        </ul>
      </div>
    </aside>
  );
};

export default Sidebar2;