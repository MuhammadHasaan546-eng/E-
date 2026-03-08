import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

export const addFeatureImage = createAsyncThunk(
  "/feature/addFeatureImage",
  async (formData) => {
    const response = await axios.post(
      "http://localhost:3000/api/common/feature/add",
      formData
    );

    return response.data;
  }
);

export const getFeatureImages = createAsyncThunk(
  "/feature/getFeatureImages",
  async () => {
    const response = await axios.get(
      "http://localhost:3000/api/common/feature/get"
    );

    return response.data;
  }
);

export const deleteFeatureImage = createAsyncThunk(
  "/feature/deleteFeatureImage",
  async (id) => {
    const response = await axios.delete(
      `http://localhost:3000/api/common/feature/delete/${id}`
    );

    return response.data;
  }
);

export const updateFeatureImage = createAsyncThunk(
  "/feature/updateFeatureImage",
  async ({ id, ...formData }) => {
    const response = await axios.put(
      `http://localhost:3000/api/common/feature/update/${id}`,
      formData
    );

    return response.data;
  }
);
