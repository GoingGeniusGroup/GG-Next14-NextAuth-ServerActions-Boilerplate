"use client";

import { FaEdit } from "react-icons/fa";
import GGCard from "../card/GGCard";
import CustomCardStack from "../card/CustomCardStack";
import CustomToolTipLeftRight from "@/components/layouts/CustomComponents/CustomToolTipLeftRight";

const publicUser = {
  name: "John Doe", // User's full name
  faculty: "Science", // User's faculty, displayed on the card
  guild: "BUDDHA" as "BUDDHA", // Guild, one of the defined guild types
  age: 21, // User's age
  email: "johndoe@example.com", // User's email, shown in the QR card
  username: "johndoe", // Username, used to compare in the Bio section
  description:
    "A curious explorer and a passionate learner about the mysteries of the universe.", // User's bio description
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
