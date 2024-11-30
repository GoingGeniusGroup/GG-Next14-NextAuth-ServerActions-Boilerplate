"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { updateUserById } from "@/services/user";
import { response } from "@/lib/utils";
import { z } from "zod";

export const getImageUrls = async (isu: boolean = true, gg_id?: string) => {
  try {
    const session = await auth();

    // If isu is true, use logged-in user's ID, otherwise use provided gg_id
    const userId = isu ? session?.user.gg_id : gg_id;

    // Return null if no valid user ID is available
    if (!userId) {
      return null;
    }

    const imgeObj = await db.imagePost.findMany({
      where: {
        gg_id: userId,
      },
    });

    return imgeObj;
  } catch (error) {
    console.error("Error fetching image URLs:", error);
    return null;
  }
};

export const removeImage = async (
  gg_id: string,
  img_id: string,
  index: number
) => {
  const user = await db.user.findUnique({ where: { gg_id: gg_id } });
  const image_urls = user?.image_urls;
  await db.imagePost.delete({ where: { img_id: img_id } });
  await db.user.update({
    where: { gg_id: user?.gg_id },
    data: {
      image_urls: image_urls?.splice(index, 1),
    },
  });
};

const updateProfileSchema = z.object({
  gg_id: z.string().nonempty("User ID is required."),
  image_urls: z.array(z.string().url("Invalid URL format.")),
  imageposts: z.array(
    z.object({
      image_url: z.string().url("Invalid URL format."),
      caption: z.string().optional(),
      description: z.string().optional(),
    })
  ),
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

  const { gg_id, image_urls, imageposts } = validatedFields.data;

  try {
    const res = await db.imagePost.createMany({
      data: imageposts.map((post) => ({
        gg_id: gg_id,
        image_url: post.image_url,
        caption: post.caption!,
        description: post.description,
      })),
      skipDuplicates: true,
    });

    await updateUserById(gg_id, {
      image_urls,
    });
    if (!res) {
      return response({
        success: false,
        error: {
          code: 500,
          message: "An error occurred while uploading the image.",
        },
      });
    }
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
