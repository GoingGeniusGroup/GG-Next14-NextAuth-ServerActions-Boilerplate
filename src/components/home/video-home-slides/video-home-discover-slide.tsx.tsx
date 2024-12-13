import { Button } from "@/src/ui/button";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function VideoHomeDiscoverSlide({
  isUserLoggedIn,
  toggleModal,
}: {
  isUserLoggedIn: boolean;
  toggleModal: () => void;
}) {
  const router = useRouter();

  const handleGetStarted = () => {
    if (isUserLoggedIn) {
      router.push("#");
    } else {
      toggleModal();
    }
  };
  return (
    <>
      <div
        className="size-full lg:ml-auto"
        style={{
          backgroundImage: "url(/homepage/img2.png)", // Updated background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/65"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="bg-custom-gradient-two bg-clip-text text-center text-lg font-extrabold text-transparent drop-shadow-sm lg:text-6xl">
          Find Genius People
          <br />
          <p className="mt-4">Around the Universe</p>
        </h1>
        <p className="mt-7 text-center text-white lg:text-2xl ">
          Hidden in Different dimension on the basis of Guild Theory
        </p>
        <div className="flex justify-center">
          <Button
            className="relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 "
            onClick={handleGetStarted}
          >
            Regions
            <div className="absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300"></div>
          </Button>
        </div>
      </div>
    </>
  );
}
