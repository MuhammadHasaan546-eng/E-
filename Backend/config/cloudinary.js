import { v2 as cloudinary } from "cloudinary";
import multer from "multer";

cloudinary.config({
  cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY_API_SECRET,
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
