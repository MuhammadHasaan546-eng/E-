import {
  createCart,
  deleteCartItem,
  fetchCartItems,
  updateCartItem,
} from "@/api/shop/cart";
import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  cart: [],
  isLoading: false,
  error: null,
};

const shopingCartSlice = createSlice({
  name: "shopingCart",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    // create cart
    builder
      .addCase(createCart.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(createCart.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(createCart.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.cart = [];
        console.log(action.payload);
      });

    // fetch cart
    builder
      .addCase(fetchCartItems.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(fetchCartItems.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(fetchCartItems.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.cart = [];
      });

    // delete cart
    builder
      .addCase(deleteCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(deleteCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(deleteCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.cart = [];
      });

    // update cart
    builder
      .addCase(updateCartItem.pending, (state) => {
        state.isLoading = true;
      })
      .addCase(updateCartItem.fulfilled, (state, action) => {
        state.isLoading = false;
        state.cart = action.payload.data;
      })
      .addCase(updateCartItem.rejected, (state, action) => {
        state.isLoading = false;
        state.error = action.payload;
        state.cart = [];
      });
  },
});

export default shopingCartSlice.reducer;
