import { configureStore } from "@reduxjs/toolkit";
import authSlice from "./auth-slice";
import adminProductSlice from "./admin/adminProductSlice";

const store = configureStore({
  reducer: {
    auth: authSlice,
    adminProduct: adminProductSlice,
  },
});

export default store;
