import { createAsyncThunk } from "@reduxjs/toolkit";
import apiConfig from "../../API/apiConfig";

// Async thunk to create a checkout session
export const createCheckout = createAsyncThunk("checkout/createCheckout", async(checkoutdata, thunkAPI) => {
    try {
        console.log(checkoutdata);
        const response = await apiConfig.post("/checkout", checkoutdata, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem("userToken")}`
            }
        })
        console.log(response);
        return response.data
    } catch (error) {
        return thunkAPI.rejectWithValue(error.response.data)
    }
})
