import express from "express";
import { getFilterProduct } from "../../controllers/shop/product.controllers.js";

const router = express.Router();

router.get("/get", getFilterProduct);

export default router;
