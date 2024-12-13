"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { response } from "@/lib/utils";
import { socialType } from "@prisma/client";

export const postSocial = async (
  value: string,
  key: socialType,
  social_id?: string
) => {
  try {
    const session = await auth();
    if (!session) {
      return response({
        success: false,
        error: {
          code: 401,
          message: "Please login to add URL",
        },
      });
    }

    if (!value.trim()) {
      return response({
        success: false,
        error: {
          code: 400,
          message: "URL cannot be empty",
        },
      });
    }

    let res;
    if (social_id) {
      // Update existing record
      res = await db.social.update({
        where: {
          social_id: social_id,
          gg_id: session.user.gg_id, // Ensure the social belongs to the user
        },
        data: {
          value: value.trim(),
        },
      });
    } else {
      // Check if a record already exists for this social type
      const existing = await db.social.findFirst({
        where: {
          gg_id: session.user.gg_id,
          key: key,
        },
      });

      if (existing) {
        // Update the existing record
        res = await db.social.update({
          where: {
            social_id: existing.social_id,
          },
          data: {
            value: value.trim(),
          },
        });
      } else {
        // Create new record
        res = await db.social.create({
          data: {
            gg_id: session.user.gg_id,
            value: value.trim(),
            key: key,
          },
        });
      }
    }

    return response({
      success: true,
      message: social_id
        ? "Successfully updated URL"
        : "Successfully added URL",
      code: 200,
      data: {
        data: res,
      },
    });
  } catch (error) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Something went wrong",
      },
    });
  }
};

export const getSocialsbyUserId = async (userId: string) => {
  try {
    const response = await db.social.findMany({
      where: {
        gg_id: userId,
      },
    });

    return response;
  } catch (error) {
    console.log(error);
    return null;
  }
};

export const deleteSocial = async (social_id: string) => {
  try {
    const session = await auth();
    if (!session) {
      return response({
        success: false,
        error: {
          code: 401,
          message: "Please login to remove URL",
        },
      });
    }

    await db.social.delete({
      where: {
        social_id: social_id,
        gg_id: session.user.gg_id, // Ensure the social belongs to the user
      },
    });

    return response({
      success: true,
      message: "Successfully removed URL",
      code: 200,
    });
  } catch (error) {
    return response({
      success: false,
      error: {
        code: 500,
        message: "Something went wrong",
      },
    });
  }
};
