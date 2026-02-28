import { fetchAllProducts } from "@/api/shop/product";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoading: false,
};

const shopingProductSlice = createSlice({
  name: "shopingProducts",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchAllProducts.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(fetchAllProducts.fulfilled, (state, action) => {
      state.isLoading = false;
      state.productList = action.payload.data;
    });
    builder.addCase(fetchAllProducts.rejected, (state) => {
      state.isLoading = false;
      state.productList = [];
    });
  },
});

export default shopingProductSlice.reducer;
