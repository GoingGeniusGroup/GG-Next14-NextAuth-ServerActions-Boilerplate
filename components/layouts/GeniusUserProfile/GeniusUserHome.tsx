import AboutSection from "../console/AboutSection";
import BottomSection from "../console/BottomSection";
import GeniusUserAvatar from "./GeniusUserAvatar";

export default function GeniusUserHome({ username }: { username: string }) {
  const newsItems = [
    {
      title: "Project 1",
      image:
        "https://www.simplilearn.com/ice9/free_resources_article_thumb/project_management_coursefees.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 2",
      image:
        "https://www.shutterstock.com/image-photo/project-manager-working-on-computer-600nw-2002388855.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 3",
      image:
        "https://www.michaelpage.com.au/sites/michaelpage.com.au/files/2022-06/IT%20Project%20Manager.jpg",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
    {
      title: "Project 4",
      image:
        "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcR1qLr3cR3-yr-1UaLFYoIKDw3gl5FJbBjCxA&s",
      description:
        "A technology company that builds economic infrastructure for the internet.",
      link: "#",
    },
  ];

  const aboutGenius = {
    name: username,
    description:
      "Stay up to date with the latest Ram news, updates, and item shop releases. Get information about upcoming collaborations and special events. Stay up to date with the latest Fortnite news, updates, and item shop releases. Get information about upcoming collaborations and special events.",
    guild: "VAJRA",
    age: 25,
  };
  return (
    <>
      <AboutSection aboutUser={aboutGenius} />
      <div className="absolute top-2 right-2">
        <GeniusUserAvatar />
      </div>
      {/* Projects Grid */}
      <BottomSection items={newsItems} />
    </>
  );
}
