import { Request, Response } from "express";

export const notFound = (req: Request, res: Response) => {
  res
    .status(404)
    .json({ success: false, msg: `THE REQUESTED RESOURCE CANNOT BE FOUND.` });
};
