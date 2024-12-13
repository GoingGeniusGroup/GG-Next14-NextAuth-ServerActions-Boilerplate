const VideoHomeSlide = () => {
  return (
    <>
      <div
        className="size-full lg:ml-auto lg:w-[50%]"
        style={{
          backgroundImage: "url(/homepage/image.png)",
          backgroundSize: "cover",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
        }}
      ></div>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <div className="w-[800px]">
          <h1 className="text-center text-2xl font-bold leading-10 text-white lg:text-6xl">
            One Genius ID for every
            <br />
            <p className="mt-4">Genius Tech</p>
          </h1>
          <p className="mt-10 text-center text-sm text-white lg:text-2xl">
            Keep all your Genius Services secured with 1 Genius ID <br />{" "}
            Developer Features Coming Soon
          </p>
        </div>
      </div>
    </>
  );
};

export default VideoHomeSlide;
