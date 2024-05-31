import apiKeyService from "../services/generateApiKey.service.js";
import authService from "../services/auth.service.js";
import { Request, Response } from "express";
import { BadRequestError } from "../errors/badRequest.error.js";

interface ICustomRequest extends Request {
  user: { userId: string };
}
class AuthController {
  async generateApiKey(req: ICustomRequest, res: Response) {
    const { userId } = req.user;
    const apiKey = await apiKeyService.generateApiKey(userId);
    res
      .status(200)
      .json({ success: true, apiKey});
  }

  async register(req: Request, res: Response) {
    const email = req.body?.email;
    console.log(req.body);
    if (!email) throw new BadRequestError(`provide an email`, 400);
    const newUser = await authService.register(email);
    res.status(201).json({ success: true, data: newUser });
  }

  async sendLoginOTP(req: Request, res: Response) {
    const email = req.body?.email;
    console.log(req.body);
    if (!email) throw new BadRequestError(`provide an email`, 400);
    const result = await authService.sendLoginOTP(email);
    res.status(200).json(result);
  }

  async createLoginToken(req: Request, res: Response) {
    const otp = req.body?.otp;
    if (!otp) throw new BadRequestError(`provide an otp`, 400);
    const data = await authService.createLoginToken(otp);
    res.status(200).json({ data });
  }
}

export default new AuthController();
