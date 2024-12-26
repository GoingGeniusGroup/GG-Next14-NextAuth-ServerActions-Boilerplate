"use client";

import { UserProfilesCarousel } from "../../GeniusUserProfile/ProfileCard/user-profile-carousel";
import { MouseImageTrail } from "../../animated/mouse-trail-card";

export default function VideoHomeGeniusProfilesSlide({
  staticUsers,
  isUserLoggedIn,
  toggleModal,
}: {
  staticUsers: any[];
  isUserLoggedIn: boolean;
  toggleModal: () => void;
}) {
  const userImages = staticUsers.map((user) => user.image);

  return (
    <>
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/livewallpapers/earth.mp4" type="video/mp4" />
      </video>
      <div className="absolute inset-0 z-0">
        <MouseImageTrail
          renderImageBuffer={50}
          rotationRange={25}
          images={userImages}
        >
          <section className="grid h-screen w-screen place-content-center "></section>
        </MouseImageTrail>
      </div>
      <div className="absolute left-1/2 -translate-x-1/2 top-1/2 -translate-y-1/2 w-[356px] h-fit rounded-lg flex flex-col justify-center z-50 border border-white/35 backdrop-blur-md p-2">
        <div className="flex justify-center font-semibold text-md text-white">
          GENIUS PROFILES
        </div>
        <UserProfilesCarousel
          users={staticUsers}
          toggleModal={toggleModal}
          isUserLoggedIn={isUserLoggedIn}
        />
      </div>
    </>
  );
}
