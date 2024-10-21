import SteamProfile from "@/components/steam/steamProfile";

export const metadata = {
  title: "Steam Profile Lookup",
  description: "Look up Steam user profiles using their Steam ID",
};

export default function SteamProfilePage() {
  return (
    <div className="relative z-10 mx-auto pb-8">
      <h1 className="text-3xl font-bold mb-6 text-center cursor-pointer text-black dark:text-white">
        Steam Profile Lookup
      </h1>
      <SteamProfile />
    </div>
  );
}
