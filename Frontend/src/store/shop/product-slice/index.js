import { fetchAllProducts, fetchProductDeatils } from "@/api/shop/product";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  productList: [],
  isLoading: false,
  isDetailsLoading: false,
  productDeatils: null,
};

const shopingProductSlice = createSlice({
  name: "shopingProducts",
  initialState,
  reducers: {
    setProductDetails: (state, action) => {
      state.productDeatils = null;
    },
  },
  extraReducers: (builder) => {
    // fetch all products
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
    // fetch product details
    builder.addCase(fetchProductDeatils.pending, (state) => {
      state.isDetailsLoading = true;
    });
    builder.addCase(fetchProductDeatils.fulfilled, (state, action) => {
      state.isDetailsLoading = false;
      state.productDeatils = action.payload.data;
    });
    builder.addCase(fetchProductDeatils.rejected, (state) => {
      state.isDetailsLoading = false;
      state.productDeatils = null;
    });
  },
});

export const { setProductDetails } = shopingProductSlice.actions;

export default shopingProductSlice.reducer;
