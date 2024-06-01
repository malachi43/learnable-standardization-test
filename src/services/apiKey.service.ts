import { randomBytes } from "node:crypto";
import ApiKey from "../models/apiKey.model.js";

export default class ApiKeyService {
  static async generateApiKey(userId: string): Promise<string> {
    const apiKey = randomBytes(32).toString("hex");
    let user = await ApiKey.findOne({ userId });
    if (user && user.isInvalid) {
      await ApiKey.deleteOne({ userId });
      //this allow invalidated apiKey to be re-genreated upon request
      user = null;
    }
    if (user) return `Api key can only be viewed once`;
    const newApiKey = new ApiKey({ apiKey, userId });
    await newApiKey.save();
    return apiKey;
  }
  static async invalidateApiKey(userId: string) {
    const user = await ApiKey.findOne({ userId });
    user.isInvalid = true;
    await user.save();
    return { success: true };
  }
}
