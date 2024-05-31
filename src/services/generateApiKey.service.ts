import { randomBytes } from "node:crypto";
import ApiKey from "../models/apiKey.model.js";

export default class ApiKeyService {
  static async generateApiKey(userId: string): Promise<string> {
    const apiKey = randomBytes(32).toString("hex");
    const user = await ApiKey.findOne({ userId });
    if (user) return `Api key can only be viewed once`;
    const newApiKey = new ApiKey({ apiKey, userId });
    await newApiKey.save();
    return apiKey;
  }
}
