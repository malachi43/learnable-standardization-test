import { Schema, model } from "mongoose";

const userSchema = new Schema({
  email: {
    type: String,
    required: [true, "email field is required"],
    unique: true,
  },
});

const user = model("User", userSchema);
export default user;
