"use server";

import { updateUserById } from "@/services/user";
import { response } from "@/lib/utils";
import { z } from "zod";

const updateProfileSchema = z.object({
  gg_id: z.string(),
  // email: z.string().email(),
  first_name: z.string().min(3),
  last_name: z.string().min(3),
  address: z.string().min(3),
  description: z.string().min(3),
  dob: z.date().nullable(),
});

export const updateProfile = async (
  payload: z.infer<typeof updateProfileSchema>
) => {
  const validatedFields = updateProfileSchema.safeParse(payload);
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields.",
      },
    });
  }

  const { gg_id, first_name, last_name, description, address, dob } =
    validatedFields.data;

  try {
    await updateUserById(gg_id, {
      first_name,
      last_name,
      description,
      address,
      dob,
    });
    return response({
      success: true,
      code: 200,
      message: "Profile updated successfully.",
    });
  } catch (error) {
    console.error("Error updating profile:", error);
    return response({
      success: false,
      error: {
        code: 500,
        message: "An error occurred while updating the profile.",
      },
    });
  }
};
