import { Request, Response, NextFunction } from "express";
import Image from "../models/userUpload.model.js";
import { BadRequestError } from "../errors/badRequest.error.js";
import ImageService from "../services/image.service.js";

interface ICustomRequest extends Request {
  user: { userId: string };
}

class ImageController {
  async saveImageAsBase64(req: ICustomRequest, res: Response) {
    if (!req.file) {
      throw new BadRequestError(`please select a file to upload.`, 400);
    }
    const { buffer, mimetype } = req.file;
    const { userId } = req.user;
    const imageDoc = await ImageService.saveImageAsBase64({
      buffer,
      mimetype,
      userId,
    });
    res.status(200).json({ data: imageDoc });
  }
}
