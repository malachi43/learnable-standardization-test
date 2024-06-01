import { Request, Response, NextFunction } from "express";
import { UnauthenticatedError } from "../errors/authencticated.error.js";
import jwt from "jsonwebtoken";

interface ICustomRequest extends Request {
  user: {};
}

interface IUserPayload {
  user: { userId: string; iat: string };
}

const isAuth = (req: ICustomRequest, res: Response, next: NextFunction) => {
  try {
    const bearerToken = req.headers["authorization"];
    const token = bearerToken.split(" ")[1];
    const userData = jwt.verify(token, process.env.JWT_SECRET);
    req.user = userData;
    next();
  } catch (error) {
    throw new UnauthenticatedError(`token is missing or invalid.`, 401);
  }
};

export default isAuth;
