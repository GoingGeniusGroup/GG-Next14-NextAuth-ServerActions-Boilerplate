import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createExperience = async (data: {
  gg_id: string;
  type?: string;
  name?: string;
  description?: string;
  tools: string[];
  project_skills: string[];
  project_pictures: string[];
  link?: string;
}) => {
  try {
    const experience = await db.experience.create({
      data: {
        users: {
          connect: {
            gg_id: data.gg_id,
          },
        },
        type: data.type,
        name: data.name,
        description: data.description,
        tools: data.tools,
        project_skills: data.project_skills,
        project_pictures: data.project_pictures,
        link: data.link,
      },
    });
    return experience;
  } catch (error) {
    console.error("Error in createExperience:", error);
    throw error;
  }
};

export const updateExperienceById = async (
  experience_id: string,
  data: Omit<Prisma.experienceUpdateInput, "users">
) => {
  try {
    const experience = await db.experience.update({
      where: { experience_id },
      data: {
        type: data.type,
        name: data.name,
        description: data.description,
        tools: Array.isArray(data.tools) ? data.tools : [],
        project_skills: Array.isArray(data.project_skills)
          ? data.project_skills
          : [],
        project_pictures: Array.isArray(data.project_pictures)
          ? data.project_pictures
          : [],
        link: data.link,
      },
    });
    return experience;
  } catch (error) {
    console.error("Error in updateExperience:", error);
    throw error;
  }
};

export const getExperienceById = async (experience_id: string) => {
  try {
    const experience = await db.experience.findUnique({
      where: { experience_id },
    });
    return experience;
  } catch (error) {
    console.error("Error in getExperienceById:", error);
    return null;
  }
};

export const getExperiencesByUserId = async (gg_id: string) => {
  try {
    const experiences = await db.experience.findMany({
      where: { gg_id },
    });
    return experiences;
  } catch (error) {
    console.error("Error in getExperiencesByUserId:", error);
    return [];
  }
};

// export const updateExperienceById = async (
//   experience_id: string,
//   data: Prisma.experienceUpdateInput
// ) => {
//   try {
//     const experience = await db.experience.update({
//       where: { experience_id },
//       data,
//     });
//     return experience;
//   } catch (error) {
//     console.error("Error in updateExperience:", error);
//     return null;
//   }
// };

export const deleteExperience = async (experience_id: string) => {
  try {
    const experience = await db.experience.delete({
      where: { experience_id },
    });
    return experience;
  } catch (error) {
    console.error("Error in deleteExperience:", error);
    return null;
  }
};

export const getAllExperiences = async () => {
  try {
    const experiences = await db.experience.findMany();
    return experiences;
  } catch (error) {
    console.error("Error in getAllExperiences:", error);
    return [];
  }
};
