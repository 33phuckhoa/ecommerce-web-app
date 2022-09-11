import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { formProduct } from '../../interface/Product';
import * as api from '../api';

export const getProducts = createAsyncThunk(
    "/product/getProducts", 
    async(_, {rejectWithValue}) => 
    {
        try {
            const response = await api.getProducts();
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const getProduct = createAsyncThunk(
    "/product/getProduct", 
    async(id: string, {rejectWithValue}) => 
    {
        try {
            const response = await api.getProduct(id);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const getSearchProduct = createAsyncThunk(
    "/product/getSearchProduct", 
    async(searchQuery: string, {rejectWithValue}) => 
    {
        try {
            const response = await api.searchProduct(searchQuery);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const getTag = createAsyncThunk(
    "/product/getTag", 
    async(tag: string, {rejectWithValue}) => 
    {
        try {
            const response = await api.getTag(tag);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
)

const productSlice = createSlice({
    name: 'product',
    initialState: {
        products: [],
        searchProducts: [],
        product: null,
        loading: false,
        error: "",
        search: ""
    },
    reducers: {
        setSearch: (state, action) => {
            state.search = action.payload
        }
    }, 
    extraReducers: builder => {
        builder.addCase(getProducts.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getProducts.fulfilled, (state, action) => {
            state.loading = false;
            state.products = action.payload.products;
        });
        builder.addCase(getProducts.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(getProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.product = action.payload.product;
        });
        builder.addCase(getProduct.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(getSearchProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getSearchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.searchProducts = action.payload.products;
        });
        builder.addCase(getSearchProduct.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(getTag.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getTag.fulfilled, (state, action) => {
            state.loading = false;
            state.searchProducts = action.payload.products;
        });
        builder.addCase(getTag.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
    }
})

export default productSlice.reducer;
export const {setSearch} = productSlice.actions;