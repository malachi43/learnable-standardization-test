import apiKeyService from "../services/generateApiKey.service.js";
import { Request, Response } from "express";

class AuthController {
  async generateApiKey(req: Request, res: Response) {
    const apiKey = await apiKeyService.generateApiKey();
    res.status(200).json({ success: true, apiKey });
  }
}

export default new AuthController();
