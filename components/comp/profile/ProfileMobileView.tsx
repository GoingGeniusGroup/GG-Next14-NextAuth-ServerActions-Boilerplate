"use client";

import { FaEdit } from "react-icons/fa";
import GGCard from "../card/GGCard";
import CustomCardStack from "../card/CustomCardStack";
import CustomToolTipLeftRight from "@/components/comp/CustomComponents/CustomToolTipLeftRight";

const publicUser = {
  name: "John Doe",
  faculty: "Science",
  guild: "BUDDHA" as "BUDDHA",
  age: 25,
  email: "john.doe@example.com",
  username: "johndoe",
  description: "A brief description about John Doe.",
  first_name: "John",
  last_name: "Doe",
  guild_id: "12345",
  dob: new Date("1995-12-17T03:24:00"), // Convert string to Date
  address: "123 Main St, Anytown, USA",
};

export default function ProfileMobileView({ username }: { username: string }) {
  return (
    <>
      <div className="relative size-full select-none overflow-y-auto overflow-x-hidden p-2">
        Hello {username}
        {/* CardStack Swiper */}
        <div className="sticky top-0 z-40">
          <CustomCardStack
            height={200}
            speed={200}
            initialSlide={1}
            perSlideOffset={7}
            perSlideRotate={1}
            slideShadows={false}
          >
            <div className=" h-[190px] w-[96%] rounded-[7.35039px] ">
              <GGCard userData={publicUser} />
            </div>
            <div className=" h-[190px] w-[96%] rounded-[7.35039px] ">
              <GGCard userData={publicUser} />
            </div>
            <div className=" h-[190px] w-[96%] rounded-[7.35039px] ">
              <GGCard userData={publicUser} />
            </div>
            <div className=" h-[190px] w-[96%] rounded-[7.35039px] ">
              <GGCard userData={publicUser} />
            </div>
          </CustomCardStack>
        </div>
        {/* Bio */}
        <div className="relative w-full rounded-md bg-white/80 px-2 py-1 text-black">
          <h1 className="text-[16px] font-bold">BIO</h1>
          {username === publicUser.username && (
            <div className="absolute right-2 top-2">
              <div className="group">
                <FaEdit size={14} className="cursor-pointer" />
                <CustomToolTipLeftRight
                  content="Edit Bio"
                  top="-4"
                  left={-20}
                  translateY="0"
                />
              </div>
            </div>
          )}
          <p className="h-[60px] w-full overflow-auto text-[12px] font-semibold">
            {publicUser.description}
          </p>
        </div>
      </div>
    </>
  );
}
