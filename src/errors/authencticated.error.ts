import { CustomError } from "./customError.error.js";

export class UnauthenticatedError extends CustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
