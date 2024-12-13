import Link from "next/link";

export default function VideoHomeAvatarSlide() {
  return (
    <div className="relative h-screen w-full">
      {/* Background Image */}
      <video
        className="absolute inset-0 size-full object-cover"
        autoPlay
        loop
        muted
      >
        <source src="/livewallpapers/lines.mp4" type="video/mp4" />
      </video>

      {/* Content */}
      <div className="absolute inset-0 flex flex-col items-center justify-center text-center px-6 lg:px-0">
        <h1 className="text-4xl font-extrabold tracking-tight text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-teal-600 lg:text-6xl drop-shadow-lg">
          Customized Avatar For
          <br />
          <span className="mt-4 block text-lg lg:text-2xl text-gray-200">
            3D WEB
          </span>
        </h1>

        <p className="mt-6 text-base text-gray-300 lg:text-lg">
          Experience the 3D Web with personalized avatars for seamless
          navigation
        </p>
      </div>
    </div>
  );
}
