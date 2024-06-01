import { Request, Response, NextFunction } from "express";
import { BadRequestError } from "../errors/badRequest.error.js";
import ImageService from "../services/image.service.js";
import { readFile } from "fs/promises";
import { join } from "node:path";
interface ICustomRequest extends Request {
  user: { userId: string };
  filename: string;
}

export default class ImageController {
  static async saveImageAsBase64(req: ICustomRequest, res: Response) {
    console.log(req.file);
    if (!req.file) {
      throw new BadRequestError(`please select a file to upload.`, 400);
    }
    
    const { mimetype, filename } = req.file;

    const { userId } = req.user;
    const imageDoc = await ImageService.saveImageAsBase64({
      mimetype,
      userId,
      filename,
    });
    res.status(200).json({ data: imageDoc });
  }
}
