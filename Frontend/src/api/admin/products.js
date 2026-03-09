import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createProduct = createAsyncThunk(
  "admin/products/create",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/admin/products/add`,
        formData,
        {
          withCredentials: true,
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
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(`${BASE_URL}/api/admin/products/all`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      return response.data;
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
        `${BASE_URL}/api/admin/products/edit/${id}`,
        formData,
        {
          withCredentials: true,
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
        `${BASE_URL}/api/admin/products/delete/${id}`,
        { withCredentials: true },
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
