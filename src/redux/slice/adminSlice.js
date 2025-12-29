import { createSlice } from "@reduxjs/toolkit";
import { addUser, deleteUser, fetchUsers, updateUser } from "../thunk/adminThunk";

const adminSlice = createSlice({
    name: "admin",
    initialState: {
        users: [],
        loading: false,
        error: null
    },
    reducers: {},
    extraReducers: (builder) => {
        builder
        // Fetch all users
        .addCase(fetchUsers.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(fetchUsers.fulfilled, (state, action) => {
            state.loading = false
            state.users = action.payload
        })
        .addCase(fetchUsers.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        // Update the user
        .addCase(updateUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(updateUser.fulfilled, (state, action) => {
            const updatedUser = action.payload
            const userIndex = state.users.findIndex((user) => user._id === updatedUser._id)

            if(userIndex !== -1) {
                state.users[userIndex] = updatedUser
            }
        })
        .addCase(updateUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        // Delete the user
        .addCase(deleteUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(deleteUser.fulfilled, (state, action) => {
            state.users = state.users.filter((user) => user._id !== action.payload)
        })
        .addCase(deleteUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.error.message
        })
        // Add the new user
        .addCase(addUser.pending, (state) => {
            state.loading = true
            state.error = null
        })
        .addCase(addUser.fulfilled, (state, action) => {
            state.loading = false
            state.users.push(action.payload.user)
        })
        .addCase(addUser.rejected, (state, action) => {
            state.loading = false
            state.error = action.payload.message
        })
    }
})

export default adminSlice.reducer