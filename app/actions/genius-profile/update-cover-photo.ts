"use server";

import { updateUserById } from "@/services/user";
import { response } from "@/lib/utils";
import { z } from "zod";

const updateCoverPhotoSchema = z.object({
  gg_id: z.string(),
  cover_images: z.array(z.string()),
});

export const updateCoverPhoto = async (
  payload: z.infer<typeof updateCoverPhotoSchema>
) => {
  const validatedFields = updateCoverPhotoSchema.safeParse(payload);
  if (!validatedFields.success) {
    return response({
      success: false,
      error: {
        code: 422,
        message: "Invalid fields.",
      },
    });
  }

  const { gg_id, cover_images } = validatedFields.data;

  try {
    await updateUserById(gg_id, {
      cover_images,
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
