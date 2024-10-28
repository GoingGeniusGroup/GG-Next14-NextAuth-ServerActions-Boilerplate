"use server";

import { createExperience } from "@/services/experience";
import { response } from "@/lib/utils";
import { z } from "zod";

const addExperienceSchema = z.object({
  gg_id: z.string(),
  type: z.string().min(3),
  name: z.string().min(3),
  description: z.string().min(3),
  tools: z.string().array().min(1),
  project_skills: z.string().array().min(1),
  project_pictures: z.string().array().min(1),
  link: z.string().min(3),
});

export const addExperience = async (
  payload: z.infer<typeof addExperienceSchema>
) => {
  const validatedFields = addExperienceSchema.safeParse(payload);

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
    type,
    name,
    description,
    tools,
    project_skills,
    project_pictures,
    link,
  } = validatedFields.data;

  // Create an experience ID (you might want to replace this with your own logic)
  const experience_id = `exp_${Date.now()}`; // Example logic for generating an ID

  try {
    await createExperience(
      experience_id,
      {
        type,
        name,
        description,
        tools: tools.join(","),
        project_pictures: project_pictures.join(","),
        link,
      },
      {
        type,
        name,
        description,
        tools,
        project_skills,
        project_pictures,
        link,
        users: {
          create: undefined,
          connectOrCreate: undefined,
          connect: undefined,
        },
      }
    );
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
        message: "Internal server error.",
      },
    });
  }
};
