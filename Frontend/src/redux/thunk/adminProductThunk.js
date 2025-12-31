import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../API/apiConfig";

// Async thunk to fetch admin products
export const fetchAdminProducts = createAsyncThunk(
  "adminProducts/fetchAdminProducts",
  async () => {
    const response = await apiConfig.get("/admin/products", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return response.data;
  }
);

// Async thunk to create a new product
export const createAdminProduct = createAsyncThunk(
  "adminProducts/createAdminProduct",
  async (productData) => {
    const response = await apiConfig.post("/admin/products", productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return response.data;
  }
);

// Async thunk to update an existing product
export const updateAdminProduct = createAsyncThunk(
  "adminProducts/updateAdminProduct",
  async ({ id, productData }) => {
    const response = await apiConfig.put(`/admin/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return response.data;
  }
);

// Async thunk to delete a product
export const deleteAdminProduct = createAsyncThunk(
  "adminProducts/deleteAdminProduct",
  async (id) => {
    await apiConfig.put(`/products/${id}`, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return id;
  }
);
