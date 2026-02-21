import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";

const initialState = {
  isAuthenticated: false,
  isLogin: false,
  user: null,
};

export const registerUser = createAsyncThunk(
  "auth/register", // action type prefix
  async (formData, thunkAPI) => {
    // payloadCreator
    try {
      const response = await axios.post(
        "http://localhost:3000/api/auth/register",
        formData,
        { withCredentials: true },
      );
      return response.data; // ✅ ye payload banega fulfilled me
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response?.data);
    }
  },
);

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setUser: (state, action) => {},
  },

  extraReducers: (builder) => {
    builder.addCase(registerUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(registerUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
    builder.addCase(registerUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
