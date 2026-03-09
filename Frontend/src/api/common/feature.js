import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3000";

export const addFeatureImage = createAsyncThunk(
  "/feature/addFeatureImage",
  async (formData) => {
    const response = await axios.post(
      `${BASE_URL}/api/common/feature/add`,
      formData,
      { withCredentials: true },
    );

    return response.data;
  },
);

export const getFeatureImages = createAsyncThunk(
  "/feature/getFeatureImages",
  async () => {
    const response = await axios.get(`${BASE_URL}/api/common/feature/get`, {
      withCredentials: true,
    });

    return response.data;
  },
);

export const deleteFeatureImage = createAsyncThunk(
  "/feature/deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(
      `${BASE_URL}/api/common/feature/delete/${id}`,
      { withCredentials: true },
    );

    return response.data;
  },
);

export const updateFeatureImage = createAsyncThunk(
  "/feature/updateFeatureImage",
  async ({ id, ...formData }) => {
    const response = await axios.put(
      `${BASE_URL}/api/common/feature/update/${id}`,
      formData,
      { withCredentials: true },
    );

    return response.data;
  },
);
