import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addProductReview = createAsyncThunk(
  "shop/review/add",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/shop/review/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const getProductReviews = createAsyncThunk(
  "shop/review/get",
  async (productId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/shop/review/get/${productId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
