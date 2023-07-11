import { createAsyncThunk, createSlice } from "@reduxjs/toolkit"
import { fetchAllProducts, fetchProductsByFilter } from "./ProductAPI"

const initialState = {
    products: [],
    status: 'idle'
}

export const fetchAllProductsAsync = createAsyncThunk(
    'product/fetchAllProducts',
    async (filter) => {
        const response = await fetchAllProducts(filter);
        return response.data;
    }
);

export const fetchProductsByFiltersAsync = createAsyncThunk(
    'product/fetchProductByFilters',
    async () => {
        const response = await fetchProductsByFilter();
        return response.data
    }
)

export const productSlice = createSlice({
    name: 'product',
    initialState,
    extraReducers: (builder) => {
        builder
            .addCase(fetchAllProductsAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchAllProductsAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
            .addCase(fetchProductsByFiltersAsync.pending, (state) => {
                state.status = 'loading';
            })
            .addCase(fetchProductsByFiltersAsync.fulfilled, (state, action) => {
                state.status = 'idle';
                state.products = action.payload;
            })
    }
});

export const selectAllProducts = state => state.product.products;
export default productSlice.reducer;
