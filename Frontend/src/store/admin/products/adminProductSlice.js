import { fetchProducts } from "@/api/admin/products";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isLoading: false,
  productLists: [],
};

const adminProductSlice = createSlice({
  name: "adminProduct",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    //   builder.addCase(createProduct.pending, (state) => {
    //     state.isLoading = true;
    //   });
    //   builder.addCase(createProduct.fulfilled, (state, action) => {
    //     state.isLoading = false;
    //     state.product = action.payload;
    //   });
    //   builder.addCase(createProduct.rejected, (state, action) => {
    //     state.isLoading = false;
    //     state.product = null;
    //     console.log("Rejected error:", action.payload ?? action.error);
    //   });

    builder
      .addCase(fetchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchProducts.fulfilled, (state, action) => {
        console.log("action.payload", action.payload.data);
        state.isLoading = false;
        state.productLists = action.payload;
      })
      .addCase(fetchProducts.rejected, (state) => {
        state.isLoading = false;
        state.productLists = [];
      });
  },
});

export default adminProductSlice.reducer;
