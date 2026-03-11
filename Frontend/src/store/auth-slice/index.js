import { chexkAuth } from "@/api/auth/check-auth";
import { loginUser } from "@/api/auth/login";
import { logoutUser } from "@/api/auth/logout";
import { registerUser } from "@/api/auth/register";
import { updateProfile } from "@/api/auth/update-profile";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isAuthenticated: false,
  isLogin: false,
  isLoading: true,
  isAuthChecked: false,
  user: null,
};

// authSlice
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
    builder.addCase(registerUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });

    // login user

    builder.addCase(loginUser.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(loginUser.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
    });
    builder.addCase(loginUser.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });

    // chick auth
    builder.addCase(chexkAuth.pending, (state) => {
      state.isLoading = true;
      state.isAuthChecked = false;
    });
    builder.addCase(chexkAuth.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : null;
      state.isAuthenticated = action.payload.success;
      state.isAuthChecked = true;
    });
    builder.addCase(chexkAuth.rejected, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
      state.isAuthChecked = true;
    });

    // logout
    builder.addCase(logoutUser.fulfilled, (state) => {
      state.isLoading = false;
      state.user = null;
      state.isAuthenticated = false;
    });

    // update profile
    builder.addCase(updateProfile.pending, (state) => {
      state.isLoading = true;
    });
    builder.addCase(updateProfile.fulfilled, (state, action) => {
      state.isLoading = false;
      state.user = action.payload.success ? action.payload.user : state.user;
    });
    builder.addCase(updateProfile.rejected, (state) => {
      state.isLoading = false;
    });
  },
});

export const { setUser } = authSlice.actions;
export { logoutUser, updateProfile };
export default authSlice.reducer;
