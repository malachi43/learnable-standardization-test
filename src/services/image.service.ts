import Image from "../models/userUpload.model.js";
import { readFile } from "node:fs/promises";
import { unlinkSync } from "node:fs";
import { join } from "node:path";
import { BadRequestError } from "../errors/badRequest.error.js";
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

  static async getAllImages(): Promise<{}[]> {
    const images = await Image.find({});
    return images;
  }

  static async getSingleImage(imageId: string): Promise<{}> {
    const image = await Image.findOne({ _id: imageId });
    if (!image) {
      throw new BadRequestError(`no base64Image with this id:${imageId}`, 400);
    }
    return image;
  }
}
