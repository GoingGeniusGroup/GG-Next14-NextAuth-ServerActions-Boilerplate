import { getCurrentUser } from "@/actions/genius-profile/userAndGuild";
import GeniusUserProjectsV2 from "@/components/comp/GeniusUserProfile/GeniusUserProjectsV2";
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
      {experiences.length === 0 && (
        <div className="text-center text-lg text-yellow-600 uppercase font-semibold">
          No projects found
        </div>
      )}
      <GeniusUserProjectsV2
        userInfo={{
          gg_id: gg_id,
        }}
        LoggedUserProfile={LoggedUserProfile}
        items={experiences.map((exp) => ({
          title: exp.name ?? "Untitled",
          description: exp.description ?? "No description available",
          image: exp.project_pictures[0] ?? "/default-pictures/cover-image.png",
          icon: <IconClipboardCopy className="h-4 w-4 text-neutral-500" />,
          type: exp.type ?? "Unknown",
          link: exp.link ?? "",
          tools: exp.tools,
          project_skills: exp.project_skills ?? [],
          experience_id: exp.experience_id,
        }))}
      />
    </>
  );
}
