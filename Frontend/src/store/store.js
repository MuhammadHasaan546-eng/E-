import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "@/store/admin/products/adminProductSlice";
import shopingProductSlice from "@/store/shop/product-slice/index";
import shopingCartSlice from "@/store/shop/cart-slice/index";
import addressSlice from "@/store/shop/address-slice/index";
import shopOrderSlice from "@/store/shop/order-slice/index";
import adminOrderSlice from "@/store/admin/order-slice/index";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductSlice,
    shopingProductSlice: shopingProductSlice,
    shopCart: shopingCartSlice,
    address: addressSlice,
    shopOrder: shopOrderSlice,
    adminOrder: adminOrderSlice,
  },
});

export default store;
