import { randomBytes } from "node:crypto";

export default class ApiKeyService {
  static async generateApiKey(): Promise<string> {
    return randomBytes(32).toString("hex");
  }
}
