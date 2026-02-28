import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "shop/products/fetch",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/shop/products/get",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
