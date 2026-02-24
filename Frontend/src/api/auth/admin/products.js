import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "admin/products/create",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/products/upload-product",
        formData,
        {
          withCredentials: true,
        },
      );

      console.log("createProduct", response);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const fetchProducts = createAsyncThunk(
  "admin/products/list",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/products/list",
        {
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
