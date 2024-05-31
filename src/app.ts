import dotenv from "dotenv";
dotenv.config();
//catch asynchronous errors in request handlers.
import "express-async-errors";
import express, { Request, Response } from "express";
import helmet from "helmet";
import cors from "cors";
import connectToDatabase from "./database/database.js";
import Auth from "./controllers/auth.controller.js";
import isApiKeyValid from "./middlewares/apiKeyValidator.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { join, extname, dirname } from "node:path/posix";
import { fileURLToPath } from "node:url";
import multer from "multer";
import { BadRequestError } from "./errors/badRequest.error.js";
import isAuth from "./middlewares/isAuthenticated.middleware.js";
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const app = express();
const PORT = process.env.PORT || 3000;

// app.use(express.static(join(__dirname, "public", "uploads")));

app.use(helmet());
app.use(cors());

app.use(express.json());
app.use(express.urlencoded({ extended: false }));

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads");
  },
  filename: function (req, file, cb) {
    const { originalname } = file;
    const filename = `${Date.now()}${Math.round(Math.random() * 1e9)}${extname(
      originalname
    )}`;
    cb(null, filename);
  },
});

const upload = multer({
  storage,
  fileFilter: function (req, file, cb) {
    const imageExts = [".jpeg", ".png", ".jpg"];
    const { originalname } = file;
    const isImage = imageExts.includes(extname(originalname));
    console.log(`isImage`, isImage);
    if (isImage) {
      cb(null, true);
    } else {
      cb(
        new Error(`${extname(file.originalname)} not allowed. Image files only`)
      );
    }
  },
});

const baseUrl = `/api/v1`;

app.post(
  `${baseUrl}/uploads`,
  isApiKeyValid,
  upload.single("image_file"),
  async (req: Request, res: Response) => {
    if (!req.file) {
      throw new BadRequestError(`please select a file to upload.`, 400);
    }
    console.log(req.file);
    res.status(200).json({ fileObj: req.file });
  }
);

app.use(function (req, res, next) {
  console.log(`request pass through server`);
  next();
});
app.get(`${baseUrl}/api-key`, isAuth, Auth.generateApiKey);
app.post(`${baseUrl}/otp`, Auth.sendLoginOTP);
app.post(`${baseUrl}/login/otp`, Auth.createLoginToken);
app.post(`${baseUrl}/register`, Auth.register);

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
