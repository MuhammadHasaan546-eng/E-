import { loginUser } from "@/api/auth/login";
import { registerUser } from "@/api/auth/register";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLogin: false,
  user: null,
};

// authSlice
const authSlice = createSlice({
  name: "auth",
  initialState,
  isLoading: false,
  reducers: {
    setUser: (state, action) => {},
  },

  // extraReducer for  register
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

  // extraReducer for  login
  extraReducers: (builder) => {
    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      console.log(action);
      state.isLoading = action.payload.success ? false : true;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
    });
    builder.addCase(loginUser.rejected, (state, action) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });
  },
});

export const { setUser } = authSlice.actions;
export default authSlice.reducer;
