"use server";

import { updateUserById } from "@/services/user";
import { response } from "@/lib/utils";
import { z } from "zod";

const updateProfileSchema = z.object({
  gg_id: z.string(),
  image_urls: z.array(z.string()),
});

export const updateImagesGallery = async (
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

  const { gg_id, image_urls } = validatedFields.data;

  try {
    await updateUserById(gg_id, {
      image_urls,
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
