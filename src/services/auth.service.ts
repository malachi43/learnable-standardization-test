import User from "../models/user.model.js";
import { IUser } from "../interfaces/user.interface.js";
import otpService from "./generateOTP.service.js";
import emailService from "./email.service.js";
import Otp from "../models/otp.model.js";
import { BadRequestError } from "../errors/badRequest.error.js";
import { sign } from "jsonwebtoken";

class AuthService {
  #User;
  constructor() {
    this.#User = User;
  }

  async register(email: string): Promise<IUser> {
    let newUser = new this.#User({ email });
    newUser = await newUser.save();
    newUser = { email: newUser.email };
    return newUser;
  }

  async sendLoginOTP(
    email: string
  ): Promise<{ success: boolean; msg: string }> {
    const user = await this.#User.findOne({ email });

    if (!user) throw new BadRequestError(`email does not exist`, 400);

    const otp = otpService.generateOTP();
    const duration = 1000 * 60 * 5; //5 minutes.
    const otpExpirationTime = new Date(Date.now() + duration).getTime();

    let newOtp = new Otp({ otpExpirationTime, userId: user._id, otp });
    await newOtp.save();

    const result = await emailService.sendOTPEmail({
      from: "chibuikeuko@gmail.com",
      to: `${user.email}`,
      subject: "OTP verification",
      content: `provide this OTP:${otp} to complete your login process.`,
    });
    console.log(result);
    return { success: true, msg: result };
  }

  async createLoginToken(otp: number): Promise<string> {
    const userOtp = await Otp.findOne({ otp });

    if (!userOtp) throw new BadRequestError(`invalid OTP`, 400);

    const { otpExpirationTime, userId } = userOtp;

    const now = Date.now();

    if (otpExpirationTime > now) {
      const token = sign({ userId: userId.toString() }, process.env.JWT_SECRET);
      await Otp.deleteOne({ userId });
      return token;
    } else {
      const message = `your OTP has expired.`;
      return message;
    }
  }
}

export default new AuthService();
