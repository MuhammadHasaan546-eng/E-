import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const loginUser = createAsyncThunk(
  "auth/login",
  async (formData, thunkAPI) => {
    try {
      const [response] = await Promise.all([
        axios.post("http://localhost:3000/api/auth/login", formData, {
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
