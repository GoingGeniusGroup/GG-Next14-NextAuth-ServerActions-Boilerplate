import { createExperience, updateExperienceById } from "@/services/experience";
import { z } from "zod";

const experienceSchema = z.object({
  experience_id: z.string().optional(),
  gg_id: z.string(),
  type: z.string().min(3),
  name: z.string().min(3),
  description: z.string().min(3),
  tools: z.array(z.string()).min(1),
  skills: z.array(z.string()).min(1),
  project_pictures: z.array(z.string()).min(1),
  link: z.string().url(),
});

export async function addExperience(
  formData: z.infer<typeof experienceSchema>
) {
  try {
    const validatedData = experienceSchema.parse(formData);

    if (validatedData.experience_id) {
      // Update existing experience
      const updated = await updateExperienceById(validatedData.experience_id, {
        type: validatedData.type,
        name: validatedData.name,
        description: validatedData.description,
        tools: validatedData.tools,
        project_skills: validatedData.skills,
        project_pictures: validatedData.project_pictures,
        link: validatedData.link,
      });

      if (!updated) {
        throw new Error("Failed to update experience");
      }

      return { success: true };
    } else {
      // Create new experience
      const created = await createExperience({
        gg_id: validatedData.gg_id,
        type: validatedData.type,
        name: validatedData.name,
        description: validatedData.description,
        tools: validatedData.tools,
        project_skills: validatedData.skills,
        project_pictures: validatedData.project_pictures,
        link: validatedData.link,
      });

      if (!created) {
        throw new Error("Failed to create experience");
      }

      return { success: true };
    }
  } catch (error) {
    console.error("Error adding experience:", error);
    if (error instanceof z.ZodError) {
      return {
        success: false,
        error: {
          message:
            "Validation error: " +
            error.errors.map((e) => e.message).join(", "),
        },
      };
    }
    return {
      success: false,
      error: {
        message:
          error instanceof Error ? error.message : "Internal server error.",
      },
    };
  }
}
