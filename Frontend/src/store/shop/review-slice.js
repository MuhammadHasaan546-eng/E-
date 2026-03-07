import { createSlice } from "@reduxjs/toolkit";
import { addProductReview, getProductReviews } from "../../api/shop/review";

const initialState = {
  reviews: [],
  isLoading: false,
};

const shopReviewSlice = createSlice({
  name: "shopReview",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getProductReviews.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getProductReviews.fulfilled, (state, action) => {
        state.isLoading = false;
        state.reviews = action.payload.data;
      })
      .addCase(getProductReviews.rejected, (state) => {
        state.isLoading = false;
        state.reviews = [];
      });
  },
});

export default shopReviewSlice.reducer;
