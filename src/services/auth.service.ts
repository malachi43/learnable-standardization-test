import User from "../models/user.model.js";
import { IUser } from "../interfaces/user.interface.js";
import otpService from "./generateOTP.service.js";
import EmailService from "./email.service.js";
import Otp from "../models/otp.model.js";
import { BadRequestError } from "../errors/badRequest.error.js";
import jwt from "jsonwebtoken";

class AuthService {
  #User;
  constructor() {
    this.#User = User;
  }

  async register(email: string): Promise<IUser> {
    let newUser = new this.#User({ email });
    newUser = await newUser.save();
    newUser = { email: newUser.email, id: newUser.id };
    return newUser;
  }

  async sendLoginOTP(
    email: string
  ): Promise<{ success: boolean; msg: string }> {
    const user = await this.#User.findOne({ email });

    if (!user) throw new BadRequestError(`email does not exist`, 400);

    const otp = otpService.generateOTP();
    console.log(`generated otp: `, otp);
    const duration = 1000 * 60 * 5; //5 minutes.
    const otpExpirationTime = new Date(Date.now() + duration).getTime();

    let newOtp = new Otp({ otpExpirationTime, userId: user._id, otp });
    await newOtp.save();

    const result = await EmailService.sendOTPEmail({
      from: "chibuikeuko@gmail.com",
      to: `${user.email}`,
      subject: "OTP verification",
      content: `provide this OTP:${otp} to complete your login process.`,
    });
    return { success: true, msg: result };
  }

  async createLoginToken(
    otp: number
  ): Promise<{ token: string } | { msg: string }> {
    const userOtp = await Otp.findOne({ otp });

    if (!userOtp) throw new BadRequestError(`invalid OTP`, 400);

    const { otpExpirationTime, userId } = userOtp;

    const now = Date.now();

    if (otpExpirationTime > now) {
      const token = jwt.sign(
        { userId: userId.toString() },
        process.env.JWT_SECRET
      );
      await Otp.deleteOne({ otp: userOtp.otp });
      return { token };
    } else {
      const msg = `your OTP has expired.`;
      return { msg };
    }
  }
}

export default new AuthService();
