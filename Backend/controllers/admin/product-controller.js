import { imageUpload } from "../../config/cloudinary.js";
import AdminProducts from "../../models/Product.js";
import multer from "multer";

const handleImageUpload = async (req, res) => {
  console.log(req.file);
  try {
    if (!req.file) {
      return res.status(400).json({
        success: false,
        message: "Image file is required",
      });
    }
    const b64 = Buffer.from(req.file.buffer).toString("base64");
    const url = "data:" + req.file.mimetype + ";base64," + b64;
    const result = await imageUpload(url);
    res.status(200).json({
      success: true,
      message: "Image uploaded successfully",
      result: result,
    });
  } catch (error) {
    console.error(error);
    res.status(error.http_code || 500).json({
      success: false,
      message: error.message || "Error while uploading image",
      error: {
        name: error.name,
        http_code: error.http_code,
      },
    });
  }
};

export const createProduct = async (req, res) => {
  console.log("[createProduct] body keys:", Object.keys(req.body || {}));
  console.log(
    "[createProduct] files:",
    Array.isArray(req.files) ? req.files.length : req.files,
  );
  if (Array.isArray(req.files) && req.files[0]) {
    console.log("[createProduct] first file:", {
      fieldname: req.files[0].fieldname,
      originalname: req.files[0].originalname,
      mimetype: req.files[0].mimetype,
      size: req.files[0].size,
    });
  }
  try {
    const { title, description, category, brand, price, stock } = req.body;

    if (
      !title ||
      !description ||
      !category ||
      price === undefined ||
      stock === undefined
    ) {
      return res.status(400).json({
        success: false,
        message: "Missing required fields",
      });
    }

    const files = req.files;
    if (!files || files.length === 0) {
      return res.status(400).json({
        success: false,
        message: "Product image is required",
      });
    }

    const firstFile = files[0];
    const b64 = Buffer.from(firstFile.buffer).toString("base64");
    const url = "data:" + firstFile.mimetype + ";base64," + b64;
    // console.log(url);
    const uploaded = await imageUpload(url);

    const product = await AdminProducts.create({
      title,
      description,
      category,
      brand,
      price: Number(price),
      stock: Number(stock),
      image: uploaded.secure_url,
    });

    return res.status(201).json({
      success: true,
      message: "Product created successfully",
      product,
    });
  } catch (error) {
    console.error(error);
    const statusCode = error.http_code || 500;
    return res.status(statusCode).json({
      success: false,
      message: error.message || "Error while creating product",
      error: {
        name: error.name,
        http_code: error.http_code,
      },
    });
  }
};

export const getProducts = async (req, res) => {
  try {
    const products = await AdminProducts.find().sort({ createdAt: -1 });
    return res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error(error);
    return res.status(500).json({
      success: false,
      message: error.message || "Error while fetching products",
    });
  }
};

export default handleImageUpload;
