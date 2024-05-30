import mongoose from "mongoose";

async function connectToDatabase(url: string): Promise<{}> {
  return mongoose.connect(url);
}

export default connectToDatabase;
