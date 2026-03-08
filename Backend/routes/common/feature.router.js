import express from "express";
import {
  addFeatureImage,
  getFeatureImages,
  deleteFeatureImage,
  updateFeatureImage
} from "../../controllers/common/features.controller.js";

const router = express.Router();

router.post("/add", addFeatureImage);
router.get("/get", getFeatureImages);
router.delete("/delete/:id", deleteFeatureImage);
router.put("/update/:id", updateFeatureImage);

export default router;
