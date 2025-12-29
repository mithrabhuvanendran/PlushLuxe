import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../API/apiConfig.js";

// Async Thunk to fetch products by collections and optional filters
export const fetchProductsByFilters = createAsyncThunk(
  "products/fetchProductsByFilters",
  async (
    {
      collection,
      size,
      color,
      gender,
      minPrice,
      maxPrice,
      sortBy,
      search,
      category,
      material,
      brand,
      limit,
    },
    thunkAPI
  ) => {
    const query = new URLSearchParams(); // creates an empty URL query parameter object.

    if (collection) query.append("collection", collection);
    if (size) query.append("size", size);
    if (color) query.append("color", color);
    if (gender) query.append("gender", gender);
    if (minPrice) query.append("minPrice", minPrice);
    if (maxPrice) query.append("maxPrice", maxPrice);
    if (sortBy) query.append("sortBy", sortBy);
    if (search) query.append("search", search);
    if (category) query.append("category", category);
    if (material) query.append("material", material);
    if (brand) query.append("brand", brand);
    if (limit) query.append("limit", limit);

    const response = await apiConfig.get(`/products?${query.toString()}`);
    return response.data;
  }
);

// Async Thunk to fetch a single product by ID
export const fetchProductDetails = createAsyncThunk(
  "products/fetchProductDetails",
  async (id) => {
    const response = await apiConfig.get(`/products/${id}`);

    return response.data;
  }
);

// Async Thunk to update product
export const updateProduct = createAsyncThunk(
  "products/updateProduct",
  async ({ id, productData }) => {
    const response = await apiConfig.put(`/products/${id}`, productData, {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("userToken")}`,
      },
    });

    return response.data;
  }
);

// Async Thunk to fetch similar products
export const fetchSimilarProducts = createAsyncThunk("products/similarProducts", async(id) => {
    const response = await apiConfig.get(`/products/similar/${id}`)

    return response.data
})

