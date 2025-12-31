import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../API/apiConfig";

// Fetch all users (Admin only)
export const fetchUsers = createAsyncThunk("admin/fetchUsers", async() => {
    const response = await apiConfig.get("/admin/users", {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })
    return response.data
})

// Add the create user action
export const addUser = createAsyncThunk("admin/addUser", async(userData, thunkAPI) => {
    try {
        const response = await apiConfig.post("/admin/users", userData, {
            headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
        })
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})

// Update user info
export const updateUser = createAsyncThunk("admin/updateUser", async({id, name, email, role}) => {
    const response = await apiConfig.put(`/admin/users/${id}`, {name, email, role}, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })

    return response.data.user
})

// Delete the user
export const deleteUser = createAsyncThunk("admin/deleteUser", async(id) => {
     await apiConfig.delete(`/admin/users/${id}`, {
        headers: {
            Authorization: `Bearer ${localStorage.getItem("userToken")}`
        }
    })

    return id
})