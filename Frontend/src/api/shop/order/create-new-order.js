import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const createNewOrder = createAsyncThunk(
  "/order/createNewOrder",
  async (orderData) => {
    const response = await axios.post(
      `${BASE_URL}/api/shop/order/create`,
      orderData,
      { withCredentials: true },
    );

    return response.data;
  },
);

export const capturePayment = createAsyncThunk(
  "/order/capturePayment",
  async ({ paymentId, payerId, orderId }) => {
    const response = await axios.post(
      `${BASE_URL}/api/shop/order/capture`,
      {
        paymentId,
        payerId,
        orderId,
      },
      { withCredentials: true },
    );

    return response.data;
  },
);

export const getAllOrdersByUserId = createAsyncThunk(
  "/order/getAllOrdersByUserId",
  async (userId) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/order/list/${userId}`,
      { withCredentials: true },
    );

    return response.data;
  },
);

export const getOrderDetails = createAsyncThunk(
  "/order/getOrderDetails",
  async (id) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/order/details/${id}`,
      { withCredentials: true },
    );

    return response.data;
  },
);
