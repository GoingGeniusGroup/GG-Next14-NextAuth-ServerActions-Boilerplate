import Link from "next/link";

export default function VideoHomeAvatarSlide() {
  return (
    <>
      <div
        className="size-full lg:ml-auto"
        style={{
          backgroundImage: "url(/homepage/image2.png)", // Updated background image
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="absolute inset-0 bg-black/65"></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="bg-custom-gradient bg-clip-text text-center text-lg font-extrabold text-transparent drop-shadow-sm lg:text-6xl">
          Customized Avatar For
          <br />
          <p className="mt-4">3d WEB</p>
        </h1>
        <p className="mt-7 text-center text-white lg:text-lg ">
          3d Web made more accessible with 3d Avatar to travel in 3d WEB
        </p>
        <Link
          className="relative mt-8 rounded-full bg-white px-6 py-2 text-sm font-medium text-black transition-transform duration-300 hover:scale-105 hover:bg-gray-200 "
          href="/hud"
          aria-label="get started button"
        >
          Get Started
          <div className="absolute right-0 top-0 size-3 animate-ping rounded-full bg-blue-300"></div>
        </Link>
      </div>
    </>
  );
}
