import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../API/apiConfig.js";
import axios from "axios";

// Fetch cart for a user or guest
export const fetchCart = createAsyncThunk(
  "cart/fetchCart",
  async ({ guestId, userId }, thunkAPI) => {
    try {
      const response = await apiConfig.get("/cart", {
        params: { guestId, userId },
      });
      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Add an item to the cart for an user or guest
export const addToCart = createAsyncThunk(
  "cart/addToCart",
  async ({ productId, quantity, size, color, guestId, userId }, thunkAPI) => {
    try {
      const response = await apiConfig.post("/cart", {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Update the quantity of an item in the cart
export const updateCartItemQuantity = createAsyncThunk(
  "cart/updateCartItemQuantity",
  async ({ productId, quantity, size, color, guestId, userId }, thunkAPI) => {
    try {
      const response = await apiConfig.put("/cart", {
        productId,
        quantity,
        size,
        color,
        guestId,
        userId,
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Remove an item from the cart
export const removeFromCart = createAsyncThunk(
  "cart/removeFromCart",
  async ({ productId, size, color, guestId, userId }, thunkAPI) => {
    try {
      const response = await axios({
        method: "DELETE",
        url: `${import.meta.env.VITE_BACKEND_URL}/cart`,
        data: {
          productId,
          size,
          color,
          guestId,
          userId,
        },
      });

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);

// Merge guest cart into user cart
export const mergeCart = createAsyncThunk(
  "cart/mergeCart",
  async ({ guestId, user }, thunkAPI) => {
    try {
      const response = await apiConfig.post(
        "/cart/merge",
        { guestId, user },
        {
          headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`,
          },
        }
      );

      return response.data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.response.data);
    }
  }
);
