import AboutSection from "@/components/layouts/console/AboutSection";
import BottomSection from "@/components/layouts/console/BottomSection";
import GeniusUserAvatar from "@/components/layouts/GeniusUserProfile/GeniusUserAvatar";

export default function GeniusProfilePage() {
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
        "https://cms.imgworlds.com/assets/a5366382-0c26-4726-9873-45d69d24f819.jpg?key=home-gallery",
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

  const aboutGenius = {
    name: "Official Ramen Genius",
    description:
      "Stay up to date with the latest Ram news, updates, and item shop releases. Get information about upcoming collaborations and special events. Stay up to date with the latest Fortnite news, updates, and item shop releases. Get information about upcoming collaborations and special events.",
    updatedAt: "14 hours ago",
  };

  return (
    <div className="relative mt-5">
      <AboutSection aboutUser={aboutGenius} />
      <div className="absolute top-[-70px] right-6">
        <GeniusUserAvatar />
      </div>
      {/* News Grid */}
      <BottomSection items={newsItems} />
    </div>
  );
}
