import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "@/store/admin/products/adminProductSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProducts: adminProductSlice,
  },
});

export default store;
