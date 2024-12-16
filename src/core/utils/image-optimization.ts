import sharp from "sharp";
import path from "path";
import { promises as fs } from "fs";

export async function optimizeImage(imageBuffer: Buffer, width: number) {
  return sharp(imageBuffer)
    .resize(width, null, {
      withoutEnlargement: true,
      fit: "inside",
    })
    .webp({ quality: 80 })
    .toBuffer();
}
