"use server";

import { updateExperienceById } from "@/services/experience";
import { response } from "@/lib/utils";
import { z } from "zod";

const updateExperienceSchema = z.object({
  experience_id: z.string(),
  type: z.string().min(3),
  name: z.string().min(3),
  description: z.string().min(3),
  tools: z.string().array().min(1),
  project_pictures: z.string().array().min(1),
  link: z.string().min(3),
});

export const updateExperience = async (
  payload: z.infer<typeof updateExperienceSchema>
) => {
  const validatedFields = updateExperienceSchema.safeParse(payload);

  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields.",
      },
    });
  }

  const {
    experience_id,
    type,
    name,
    description,
    tools,
    project_pictures,
    link,
  } = validatedFields.data;

  try {
    await updateExperienceById(experience_id, {
      type,
      name,
      description,
      tools,
      project_pictures,
      link,
    });
    return response({
      success: true,
      code: 200,
      message: "Experience created successfully.",
    });
  } catch (error) {
    console.error("Error creating experience:", error);
    return response({
      success: false,
      error: {
        code: 500,
        message: "An error occurred while creating the experience.",
      },
    });
  }
};
