import express from "express";
import {
  getFilterProduct,
  getProductDeatils,
} from "../../controllers/shop/product.controllers.js";

const router = express.Router();

router.get("/get", getFilterProduct);
router.get("/get:id", getProductDeatils);

export default router;
