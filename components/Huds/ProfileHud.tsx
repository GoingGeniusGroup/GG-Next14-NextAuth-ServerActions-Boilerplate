"use client";

// import { useUser } from '@/UserClientProvider'
import { SetStateAction, useState } from "react";
import { useSession } from "next-auth/react";
import { IoCart, IoDiamondSharp } from "react-icons/io5";
import { FaCreditCard } from "react-icons/fa6";
import { HiMiniWallet } from "react-icons/hi2";
import Link from "next/link";
import { MdOutlineDarkMode } from "react-icons/md";
import { GiCash } from "react-icons/gi";
import { Avatar, AvatarFallback, AvatarImage } from "@radix-ui/react-avatar";
import { UserRound } from "lucide-react";
import { ExtendedUser } from "@/types/next-auth";

const tabs = [".", "sn", "Cart", "Edit", "Wallet"];

export default function ProfileHud() {
  const { data: session } = useSession();
  const user = session?.user as ExtendedUser; // Type assertion for safety

  const [selectedTab, setSelectedTab] = useState("Cart");
  //   const { user } = useUser();
  const profilePic = user?.image || undefined;

  const handleTabClick = (tab: SetStateAction<string>) => {
    if (tab === selectedTab) {
      // If the tab is already selected minimize the view
      setSelectedTab("");
    } else {
      setSelectedTab(tab);
    }
  };

  //   const username = user?.username;
  const username = "loggedin-user";

  const getIcon = (tab: string) => {
    switch (tab) {
      case "Cart":
        return <IoCart size={16} />;
      case "Edit":
        return <FaCreditCard size={16} />;
      case "Wallet":
        return <HiMiniWallet size={16} />;
      default:
        return null;
    }
  };

  return (
    <div className="fixed bottom-[20px] right-[32px] z-50 flex h-[33px] select-none items-center space-x-[6px] rounded-full bg-white py-[6px] pl-[0px] pr-[50px] shadow-lg shadow-black/50">
      <Link
        href={`/profile-page/${username}`}
        className="absolute -right-3 -top-9 size-[62px] overflow-hidden rounded-full border-2 bg-white/60"
      >
        <Avatar className="size-14 relative">
          <AvatarImage src={profilePic} />
          <AvatarFallback>
            <UserRound className="size-14 text-black" />
          </AvatarFallback>
        </Avatar>
      </Link>

      {/* Top */}
      <div className="absolute -top-6 flex h-[20px] w-[78%] select-none justify-between">
        <div className="flex gap-x-1 text-xs">
          <div className="flex size-[19px] items-center justify-center rounded-full border-2 border-green-500 text-green-500">
            <GiCash />
          </div>
          <p
            style={{
              color: "#ffffff",
              textShadow: "1px 1px 2px #00FF00",
            }}
          >
            13,789
          </p>
        </div>
        <div className="flex gap-x-1 text-xs">
          <div className="flex size-[19px] items-center justify-center  rounded-full border-2 border-yellow-500 text-yellow-500">
            <IoDiamondSharp />
          </div>
          <p
            style={{
              color: "#ffffff",
              textShadow: "1px 1px 2px #FFFF00",
            }}
          >
            97,869
          </p>
        </div>

        <div
          className={`size-[19px] rounded-full border-2 border-white bg-black text-white transition-all duration-300 ease-in-out`}
        >
          <MdOutlineDarkMode />
        </div>
      </div>

      {tabs.map((tab, i) => (
        <div
          key={i}
          onClick={() => handleTabClick(tab)}
          className={`flex size-[26px] items-center justify-center rounded-full shadow-black drop-shadow-lg hover:bg-black/40 ${
            selectedTab === tab
              ? "bg-yellow-500 text-black"
              : "bg-blue-400 text-white"
          }`}
        >
          {getIcon(tab)}
        </div>
      ))}
    </div>
  );
}
