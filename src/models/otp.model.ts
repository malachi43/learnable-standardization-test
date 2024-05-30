import { Schema, model } from "mongoose";

const otpSchema = new Schema({
  otpExpirationTime: {
    type: Number,
    required: [true, "otpExpirationTime field is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"],
  },
  otp: {
    type: Number,
    required: [true, "otp field must be provided"]
  }
});

const otp = model("Otp", otpSchema);
export default otp;
