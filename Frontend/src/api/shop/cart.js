import axios from "axios";
import { createAsyncThunk } from "@reduxjs/toolkit";

// add to cart

export const createCart = createAsyncThunk(
  "shop/cart/create",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.post(
        `http://localhost:3000/api/shop/cart/add`,
        {
          userId,
          productId,
          quantity,
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

export const fetchCartItems = createAsyncThunk(
  "shop/cart/fetch",
  async (userId, thunkAPI) => {
    console.log(userId, "userId");
    try {
      const response = await axios.get(
        `http://localhost:3000/api/shop/cart/get/${userId}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        },
      );
      console.log(response.data);
      return await response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
export const deleteCartItem = createAsyncThunk(
  "shop/cart/delete",
  async ({ userId, productId }, thunkAPI) => {
    console.log(userId, "userId", productId, "productId");
    try {
      const response = await axios.delete(
        `http://localhost:3000/api/shop/cart/${userId}/${productId}`,
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
export const updateCartItem = createAsyncThunk(
  "shop/cart/update",
  async ({ userId, productId, quantity }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/shop/cart/update-cart`,
        {
          userId,
          productId,
          quantity,
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
