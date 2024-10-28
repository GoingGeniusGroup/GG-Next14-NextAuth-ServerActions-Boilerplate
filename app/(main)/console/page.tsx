import AboutSection from "@/components/comp/console/AboutSection";
import BottomSection from "@/components/comp/console/BottomSection";

interface AboutItemProp {
  name: string;
  faculty: string;
  guild?: "BUDDHA" | "VAJRA" | "PADMA" | "RATNA" | "KARMA";
  age?: number;
  email: string;
  username: string;
  description: string;
  updatedAt?: string;
}

export default function ConsolePage() {
  const aboutItem: AboutItemProp = {
    name: "Official Fortnite Genius",
    description:
      "Stay up to date with the latest Fortnite news, updates, and item shop releases. Get information about upcoming collaborations and special events. Stay up to date with the latest Fortnite news, updates, and item shop releases. Get information about upcoming collaborations and special events.",
    updatedAt: "4 hours ago",
    age: 20,
    faculty: "Science",
    guild: "BUDDHA",
    email: "johndoe@example.com",
    username: "johndoe",
  };

  return (
    <div className="mt-5">
      <AboutSection aboutUser={aboutItem} />
      {/* News Grid */}
      <BottomSection username="ram" />
    </div>
  );
}
