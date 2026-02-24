import { createProduct, fetchProducts } from "@/api/auth/admin/products.js";
import { createSlice } from "@reduxjs/toolkit";

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: {
    isLoading: false,
    product: null,
    products: [],
  },
  reducers: {
    products: (state, action) => {},
  },
  extraReducers: (builder) => {
    builder.addCase(createProduct.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(createProduct.fulfilled, (state, action) => {
      state.isLoading = false;
      state.product = action.payload;
    });
    builder.addCase(createProduct.rejected, (state, action) => {
      state.isLoading = false;
      state.product = null;
      console.log("Rejected error:", action.payload ?? action.error);
    });

    builder.addCase(fetchProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.products = action.payload?.products ?? [];
    });
    builder.addCase(fetchProducts.rejected, (state) => {
      state.isLoading = false;
      state.products = [];
    });
  },
});

export const { products } = adminProductSlice.actions;
export default adminProductSlice.reducer;
