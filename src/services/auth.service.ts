import User from "../models/user.model.js";
import { IUser } from "../interfaces/user.interface.js";
import otpService from "./otp.service.js";
import emailService from "./email.service.js";
import Otp from "../models/otp.model.js";
import { BadRequestError } from "../errors/badRequest.error.js";
import jwt from "jsonwebtoken";

class AuthService {
  #User;
  constructor() {
    this.#User = User;
  }

  async register(email: string, verificationLink: string): Promise<IUser> {
    let newUser = new this.#User({ email });
    newUser = await newUser.save();
    const result = await emailService.sendVerificationEmail({
      to: email,
      subject: `Verification email`,
      content: `Thank you for signing up with Krypton.\nverify your email by clicking on the link: ${verificationLink}`,
    });
    newUser = { email: newUser.email, id: newUser.id };
    return { ...newUser, msg: result };
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

    const text = `Welcome to Krypton,\nTo complete your Krypton sign up, and as an additional security measure, you are requested to enter the one-time password (OTP) provided in this email.\nThe OTP code is: ${otp}\nOTP will expire in 5 minutes.`;
    const result = await emailService.sendOTPEmail({
      to: `${user.email}`,
      subject: "OTP verification",
      content: text,
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
        process.env.JWT_SECRET,
        { expiresIn: "7d" }
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
