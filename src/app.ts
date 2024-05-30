import dotenv from "dotenv";
dotenv.config();
import express, { Request, Response } from "express";
import connectToDatabase from "./database/database.js";
import Auth from "./controllers/auth.controller.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { join, extname, dirname } from "node:path/posix";
import {fileURLToPath} from "node:url"
const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

import multer from "multer";
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const dest = "uploads"
    cb(null, dest);
  },
  filename: function (req, file, cb) {
    console.log(`in file function: `, file);
    cb(null, file.originalname);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const imageExts = ["jpeg", "png", "jpg"];
    const { mimetype } = file;
    console.log(`in file filter function: `, file);
    cb(null, true);
  },
});

const app = express();
const PORT = process.env.PORT || 3000;

const baseUrl = `/api/v1`;

app.get(`${baseUrl}/api-key`, Auth.generateApiKey);
app.get(
  `${baseUrl}/uploads`,
  upload.single("uploaded_file"),
  (req: Request, res: Response) => {
    console.log(`in uploads route.`);
    res.status(200).json({ fileObj: req.file });
  }
);

app.use(notFound);
app.use(errorHandler);

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
