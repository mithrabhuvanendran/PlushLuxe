import { createSlice } from "@reduxjs/toolkit";
import { deleteAdminOrder, fetchAllOrders, updateAdminOrderStatus } from "../thunk/adminOrderThunk";

const adminOrderSlice = createSlice({
  name: "adminOrders",
  initialState: {
    orders: [],
    totalOrders: 0,
    totalSales: 0,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      // Fetch all orders
      .addCase(fetchAllOrders.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchAllOrders.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = action.payload;
        state.totalOrders = action.payload.length
        const totalSales = action.payload.reduce((acc, order) => {
            return acc + order.totalPrice
        }, 0) 
        state.totalSales = totalSales
      })
      .addCase(fetchAllOrders.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      // Update order status
      .addCase(updateAdminOrderStatus.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateAdminOrderStatus.fulfilled, (state, action) => {
        state.loading = false;
        const updatedOrder = action.payload
        const index = state.orders.findIndex((order) => order._id === updatedOrder._id)

        if(index !== -1) {
            state.orders[index] = updatedOrder
        }
      })
      .addCase(updateAdminOrderStatus.rejected, (state) => {
        state.loading = false;
        state.error = null;
      })
      // Delete order
      .addCase(deleteAdminOrder.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(deleteAdminOrder.fulfilled, (state, action) => {
        state.loading = false;
        state.orders = state.orders.filter((order) => order._id !== action.payload)
      })
      .addCase(deleteAdminOrder.rejected, (state) => {
        state.loading = false;
        state.error = null;
      });
  },
});

export default adminOrderSlice.reducer
