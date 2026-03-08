import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const createProduct = createAsyncThunk(
  "admin/products/create",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/admin/products/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const fetchProducts = createAsyncThunk(
  "admin/products/fetch",
  async (thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/admin/products/all",
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const editProduct = createAsyncThunk(
  "admin/products/editProduct",
  async ({ id, formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/admin/products/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "admin/products/deleteProduct",
  async (id, thunkAPI) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/admin/products/delete/${id}`,
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
