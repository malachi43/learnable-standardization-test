import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/badRequest.error.js";
import ImageService from "../services/image.service.js";
interface ICustomRequest extends Request {
  user: { userId: string };
  filename: string;
}

export default class ImageController {
  static async saveImageAsBase64(req: ICustomRequest, res: Response) {
    if (!req.file) {
      throw new BadRequestError(`please select a file to upload.`, 400);
    }

    const { mimetype, buffer } = req.file;

    const { userId } = req.user;
    const imageDoc = await ImageService.saveImageAsBase64({
      mimetype,
      userId,
      buffer,
    });
    res.status(200).json({ data: imageDoc });
  }

  static async getSingleImage(req: Request, res: Response) {
    const id = req.params?.id;
    const image = await ImageService.getSingleImage(id);
    res.status(200).json({ data: image });
  }

  static async getAllImages(req: Request, res: Response) {
    const images = await ImageService.getAllImages();
    res.status(200).json({ data: images });
  }
}
