import { Schema, model } from "mongoose";

const userUploadSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    required: [true, "userId field is required"],
    ref: "User",
  },
  base64Image: {
    type: String,
    required: [true, "base64 type image is required"],
  },
});

const userUploads = model("UserUpload", userUploadSchema);

export default userUploads