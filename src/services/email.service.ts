import {
  IVerifyEmail,
  IOTPEmail,
} from "../interfaces/verificationEmail.interface.js";

export default class EmailService {
  static async sendVerificationEmail({
    from = "",
    to = "",
    subject = "",
    content = "",
  }: IVerifyEmail): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`a verification email has been to ${to}`);
      }, 3000);
    });
  }
  static async sendOTPEmail({
    from = "",
    to = "",
    subject = "",
    content = "",
  }: IOTPEmail): Promise<string> {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        resolve(`a OTP email has been to ${to}`);
      }, 3000);
    });
  }
}
