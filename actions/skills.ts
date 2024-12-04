"use server";

import { auth } from "@/auth";
import { response } from "@/lib/utils";
import {
  createSkills,
  getSkillsById,
  getSkillsByUserId,
  updateSkills,
  deleteSkills,
} from "@/services/skills";
import { skills } from "@prisma/client";
import { Response } from "@/types";
import { z } from "zod";

const skillsSchema = z.object({
  skill_name: z.string(),
  skill_percentage: z.number(),
  certifications: z.array(z.string()).optional(),
});

export const addSkills = async (
  formData: FormData
): Promise<Response<skills>> => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const validatedFields = skillsSchema.safeParse({
    skill_name: formData.get("skill_name"),
    skill_percentage: formData.get("skill_percentage"),
    certifications: formData.getAll("certifications"),
  });

  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields",
      },
    });
  }

  const newSkills = await createSkills({
    ...validatedFields.data,
    users: {
      connect: { gg_id: session.user.gg_id },
    },
  });

  if (!newSkills) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Error creating new skills",
      },
    });
  }

  return response<skills>({
    success: true,
    code: 201,
    message: "Skills created successfully",
    data: newSkills,
  });
};

export const getUserSkills = async (): Promise<Response<skills[]>> => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const skills = await getSkillsByUserId(session.user.gg_id);

  return response<skills[]>({
    success: true,
    code: 200,
    message: "Skills fetched successfully",
    data: skills,
  });
};

export const updateUserSkills = async (
  skillsId: string,
  formData: FormData
): Promise<Response<skills>> => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const validatedFields = skillsSchema.safeParse({
    skill_name: formData.get("skill_name"),
    skill_percentage: formData.get("skill_percentage"),
    certifications: formData.getAll("certifications"),
  });

  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields",
      },
    });
  }

  const updatedSkills = await updateSkills(skillsId, {
    ...validatedFields.data,
  });

  if (!updatedSkills) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Error updating skills",
      },
    });
  }

  return response<skills>({
    success: true,
    code: 200,
    message: "Skills updated successfully",
    data: updatedSkills,
  });
};

export const deleteUserSkills = async (
  skillsId: string
): Promise<Response<skills>> => {
  const session = await auth();
  if (!session?.user?.gg_id) {
    return response({
      success: false,
      error: {
        code: 401,
        message: "Unauthorized",
      },
    });
  }

  const deletedSkills = await deleteSkills(skillsId);

  if (!deletedSkills) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Error deleting skills",
      },
    });
  }

  return response<skills>({
    success: true,
    code: 200,
    message: "Skills deleted successfully",
    data: deletedSkills,
  });
};

export const getSkill = async (skillId: string): Promise<Response<skills>> => {
  const skill = await getSkillsById(skillId);

  if (!skill) {
    return response({
      success: false,
      error: {
        code: 404,
        message: "Skill not found",
      },
    });
  }

  return response<skills>({
    success: true,
    code: 200,
    message: "Skill fetched successfully",
    data: skill,
  });
};
