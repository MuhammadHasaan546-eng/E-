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
      console.log("createProduct", response);

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
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const editProduct = createAsyncThunk(
  "admin/products/editProduct",
  async ({ id, formData }) => {
    try {
      console.log(id, formData);
      const response = await axios.put(
        `http://localhost:3000/api/admin/products/upload-product/edit/${id}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log("editProduct", response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

export const deleteProduct = createAsyncThunk(
  "admin/products/deleteProduct",
  async ({ id }) => {
    try {
      console.log(id);
      const response = await axios.delete(
        `http://localhost:3000/api/admin/products/upload-product/delete/${id}`,
      );
      console.log("DeleteProduct", response);

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
