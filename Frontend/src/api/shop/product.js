import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const fetchAllProducts = createAsyncThunk(
  "shop/products/fetch",
  async ({ filterParams, sortParams }, thunkAPI) => {
    try {
      const quary = new URLSearchParams({
        ...filterParams,
        sortBy: sortParams,
      }).toString();

      console.log(quary.toString());
      const response = await axios.get(
        `http://localhost:3000/api/shop/products/get?${quary}`,

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

export const fetchProductDeatils = createAsyncThunk(
  "shop/products/details",
  async (id, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/shop/products/get${id}`,

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
