import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "@/store/admin/products/adminProductSlice";
import shopingProductSlice from "@/store/shop/product-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductSlice,
    shopingProductSlice,
  },
});

export default store;
