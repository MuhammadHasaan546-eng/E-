import express from "express";
import {
  addNewProduct,
  deleteProduct,
  editProduct,
  fetchAllProduct,
  handleImageUpload,
} from "../../controllers/admin/product-controller.js";
import { upload } from "../../config/cloudinary.js";
const router = express.Router();

router.post("/upload-image", upload.single("my_file"), handleImageUpload);

router.post("/add", addNewProduct);
router.put("/edit/:id", editProduct);

router.delete("/delete/:id", deleteProduct);
router.get("/all", fetchAllProduct);

export default router;
