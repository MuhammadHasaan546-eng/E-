import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const addAddress = createAsyncThunk(
  "shop/address/add",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/shop/address/add`,
        { formData },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const fetchAddress = createAsyncThunk(
  "shop/address/fetch",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/shop/address/get/${userId}`,
        { withCredentials: true },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const editAddress = createAsyncThunk(
  "shop/address/edit",
  async ({ userId, addressId, formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/shop/address/update/${userId}/${addressId}`,
        { formData },
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const deleteAddress = createAsyncThunk(
  "shop/address/delete",
  async ({ userId, addressId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/shop/address/delete/${userId}/${addressId}`,
        {
          withCredentials: true,
          headers: { "Content-Type": "application/json" },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
