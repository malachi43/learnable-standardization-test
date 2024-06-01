import dotenv from "dotenv"
dotenv.config();
import {
  IVerifyEmail,
  IOTPEmail,
} from "../interfaces/email.interface.js";
import nodemailer from "nodemailer";

function initTransporter() {
  let transporter = nodemailer.createTransport({
    service: process.env.NODEMAILER_SERVICE,
    auth: {
      user: process.env.NODEMAILER_USER,
      pass: process.env.NODEMAILER_PASS,
    },
  });

  return transporter;
}

class EmailService {
  #transporter: { sendMail: (...args: any[]) => void };
  constructor() {
    this.#transporter = initTransporter();
  }

  async sendVerificationEmail({
    to,
    subject,
    content,
  }: IVerifyEmail): Promise<string> {
    let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text: content,
    };

    return new Promise((resolve, reject) => {
      this.#transporter.sendMail(
        mailOptions,
        function (error: Error, info: { response: string }) {
          if (error) {
            reject(error);
          } else {
            resolve(`verification email has been sent to ${to}`);
          }
        }
      );
    });
  }

  async sendOTPEmail({ to, subject, content }: IOTPEmail): Promise<string> {
    let mailOptions = {
      from: process.env.NODEMAILER_USER,
      to,
      subject,
      text: content,
    };

    return new Promise((resolve, reject) => {
      this.#transporter.sendMail(
        mailOptions,
        function (error: Error, info: { response: string }) {
          if (error) {
            reject(error);
          } else {
            resolve(`an OTP has been sent to ${to}`);
          }
        }
      );
    });
  }
}

export default new EmailService();
