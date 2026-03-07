import express from "express";
import {
  addProductReview,
  getProductReview,
} from "../../controllers/shop/product-review.controller.js";

const router = express.Router();

router.post("/add", addProductReview);
router.get("/get/:productId", getProductReview);

export default router;
