import { Router } from "express";
import {
  addAddress,
  deleteAddress,
  editAddress,
  fetchAddress,
} from "../../controllers/shop/address.controller.js";

const router = Router();

router.post("/add", addAddress);
router.get("/get/:userId", fetchAddress);
router.put("/update/:userId/:addressId", editAddress);
router.delete("/delete/:userId/:addressId", deleteAddress);

export default router;
