import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const searchProducts = createAsyncThunk(
  "shop/search/searchProducts",
  async ({ keyword }, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/shop/search/${keyword}`,
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
