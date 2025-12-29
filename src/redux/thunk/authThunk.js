import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../API/apiConfig.js";

// AsyncThunk for login User
export const loginUser = createAsyncThunk(
    "auth/loginUser",
    async (userData, thunkAPI) => {
        try {
            const response = await apiConfig.post("/users/login", userData)

            localStorage.setItem("userInfo", JSON.stringify(response.data.user))
            localStorage.setItem("userToken", response.data.token)
            return response.data.user // Return the user object from the response
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

// AsyncThunk for User registration
export const registerUser = createAsyncThunk(
    "auth/registerUser",
    async (userData, thunkAPI) => {
        try {
            const response = await apiConfig.post("/users/register", userData)

            localStorage.setItem("userInfo", JSON.stringify(response.data.user))
            localStorage.setItem("userToken", response.data.token)
            return response.data.user // Return the user object from the response
        } catch (error) {
            return thunkAPI.rejectWithValue(error.response.data)
        }
    }
)

