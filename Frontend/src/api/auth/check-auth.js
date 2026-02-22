import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const chexkAuth = createAsyncThunk(
  "auth/checkauth",
  async (_, thunkAPI) => {
    try {
      const response = await axios.get(
        "http://localhost:3000/api/auth/check-auth",
        {
          withCredentials: true,
          headers: {
            "Cache-Control":
              "no-cache, no-store, must-revalidate, proxy-revalidate",
          },
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(
        error.response?.data ?? { success: false, message: error.message },
      );
    }
  },
);
