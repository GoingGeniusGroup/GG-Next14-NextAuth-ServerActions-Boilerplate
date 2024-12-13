import { Button } from "@/src/ui/button";
import Image from "next/image";
import { useRouter } from "next/navigation";

export default function VideoHomeGGOneSlide({
  user,
  isUserLoggedIn,
  toggleModal,
}: {
  user: any;
  isUserLoggedIn: boolean;
  toggleModal: () => void;
}) {
  const router = useRouter();

  const handleGetStarted = () => {
    if (isUserLoggedIn && user) {
      router.push(`/genius-profile/$${user.username}`);
    } else {
      toggleModal();
    }
  };
  return (
    <div className="relative flex flex-col items-center justify-center w-full h-full ">
      <div className="absolute top-20 z-20 flex w-full flex-col items-center justify-center overflow-hidden font-extrabold text-[#FFE400] md:top-36 md:ml-48 md:justify-start">
        <div className="flex w-full items-center justify-center overflow-hidden text-6xl font-extrabold md:top-36 md:justify-start md:text-7xl">
          GG ONE
        </div>

        <div className="mt-10 flex w-full flex-col justify-center gap-y-2 text-xl font-semibold lg:justify-start lg:text-3xl">
          <div className="flex w-full flex-col items-center justify-center lg:items-start lg:justify-start">
            <p>One ID for Genius Services</p>
            <p>3d Body for Web 3 Family</p>
            <p>
              Genius Membership for <br />
              Health, Knowledge and Business
            </p>
            <p>Expertise with experience</p>
            <p>Bring Powerful Skill to Light</p>
            <p>Slider Sub Tagling</p>
            <p>Open Source</p>
          </div>
        </div>
      </div>

      <div
        className="absolute z-20 size-96 "
        style={{ backgroundImage: "/homepage/VajraSplash.svg" }}
      ></div>
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/livewallpapers/forest.mp4" type="video/mp4" />
      </video>

      <div className="flex justify-center z-40">
        <Button
          className="relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 "
          onClick={handleGetStarted}
        >
          Get Yours Now
          <div className="absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300"></div>
        </Button>
      </div>
      <div className="absolute z-30 hidden h-full lg:right-20 lg:flex lg:items-center">
        <Image
          src="/homepage/GGONE.png"
          height={300}
          width={300}
          alt="guild symbol"
        />
      </div>
      <div className="absolute bottom-0 z-30 flex justify-center lg:hidden">
        <Image
          src="/homepage/GGONE.png"
          height={80}
          width={80}
          alt="guild symbol"
        />
      </div>
    </div>
  );
}
