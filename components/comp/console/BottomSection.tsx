import { HoverEffect2 } from "@/components/ui/card/card-hover-effect2";
import { getCurrentUser } from "@/actions/userAndGuild";
import { getUserByUsername } from "@/services/user";
import SmallPreviewCard from "../card/SmallPreviewCard";
import GGCard from "../card/GGCard";

interface BottomSectionProps {
  username: string;
}

export default async function BottomSection({ username }: BottomSectionProps) {
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

  const currentUser = await getCurrentUser();

  const LoggedUserProfile = currentUser?.username === username;

  const profileOwner = await getUserByUsername(username);

  console.log("currentUser", currentUser);

  return (
    <>
      <div className="w-full relative border flex gap-2 p-2 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <div className="h-[116px] flex items-center justify-center w-full">
          <SmallPreviewCard
            userData={LoggedUserProfile ? currentUser : profileOwner}
          />
        </div>
        {/* <GGCard userData={LoggedUserProfile ? currentUser : profileOwner} /> */}
        <div className="h-[116px] w-full bg-white/20 rounded-md"></div>
      </div>
      <div className="w-full relative border p-2 mt-4 rounded-xl backdrop-blur-md border-black/10 dark:border-white/10 dark:hover:border-[#FCBB3F]/60 hover:border-sky-500/60 transition-all duration-200 ease-in-out">
        <HoverEffect2 items={newsItems} />
      </div>
    </>
  );
}
