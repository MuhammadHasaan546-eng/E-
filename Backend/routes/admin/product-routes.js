import express from "express";
import { upload } from "../../config/cloudinary.js";
import handleImageUpload, {
  createProduct,
  getProducts,
} from "../../controllers/admin/product-controller.js";

const router = express.Router();

// router.post("/upload-image", upload.single("image"), handleImageUpload);

// router.post("/upload-product", upload.array("image", 5), createProduct);
router.post("/upload-product", (req, res) => {
  console.log(req.body);
  console.log(req.file);
  res.json({ message: "Product uploaded successfully" });
});

router.get("/list", getProducts);

export default router;
