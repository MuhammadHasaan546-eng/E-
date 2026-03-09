import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ userId, formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `${BASE_URL}/api/auth/profile/${userId}`,
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        },
      );
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  },
);
