import express from "express";
import {
  getAllOrdersForAdmin,
  updateOrderStatus,
} from "../../controllers/admin/admin-order.controller.js";

const router = express.Router();

router.get("/list", getAllOrdersForAdmin);
router.put("/update/:id", updateOrderStatus);

export default router;
