import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import { toast } from 'react-toastify';
import { formProduct, updateProduct } from '../../interface/Product';
import { createShop } from '../../interface/Shop';
import * as api from '../api';

export const getShop = createAsyncThunk(
    "/shop/getShop",
    async (id: string, {rejectWithValue}) => 
    {
        try {
            const response = await api.getShop(id);
            return response.data; 
        } catch (error: any) {
          rejectWithValue(error.response.data);  
        }
    }
)

export const getShops = createAsyncThunk(
    "/shop/getShops",
    async (_, {rejectWithValue}) => 
    {
        try {
            const response = await api.getShops();
            return response.data; 
        } catch (error: any) {
          rejectWithValue(error.response.data);  
        }
    }
)

export const follow = createAsyncThunk(
    "/auth/follow", 
    async(res: {id: string, formValue: {state: string}}, {rejectWithValue}) => 
    {
        try {
            const response = await api.follow(res.id, res.formValue);
            toast.success("You are successfully followed");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const chatWithShop = createAsyncThunk(
    "/auth/chatWithShop", 
    async(res: {formValue: {mess: string}, id: string}, {rejectWithValue}) => 
    {
        try {
            const response = await api.chatWithShop(res.id, res.formValue);
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const createProduct = createAsyncThunk(
    "/product/createProduct", 
    async(formValue: formProduct, {rejectWithValue}) => 
    {
        try {
            const response = await api.createProduct(formValue);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const deleteProduct = createAsyncThunk(
    "/product/deleteProduct", 
    async(id: string, {rejectWithValue}) => 
    {
        try {
            const response = await api.deleteProduct(id);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const patchProduct = createAsyncThunk(
    "/product/patchProduct", 
    async(res: {id: string, formValue1: updateProduct}, {rejectWithValue}) => 
    {
        try {
            const response = await api.patchProduct(res.id, res.formValue1);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const createShops = createAsyncThunk(
    "/shop/createShop",
    async(formValue1: createShop, {rejectWithValue}) => 
    {
        try {
            const response = await api.createShops(formValue1);
            return response.data;
        } catch (error: any) {
            rejectWithValue(error.response.data);
        }
    }
)

const shopSlice = createSlice({
    name: "shop",
    initialState: {
        shop: null,
        shops: [],
        loading: false,
        error: ""
    },
    reducers: {

    },
    extraReducers: builder => {
        builder.addCase(getShop.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getShop.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload.shop;
        });
        builder.addCase(getShop.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        })
        builder.addCase(follow.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(follow.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload.result;
        });
        builder.addCase(follow.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        })
        builder.addCase(getShops.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getShops.fulfilled, (state, action) => {
            state.loading = false;
            state.shops = action.payload.shop;
        });
        builder.addCase(getShops.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        })
        builder.addCase(chatWithShop.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(chatWithShop.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload.result;
        });
        builder.addCase(chatWithShop.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        })
        builder.addCase(createProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload.result;
        });
        builder.addCase(createProduct.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        })
        builder.addCase(deleteProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(deleteProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload.newShop;
        });
        builder.addCase(deleteProduct.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        })
        builder.addCase(patchProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(patchProduct.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload.newShop;
        });
        builder.addCase(patchProduct.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        })
        builder.addCase(createShops.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(createShops.fulfilled, (state, action) => {
            state.loading = false;
            state.shop = action.payload.newShop;
        });
        builder.addCase(createShops.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        })
    }
})

export default shopSlice.reducer;