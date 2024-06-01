import Image from "../models/userUpload.model.js";
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
    buffer,
  }: {
    mimetype: string;
    userId: string;
    buffer: Buffer;
  }) {
    const base64Image = ImageService.convertToBase64(buffer, mimetype);
    const newImage = new Image({ userId, base64Image });
    await newImage.save();
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
