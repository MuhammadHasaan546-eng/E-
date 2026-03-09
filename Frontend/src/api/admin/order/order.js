import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/admin/orders/list`, {
      withCredentials: true,
    });
    return response.data;
  },
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `${BASE_URL}/api/shop/order/details/${id}`,
      { withCredentials: true },
    );
    return response.data;
  },
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `${BASE_URL}/api/admin/orders/update/${id}`,
      { orderStatus },
      { withCredentials: true },
    );
    return response.data;
  },
);
