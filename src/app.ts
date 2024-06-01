import dotenv from "dotenv";
dotenv.config();
//catch asynchronous errors in request handlers.
import "express-async-errors";
import express from "express";
import helmet from "helmet";
import cors from "cors";
import connectToDatabase from "./database/database.js";
import AuthController from "./controllers/auth.controller.js";
import ImageController from "./controllers/image.controller.js";
import isApiKeyValid from "./middlewares/apiKeyValidator.middleware.js";
import { notFound } from "./middlewares/notFound.middleware.js";
import { errorHandler } from "./middlewares/errorHandler.middleware.js";
import { join, extname, dirname } from "node:path/posix";
import multer from "multer";
import isAuth from "./middlewares/isAuthenticated.middleware.js";

const app = express();
const PORT = process.env.PORT || 5000;

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
  ImageController.saveImageAsBase64
);

app.get(`${baseUrl}/api-key`, isAuth, AuthController.generateApiKey);
app.post(
  `${baseUrl}/api-key/invalidate`,
  isAuth,
  AuthController.invalidateApiKey
);
app.get(`${baseUrl}/otp`, AuthController.sendLoginOTP);
app.post(`${baseUrl}/login/otp`, AuthController.createLoginToken);
app.post(`${baseUrl}/register`, AuthController.register);
app.get(`${baseUrl}/images`, ImageController.getAllImages);
app.get(`${baseUrl}/images/:id`, ImageController.getSingleImage);

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
