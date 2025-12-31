import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../API/apiConfig.js";

// Fetch all orders (Admin only)
export const fetchAllOrders = createAsyncThunk("adminOrders/fetchAllOrders", async(_, thunkAPI) => {
    try {
        const response = await apiConfig.get("/admin/orders", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// Update order delivery status
export const updateAdminOrderStatus = createAsyncThunk("adminOrders/updateAdminOrderStatus", async({id, status}, thunkAPI) => {
//    console.log(id, status);
    try {
        const response = await apiConfig.put(`/admin/orders/${id}`, {status}, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// Delete an order
export const deleteAdminOrder = createAsyncThunk("adminOrders/deleteOrder", async(id, thunkAPI) => {
    try {
        await apiConfig.delete(`/admin/orders/${id}`, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })

        return id
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})