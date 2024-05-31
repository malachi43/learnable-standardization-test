import Image from "../models/userUpload.model.js";
export default class ImageService {
  static convertToBase64(buffer: Buffer, mimetype: string): string {
    const b64 = Buffer.from(buffer).toString("base64");
    let dataURI = `data:${mimetype};base64,${b64}`;
    return dataURI;
  }

  static async saveImageAsBase64({
    buffer,
    mimetype,
    userId,
  }: {
    buffer: Buffer;
    mimetype: string;
    userId: string;
  }) {
    const base64Image = ImageService.convertToBase64(buffer, mimetype);
    const newImage = new Image({ userId, base64Image });
    await newImage.save();
    return { userId: newImage.userId, base64Image };
  }
}
