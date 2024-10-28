import AboutSectionProfile from "../console/AboutSectionProfile";
import BottomSection from "../console/BottomSection";

export default async function GeniusUserHome({
  username,
}: {
  username: string;
}) {
  return (
    <>
      <div className="flex w-full justify-between">
        <div className="w-[35%] px-4">
          <AboutSectionProfile username={username} />
        </div>
        <div className="w-[35%] px-4">
          {/* Projects Grid */}
          <BottomSection username={username} />
        </div>
      </div>
    </>
  );
}
