import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const getAllOrdersForAdmin = createAsyncThunk(
  "/order/getAllOrdersForAdmin",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/admin/orders/list",
    );

    return response.data;
  },
);

export const getOrderDetailsForAdmin = createAsyncThunk(
  "/order/getOrderDetailsForAdmin",
  async (id) => {
    const response = await axios.get(
      `http://localhost:3000/api/shop/order/details/${id}`,
    );

    return response.data;
  },
);

export const updateOrderStatus = createAsyncThunk(
  "/order/updateOrderStatus",
  async ({ id, orderStatus }) => {
    const response = await axios.put(
      `http://localhost:3000/api/admin/orders/update/${id}`,
      {
        orderStatus,
      },
    );

    return response.data;
  },
);
