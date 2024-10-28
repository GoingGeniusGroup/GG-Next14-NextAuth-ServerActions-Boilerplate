import { db } from "@/lib/db";

import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function createExperience(
  experience_id: string,
  data: any,
  user: any
) {
  const {
    type,
    name,
    description,
    tools,
    project_skills,
    project_pictures,
    link,
    users,
  } = data;

  try {
    const experience = await prisma.experience.create({
      data: {
        experience_id,
        gg_id: user.gg_id,
        type,
        name,
        description,
        tools,
        project_skills,
        project_pictures,
        link,
        users: {
          connect: {
            gg_id: user.gg_id,
          },
        },
      },
    });

    return experience;
  } catch (error) {
    console.error("Error creating experience:", error);
    throw error;
  }
}

export async function updateExperienceById(experience_id: string, data: any) {
  try {
    const updatedExperience = await prisma.experience.update({
      where: {
        experience_id,
      },
      data,
    });

    return updatedExperience;
  } catch (error) {
    console.error("Error updating experience:", error);
    throw error;
  }
}

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
