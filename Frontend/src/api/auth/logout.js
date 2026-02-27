import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const logoutUser = createAsyncThunk(
  "auth/logout",
  async (_, thunkAPI) => {
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/logout",
        {},
        {
          withCredentials: true,
        },
      );
      return response;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);
