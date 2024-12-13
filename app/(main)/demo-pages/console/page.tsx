import AboutSection from "@/src/components/comp/console/AboutSection";
import BottomSectionConsole from "@/src/components/comp/console/BottomSectionConsole";

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
  const newsItems = [
    {
      title: "Spider-Man No Way Home",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTc9APxkj0xClmrU3PpMZglHQkx446nQPG6lA&s",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Fortnite Festival",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "New Battle Pass",
      image:
        "https://dfstudio-d420.kxcdn.com/wordpress/wp-content/uploads/2019/06/digital_camera_photo-1080x675.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Rocket Racing",
      image:
        "https://img.freepik.com/free-photo/abstract-autumn-beauty-multi-colored-leaf-vein-pattern-generated-by-ai_188544-9871.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
  ];

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
      <BottomSectionConsole items={newsItems} />
    </div>
  );
}
