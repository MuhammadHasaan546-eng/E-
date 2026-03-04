import { createSlice } from "@reduxjs/toolkit";
import {
  addAddress,
  editAddress,
  deleteAddress,
  fetchAddress,
} from "../../../api/shop/customer-adress";

const initialState = {
  addressList: [],
  loading: false,
};

const addressSlice = createSlice({
  name: "address",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(addAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(addAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressList.push(action.payload.data);
      })
      .addCase(addAddress.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(fetchAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(fetchAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressList = action.payload.data;
      })
      .addCase(fetchAddress.rejected, (state, action) => {
        state.loading = false;
        state.addressList = [];
      })
      .addCase(editAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(editAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressList = state.addressList.map((address) =>
          address._id === action.payload.data._id
            ? action.payload.data
            : address,
        );
      })
      .addCase(editAddress.rejected, (state, action) => {
        state.loading = false;
      })
      .addCase(deleteAddress.pending, (state) => {
        state.loading = true;
      })
      .addCase(deleteAddress.fulfilled, (state, action) => {
        state.loading = false;
        state.addressList = state.addressList.filter(
          (address) => address._id !== action.payload.data._id,
        );
      })
      .addCase(deleteAddress.rejected, (state, action) => {
        state.loading = false;
      });
  },
});

export { addAddress, editAddress, deleteAddress, fetchAddress };
export default addressSlice.reducer;
