import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createExperience = async (data: Prisma.experienceCreateInput) => {
  try {
    const { project_skills } = data;
    console.log("skills here --->", project_skills);
    const experience = await db.experience.create({
      data,
    });
    const skills = experience.project_skills;
    await Promise.all(
      skills.map(async (skill) => {
        return await db.skills.create({
          data: {
            skill_name: skill,
            skill_percentage: 0,
            gg_id: experience.gg_id,
            experience_id: experience.experience_id,
          },
        });
      })
    );
    return experience;
  } catch (error) {
    console.error("Error in createExperience:", error);
    return null;
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

export const updateExperience = async (
  experience_id: string,
  data: Prisma.experienceUpdateInput
) => {
  try {
    const experience = await db.experience.update({
      where: { experience_id },
      data,
    });
    return experience;
  } catch (error) {
    console.error("Error in updateExperience:", error);
    return null;
  }
};

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
