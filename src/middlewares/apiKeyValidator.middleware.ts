import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/authencticated.error.js";
import ApiKey from "../models/apiKey.model.js";
interface ICustomRequest extends Request {
  user: { userId: string };
}

export const isAPIKeyValid = async (
  req: ICustomRequest,
  res: Response,
  next: NextFunction
) => {
  const key = "x-krypton-apikey";
  const apiKey = req.headers[key];
  if (!apiKey) {
    throw new UnauthenticatedError(`provide apiKey in ${key} header`, 400);
  }
  const apiKeyDoc = await ApiKey.findOne({ apiKey, isInvalid: false });
  if (!apiKeyDoc) {
    throw new UnauthenticatedError(
      `provide a valid apiKey in ${key} header`,
      400
    );
  }
  req.user = { userId: apiKeyDoc.userId.toString() };
  next();
};

export default isAPIKeyValid;
