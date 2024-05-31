import { Schema, model } from "mongoose";

const apiKeySchema = new Schema({
  apiKey: {
    type: String,
    required: [true, "apiKey field is required"],
  },
  userId: {
    type: Schema.Types.ObjectId,
    ref: "User",
    required: [true, "userId field is required"],
  }
});

const apiKey = model("Apikey", apiKeySchema);
export default apiKey
