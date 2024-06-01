import Image from "../models/userUpload.model.js";
import { readFile } from "node:fs/promises";
import { unlinkSync } from "node:fs";
import { join } from "node:path";
export default class ImageService {
  static convertToBase64(buffer: Buffer, mimetype: string): string {
    const b64 = Buffer.from(buffer).toString("base64");
    let dataURI = `data:${mimetype};base64,${b64}`;
    return dataURI;
  }

  static async saveImageAsBase64({
    mimetype,
    userId,
    filename,
  }: {
    mimetype: string;
    userId: string;
    filename: string;
  }) {
    const imagePath = join("uploads", filename);
    const imageBuffer = await readFile(imagePath);
    const base64Image = ImageService.convertToBase64(imageBuffer, mimetype);
    const newImage = new Image({ userId, base64Image });
    await newImage.save();
    const filePath = join("uploads", filename);
    unlinkSync(filePath);
    return { userId: newImage.userId, base64Image };
  }
}
