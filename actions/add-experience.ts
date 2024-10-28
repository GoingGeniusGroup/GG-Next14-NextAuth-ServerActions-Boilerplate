import { createExperience, updateExperienceById } from "@/services/experience";

export async function addExperience(formData: any) {
  const {
    experience_id,
    gg_id,
    type,
    name,
    description,
    tools,
    skills,
    project_pictures,
    link,
  } = formData;

  try {
    if (experience_id) {
      await updateExperienceById(experience_id, {
        type,
        name,
        description,
        tools: tools.join(","),
        project_skills: skills.join(","),
        project_pictures: project_pictures.join(","),
        link,
      });
      return { success: true };
    } else {
      await createExperience(
        `exp_${Date.now()}`,
        {
          type,
          name,
          description,
          tools: tools.join(","),
          project_skills: skills.join(","),
          project_pictures: project_pictures.join(","),
          link,
        },
        {
          gg_id: gg_id,
        }
      );
      return { success: true };
    }
  } catch (error) {
    console.error("Error adding experience:", error);
    return { success: false, error: { message: "Internal server error." } };
  }
}
