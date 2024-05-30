import dotenv from "dotenv";
dotenv.config();
import express from "express";
import connectToDatabase from "./database/database.js";
import Auth from "./controllers/auth.controller.js";

const app = express();
const PORT = process.env.PORT || 3000;

const baseUrl = `/api/v1`;

app.get(`${baseUrl}/api-key`, Auth.generateApiKey);

async function startApp() {
  try {
    await connectToDatabase(process.env.MONGO_URI);
    console.log(`CONNECTED TO DATABASE`);
    app.listen(PORT, () => {
      console.log(
        `Server is listening on PORT:${PORT}.Press Ctrl+C to terminate.`
      );
    });
  } catch (error) {
    console.log(`Error: `, error.message);
  }
}

startApp();
