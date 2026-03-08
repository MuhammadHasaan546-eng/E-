import { createSlice } from "@reduxjs/toolkit";
import {
  getFeatureImages,
  addFeatureImage,
  deleteFeatureImage,
  updateFeatureImage,
} from "@/api/common/feature";

const initialState = {
  featureImageList: [],
  isLoading: false,
};

const commonSlice = createSlice({
  name: "common",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getFeatureImages.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(getFeatureImages.fulfilled, (state, action) => {
        state.isLoading = false;
        state.featureImageList = action.payload.data;
      })
      .addCase(getFeatureImages.rejected, (state) => {
        state.isLoading = false;
        state.featureImageList = [];
      })
      .addCase(addFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(addFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;

        state.featureImageList.push(action.payload.data);
      })
      .addCase(addFeatureImage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(deleteFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
      })
      .addCase(deleteFeatureImage.rejected, (state) => {
        state.isLoading = false;
      })
      .addCase(updateFeatureImage.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateFeatureImage.fulfilled, (state, action) => {
        state.isLoading = false;
        const index = state.featureImageList.findIndex(
          (item) => item._id === action.payload.data._id,
        );
        if (index !== -1) {
          state.featureImageList[index] = action.payload.data;
        }
      })
      .addCase(updateFeatureImage.rejected, (state) => {
        state.isLoading = false;
      });
  },
});

export default commonSlice.reducer;
