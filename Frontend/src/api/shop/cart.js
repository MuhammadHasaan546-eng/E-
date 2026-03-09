import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createCart = createAsyncThunk(
  "shop/cart/create",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/shop/cart/add`,
        { userId, productId, quantity },
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

export const fetchCartItems = createAsyncThunk(
  "shop/cart/fetch",
  async (userId, thunkAPI) => {
    try {
      const response = await axios.get(
        `${BASE_URL}/api/shop/cart/get/${userId}`,
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

export const deleteCartItem = createAsyncThunk(
  "shop/cart/delete",
  async ({ userId, productId }, thunkAPI) => {
    try {
      const response = await axios.delete(
        `${BASE_URL}/api/shop/cart/${userId}/${productId}`,
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

export const updateCartItem = createAsyncThunk(
  "shop/cart/update",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/shop/cart/update-cart`,
        { userId, productId, quantity },
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
