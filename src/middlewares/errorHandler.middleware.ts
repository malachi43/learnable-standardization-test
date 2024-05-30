import { Request, Response, NextFunction } from "express";

interface ICustomError extends Error {
  statusCode: number;
}

export const errorHandler = (
  err: ICustomError,
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const errorObj = {
    errorMsg: err.message || "INTERNAL SERVER ERROR",
    errorCode: err.statusCode || 500,
  };
  if (res.headersSent) return next(err);
  res
    .status(errorObj.errorCode)
    .json({ success: false, msg: errorObj.errorMsg });
};
