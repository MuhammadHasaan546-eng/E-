import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const chexkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, thunkAPI) => {
    try {
      const [response] = await Promise.all([
        axios.get(`${BASE_URL}/api/auth/check-auth`, {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-cache, no-store, must-revalidate, proxy-revalidate",
          },
        }),
        new Promise((resolve) => setTimeout(resolve, 2000)),
      ]);
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? { success: false, message: error.message },
      );
    }
  },
);
