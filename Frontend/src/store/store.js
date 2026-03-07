import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "@/store/admin/products/adminProductSlice";
import shopingProductSlice from "@/store/shop/product-slice/index";
import shopingCartSlice from "@/store/shop/cart-slice/index";
import addressSlice from "@/store/shop/address-slice/index";
import shopOrderSlice from "@/store/shop/order-slice/index";
import adminOrderSlice from "@/store/admin/order-slice/index";
import searchSlice from "@/store/shop/search-slice/index";
import shopReviewSlice from "@/store/shop/review-slice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductSlice,
    shopingProductSlice: shopingProductSlice,
    shopCart: shopingCartSlice,
    address: addressSlice,
    shopOrder: shopOrderSlice,
    adminOrder: adminOrderSlice,
    shopSearch: searchSlice,
    shopReview: shopReviewSlice,
  },
});

export default store;
