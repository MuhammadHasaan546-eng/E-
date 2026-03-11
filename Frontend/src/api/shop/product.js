import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const fetchAllProducts = createAsyncThunk(
  "shop/products/fetch",
  async ({ filterParams, sortParams }, thunkAPI) => {
    try {
      const quary = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      }).toString();

      const response = await axios.get(
        `${BASE_URL}/api/shop/products/get?${quary}`,
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

export const fetchProductDeatils = createAsyncThunk(
  "shop/products/details",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/shop/products/get-deatils/${id}`,
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
