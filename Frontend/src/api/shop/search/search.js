import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const searchProducts = createAsyncThunk(
  "shop/search/searchProducts",
  async ({ keyword }, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/shop/search/${keyword}`,
        {
          withCredentials: true,
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
