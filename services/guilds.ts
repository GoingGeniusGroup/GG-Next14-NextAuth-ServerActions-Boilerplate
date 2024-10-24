import { db } from "@/lib/db";
import { Prisma } from "@prisma/client";

export const createGuild = async (data: Prisma.guildsCreateInput) => {
  try {
    const guild = await db.guilds.create({
      data,
    });
    return guild;
  } catch (error) {
    console.error("Error in createGuild:", error);
    return null;
  }
};

export const getGuildById = async (id: string) => {
  try {
    const guild = await db.guilds.findUnique({
      where: { id },
    });
    return guild;
  } catch (error) {
    console.error("Error in getGuildById:", error);
    return null;
  }
};

export const getGuildByName = async (guild_name: string) => {
  try {
    const guild = await db.guilds.findUnique({
      where: { guild_name },
    });
    return guild;
  } catch (error) {
    console.error("Error in getGuildByName:", error);
    return null;
  }
};

export const updateGuild = async (
  id: string,
  data: Prisma.guildsUpdateInput
) => {
  try {
    const guild = await db.guilds.update({
      where: { id },
      data,
    });
    return guild;
  } catch (error) {
    console.error("Error in updateGuild:", error);
    return null;
  }
};

export const deleteGuild = async (id: string) => {
  try {
    const guild = await db.guilds.delete({
      where: { id },
    });
    return guild;
  } catch (error) {
    console.error("Error in deleteGuild:", error);
    return null;
  }
};

export const getAllGuilds = async () => {
  try {
    const guilds = await db.guilds.findMany();
    return guilds;
  } catch (error) {
    console.error("Error in getAllGuilds:", error);
    return [];
  }
};
