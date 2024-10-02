import SteamProfile from "@/components/steam/steamProfile";

export const metadata = {
  title: "Steam Profile Lookup",
  description: "Look up Steam user profiles using their Steam ID",
};

export default function SteamProfilePage() {
  return (
    <main className="container mx-auto pb-8 pt-16">
      <h1 className="text-3xl font-bold mb-6 text-center">
        Steam Profile Lookup
      </h1>
      <SteamProfile />
    </main>
  );
}
