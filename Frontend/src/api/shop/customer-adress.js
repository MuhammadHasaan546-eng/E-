import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addAddress = createAsyncThunk(
  "shop/address/add",
  async (formData, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/shop/address/add`,
        {
          formData,
        },
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

export const fetchAddress = createAsyncThunk(
  "shop/address/fetch",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `http://localhost:3000/api/shop/address/get/${userId}`,
      );
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);

export const editAddress = createAsyncThunk(
  "shop/address/edit",
  async ({ userId, addressId, formData, thunkAPI }) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/shop/address/update/${userId}/${addressId}`,

        {
          formData,
        },
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

export const deleteAddress = createAsyncThunk(
  "shop/address/delete",
  async ({ userId, addressId, thunkAPI }) => {
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/shop/address/delete/${userId}/${addressId}`,

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
