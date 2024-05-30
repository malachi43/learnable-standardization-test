import { CustomError } from "./customError.error.js";

export class BadRequestError extends CustomError {
  constructor(message: string, statusCode: number) {
    super(message, statusCode);
  }
}
