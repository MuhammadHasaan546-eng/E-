import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const updateProfile = createAsyncThunk(
  "auth/updateProfile",
  async ({ userId, formData }, thunkAPI) => {
    try {
      const response = await axios.put(
        `http://localhost:3000/api/auth/profile/${userId}`,
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
