import { getCurrentUser } from "@/actions/userAndGuild";
import GeniusUserProjects from "@/components/comp/GeniusUserProfile/GeniusUserProjects";
import { getExperiencesByUserId } from "@/services/experience";
import { getUserByUsername } from "@/services/user";
import { IconClipboardCopy } from "@tabler/icons-react";

interface GeniusUserProjectProps {
  params: {
    username: string;
  };
}

export default async function GeniusUserProject({
  params,
}: GeniusUserProjectProps) {
  const { username } = params;

  const currentUser = await getCurrentUser();

  const LoggedUserProfile = currentUser?.username === username;

  const profileOwner = await getUserByUsername(username);

  const gg_id = LoggedUserProfile
    ? currentUser?.gg_id
    : profileOwner?.gg_id ?? "";

  const experiences = await getExperiencesByUserId(gg_id);

  return (
    <>
      <GeniusUserProjects
        userInfo={{
          gg_id: gg_id,
        }}
        items={experiences.map((exp) => ({
          title: exp.name ?? "Untitled",
          description: exp.description ?? "No description available",
          image: "https://default-image-url.com/default.jpg", // Replace with a default image URL
          icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />, // Replace with a default icon
          type: exp.type ?? "Unknown", // Ensure type is a string
          link: exp.link ?? "", // Ensure link is a string
          tools: exp.tools,
          experience_id: exp.experience_id,
        }))}
      />
    </>
  );
}
