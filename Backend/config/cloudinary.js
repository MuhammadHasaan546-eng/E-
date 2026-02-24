import { v2 as cloudinary } from "cloudinary";
import multer from "multer";
import dotenv from "dotenv";

dotenv.config();

const cloudName = process.env.CLOUDINARY_CLOUD_NAME?.trim();
const apiKey = process.env.CLOUDINARY_API_KEY?.trim();
const apiSecret = process.env.CLOUDINARY_API_SECRET?.trim();

if (!cloudName || !apiKey || !apiSecret) {
  throw new Error(
    "Missing Cloudinary env vars. Please set CLOUDINARY_CLOUD_NAME, CLOUDINARY_API_KEY, CLOUDINARY_API_SECRET in Backend .env",
  );
}

console.log(
  `[cloudinary] configured cloud_name=${cloudName}, api_key=****${apiKey.slice(-4)}`,
);

cloudinary.config({
  cloud_name: cloudName,
  api_key: apiKey,
  api_secret: apiSecret,
});

const stroage = new multer.memoryStorage();

async function imageUpload(file) {
  const result = await cloudinary.uploader.upload(file, {
    folder: "product",
  });
  return result;
}

const upload = multer({ storage: stroage });

export { upload, imageUpload };
