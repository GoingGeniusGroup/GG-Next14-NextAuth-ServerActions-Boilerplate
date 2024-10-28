import { UserCardData } from "@/core/interface/userCardData.interface";

const guildColors = {
  BUDDHA: "#FFFFFF",
  VAJRA: "#0000FF",
  KARMA: "#00FF00",
  RATNA: "#FFD700",
  PADMA: "#FF0000",
} as const;

const getGradientStyle = (
  guild: keyof typeof guildColors | null | undefined
) => {
  const color =
    guild && guild in guildColors
      ? guildColors[guild as keyof typeof guildColors]
      : "#FFFFFF";
  return {
    background: `linear-gradient(to right, black 20%, ${color} 90%, ${color} 100%)`,
  };
};

const formatDate = (date: Date | string | null | undefined) => {
  if (!date) return "No date";
  const dateObj = date instanceof Date ? date : new Date(date);
  return dateObj.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
};

export default function SmallPreviewCard({
  userData,
}: {
  userData: UserCardData | null;
}) {
  if (!userData) {
    return (
      <div className="flex items-center justify-center h-full">Loading...</div>
    );
  }
  return (
    <div className="group w-[192px] h-[116px]">
      <div
        style={getGradientStyle(userData.guild)}
        className={`relative h-[114px] w-[190px] rounded-lg shadow-md transition-all duration-500 cursor-pointer transform `}
      >
        {/* Front of card */}
        <div className="p-2 size-full">
          <p className="absolute top-2 right-2 text-[8px] font-semibold text-yellow-600">
            GG
          </p>
          <p className="text-[7px] absolute top-2 left-2">
            {userData.address || "No Address"}
          </p>
          <div className="flex flex-col justify-center items-start size-full">
            <div className="text-left">
              <h1 className="text-[8px] font-bold uppercase text-white truncate">
                {userData.first_name || ""} {userData.last_name || ""}
              </h1>
              <p className="text-[6px] text-white truncate">
                {userData.description || "No description"}
              </p>
            </div>
          </div>
          <div className="absolute bottom-2 left-2 text-[7px] font-semibold text-white">
            {formatDate(userData.dob)}
          </div>
          <div className="absolute bottom-2 right-2">
            <p className="text-[6px] font-semibold hover:underline text-sky-500">
              View More
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
