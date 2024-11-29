"use server";

import { auth } from "@/auth";
import { db } from "@/lib/db";
import { response } from "@/lib/utils";
import { socialType } from "@prisma/client";

export const postSocial = async (value: string, key: socialType) => {
  try {
    const session = await auth();
    if (!session) {
      return response({
        success: false,

        error: {
          code: 500,
          message: "please login to add url",
        },
      });
    }

    const res = await db.social.create({
      data: {
        gg_id: session.user.gg_id,
        value: value,
        key: key,
      },
    });

    return response({
      success: true,
      message: `successfully added ${key} url`,
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
        message: "something went wrong",
      },
    });
  }
};

export const getSocialsbyUserId = async () => {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }

    const response = await db.social.findMany({
      where: {
        gg_id: session.user.gg_id,
      },
    });

    return response;
  } catch (error) {
    console.log(error);

    return null;
  }
};

export const updateSocialsbyUserId = async (value:string,social_id:string) => {
  try {
    const session = await auth();
    if (!session) {
      return null;
    }

    await db.social.update({
      where: {
        
        social_id: social_id,
       
      },
      data: {
        value: value,
      },
    });

    return response({
      success: true,
      message: `successfully updated the url`,
      code: 200,
    });
  } catch (error) {
    console.log(error);

    return null;
  }
};
