import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const registerUser = createAsyncThunk(
  "auth/register",
  async (formData, thunkAPI) => {
    try {
      const [response] = await Promise.all([
        axios.post(`${BASE_URL}/api/auth/register`, formData, {
          withCredentials: true,
        }),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
