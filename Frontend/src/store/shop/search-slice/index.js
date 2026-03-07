import { createSlice } from "@reduxjs/toolkit";
import { searchProducts } from "@/api/shop/search/search";

const searchSlice = createSlice({
  name: "shopSearch",
  initialState: {
    searchResult: [],
    isLoading: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(searchProducts.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(searchProducts.fulfilled, (state, action) => {
        state.isLoading = false;
        state.searchResult = action.payload.data;
      })
      .addCase(searchProducts.rejected, (state, action) => {
        state.loadisLoadinging = false;
        state.searchResult = [];
      });
  },
});

export default searchSlice.reducer;
