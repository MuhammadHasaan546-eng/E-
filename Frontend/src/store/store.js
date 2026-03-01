import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "@/store/admin/products/adminProductSlice";
import shopingProductSlice from "@/store/shop/product-slice/index";
import shopingCartSlice from "@/store/shop/cart-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductSlice,
    shopingProductSlice: shopingProductSlice,
    shopCart: shopingCartSlice,
  },
});

export default store;
