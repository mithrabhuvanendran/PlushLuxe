import { createSlice } from "@reduxjs/toolkit";
import { createAdminProduct, deleteAdminProduct, fetchAdminProducts, updateAdminProduct } from "../thunk/adminProductThunk";

const adminProductSlice = createSlice({
    name: "adminProducts",
    initialState: {
        products: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch admin products
        .addCase(fetchAdminProducts.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchAdminProducts.fulfilled, (state, action) => {
            state.loading = false
            state.products = action.payload
        })
        .addCase(fetchAdminProducts.rejected, (state, action) => {
            state.loading = true
            state.error = action.error.message
        })
        // Create a new product
         .addCase(createAdminProduct.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(createAdminProduct.fulfilled, (state, action) => {
            state.loading = false
            state.products.push(action.payload)
        })
        .addCase(createAdminProduct.rejected, (state, action) => {
            state.loading = true
            state.error = action.error.message
        })
        // Update an existing product
         .addCase(updateAdminProduct.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateAdminProduct.fulfilled, (state, action) => {
            const index = state.products.findIndex((product) => product._id === action.payload._id)

            if(index !== -1) {
                state.products[index] = action.payload
            }
        })
        .addCase(updateAdminProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        // Delete a product
         .addCase(deleteAdminProduct.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteAdminProduct.fulfilled, (state, action) => {
            state.products = state.products.filter((product) => product._id !== action.payload)
        })
        .addCase(deleteAdminProduct.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
    }
})

export default adminProductSlice.reducer