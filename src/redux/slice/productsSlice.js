import { createSlice } from "@reduxjs/toolkit";
import { fetchProductDetails, fetchProductsByFilters, fetchSimilarProducts, updateProduct } from "../thunk/productsThunk.js";

const productsSlice = createSlice({
  name: "products",
  initialState: {
    products: [],
    selectedProduct: null, // Store the details of the single product
    similarProducts: [],
    loading: false,
    error: null,
    filters: {
      collection: "",
      size: "",
      color: "",
      gender: "",
      minPrice: "",
      maxPrice: "",
      sortBy: "",
      search: "",
      category: "",
      material: "",
      brand: "",
      limit: "",
    },
  },
  reducers: {
    setFilters: (state, action) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    clearFilters: (state) => {
      state.filters = {
        collection: "",
        size: "",
        color: "",
        gender: "",
        minPrice: "",
        maxPrice: "",
        sortBy: "",
        search: "",
        category: "",
        material: "",
        brand: "",
        limit: "",
      };
    },
  },
  extraReducers: (builder) => {
    builder
    // handle fetching products with filter
    .addCase(fetchProductsByFilters.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fetchProductsByFilters.fulfilled, (state, action) => {
        state.loading = false
        state.products = Array.isArray(action.payload) ? action.payload : []
    })
    .addCase(fetchProductsByFilters.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
    // handle fetching single product details
    .addCase(fetchProductDetails.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fetchProductDetails.fulfilled, (state, action) => {
        state.loading = false
        state.selectedProduct = action.payload
    })
    .addCase(fetchProductDetails.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
    // handle updating product
    .addCase(updateProduct.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(updateProduct.fulfilled, (state, action) => {
        state.loading = false
        const updatedProduct = action.payload
        const index = state.products.findIndex((product) => product._id === updatedProduct._id) // check this

        if(index !== -1) {
            state.products[index] = updatedProduct
        }
    })
    .addCase(updateProduct.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
     // handle fetching similar products
    .addCase(fetchSimilarProducts.pending, (state) => {
        state.loading = true
        state.error = null
    })
    .addCase(fetchSimilarProducts.fulfilled, (state, action) => {
        state.loading = false
        state.similarProducts = action.payload
    })
    .addCase(fetchSimilarProducts.rejected, (state, action) => {
        state.loading = false
        state.error = action.error.message
    })
  },
});

export const {setFilters, clearFilters} = productsSlice.actions
export default productsSlice.reducer