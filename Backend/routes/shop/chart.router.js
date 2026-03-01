import express from "express";
import {
  addChart,
  deleteChartItem,
  fetchChartItems,
  updateChartItem,
} from "../../controllers/shop/chart.controoler.js";
const router = express.Router();

router.post("/add", addChart);
router.get("/get/:userId", fetchChartItems);
router.put("/update-cart", updateChartItem);
router.delete("/:userId/:productId", deleteChartItem);

export default router;
