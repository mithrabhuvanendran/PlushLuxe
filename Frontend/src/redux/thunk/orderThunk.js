import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../API/apiConfig.js";

// Async thunk to fetch user orders
export const fetchUserOrders = createAsyncThunk("orders/fetchUserOrders", async(_, thunkAPI) => {
    try {
        const response = await apiConfig.get("/orders/my-orders", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
}) 

// Async thunk to fetch order details by ID
export const fetchOrderDetails = createAsyncThunk("orders/fetchOrderDetails", async(id, thunkAPI) => {
    try {
        const response = await apiConfig.get(`/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

