import User from "../models/user.model.js";
import { randomBytes } from "node:crypto";

class AuthService {
  #User;
  constructor() {
    this.#User = User;
  }

  async generateApiKey(): Promise<string> {
    return randomBytes(32).toString("hex");
  }

  async register(email: string) {
    let newUser = new this.#User({ email });
    newUser = await newUser.save();
  }
}

export default new AuthService();
