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
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <div
        className="absolute inset-0 h-full w-full"
        style={{
          backgroundImage: "url(/homepage/img2.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>

      {/* Overlay */}
      <div className="absolute inset-0 bg-gradient-to-t from-black via-black/70 to-transparent"></div>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-600 lg:text-6xl drop-shadow-lg">
          Find Genius People
          <br />
          <span className="mt-4 block text-lg lg:text-2xl text-gray-200">
            Around the Universe
          </span>
        </h1>

        <p className="mt-6 text-base text-gray-300 lg:text-lg">
          Hidden in different dimensions, guided by the principles of Guild
          Theory
        </p>

        <div className="mt-8 flex justify-center">
          <Button
            className="relative inline-flex items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-purple-600 px-8 py-3 text-white font-medium shadow-lg transition-all duration-300 hover:scale-105 hover:shadow-xl"
            onClick={handleGetStarted}
          >
            Explore Regions
            <div className="absolute right-1 -top-1 h-3 w-3 animate-ping rounded-full bg-white"></div>
          </Button>
        </div>
      </div>
    </div>
  );
}
