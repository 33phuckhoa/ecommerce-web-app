import { buy,  response } from './../../interface/Auth';
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import {addCart} from '../../interface/Auth';
import {toast} from 'react-toastify';
import * as api from '../api';


export const getAll = createAsyncThunk(
    "/auth/getAll",
    async(_, {rejectWithValue}) => 
    {
        try {
            const response = await api.getAll();
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data)
        }
    }
)

export const getSearchUser = createAsyncThunk(
    "/auth/getSearchUser",
    async(searchQuery: string, {rejectWithValue}) => 
    {
        try {
            console.log(searchQuery);
            const response = await api.searchUser(searchQuery);
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data)
        }
    }
)

export const login = createAsyncThunk(
    "/auth/login",
    async(res: response, {rejectWithValue}) => 
    {
        try {
            const response = await api.login(res.formValue!);
            res.navigate!("/");
            toast.success("Login is successfully");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data)
        }
    }
)

export const register = createAsyncThunk(
    "/auth/register",
    async(res: response, {rejectWithValue}) => 
    {
        try {
            console.log("helo")
            const response = await api.register(res.formValue!);
            res.navigate!("/");
            toast.success("Register is successfully");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data)
        }
    }
)

export const signInGoogle = createAsyncThunk(
    "/auth/signInGoogle", 
    async(res: response, {rejectWithValue}) => 
    {
        try {
            const response = await api.signInGoogle(res.formValue!);
            res.navigate!("/");
            toast.success("Register is successfully");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data)
        }
    }
)

export const addToCart = createAsyncThunk(
    "/auth/addCart", 
    async(formValue: addCart, {rejectWithValue}) => 
    {
        try {
            const response = await api.addProduct(formValue);
            console.log(response)
            toast.success("Add To Cart is successfully");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data)
        }
    }
)

export const removeToCart = createAsyncThunk(
    "/auth/removeCart", 
    async(formValue: {element: string[]}, {rejectWithValue}) => 
    {
        try {
            const response = await api.removeProduct(formValue);
            toast.success("Remove To Cart is successfully");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data)
        }
    }
)

export const buyProduct = createAsyncThunk(
    "/auth/buyProduct", 
    async(formValue: buy, {rejectWithValue}) => 
    {
        try {
            const response = await api.buyProduct(formValue);
            toast.success("You are successfully casted");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const rechargeUser = createAsyncThunk(
    "/auth/recharge", 
    async(formValue: {total: number}, {rejectWithValue}) => 
    {
        try {
            const response = await api.recharge(formValue);
            toast.success("You are successfully recharged");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const updateUser = createAsyncThunk(
    "/auth/updateUser", 
    async(formValue: {name: string, email: string, avatar: string}, {rejectWithValue}) => 
    {
        try {
            const response = await api.updateUser(formValue);
            toast.success("You are successfully updated");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const avaluatePro = createAsyncThunk(
    "/auth/avaluate", 
    async(res: {formValue1: {image: string, comment: string, star: number, idShop: string}, id: string}, {rejectWithValue}) => 
    {
        try {
            const response = await api.avaluate(res.formValue1, res.id);
            toast.success("You are successfully commented");
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data);
        }
    }
)

export const updateRoleLu = createAsyncThunk(
    "/auth/updateRoles", 
    async(id: string, {rejectWithValue}) => 
    {
        try {
            console.log(id);
            const response = await api.updateRoles(id);
            return response.data;
        } catch (error: string | any) {
            rejectWithValue(error.response.data);
        }
    }
)

const authSlice = createSlice({
    name: 'auth',
    initialState: {
        user: null,
        loading: false,
        error: "",
        visited: "",
        users: [],
        searchUser: [],
        check: false
    },
    reducers: {
        setLogout: (state) => {
            state.user = null;
            localStorage.clear();
            state.visited = "Login";
        },
        setVisited: (state, action) => {
            state.visited = action.payload;
        },
        getUser: (state, action) => {
            state.user = action.payload;
        },
        setFollow: (state, action) => {
            state.check = action.payload;
        }
    },
    extraReducers: builder =>  {
        builder.addCase(login.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(login.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
            state.visited = "Home";
        });
        builder.addCase(login.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(register.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(register.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
            state.visited = "Home";
        });
        builder.addCase(register.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(signInGoogle.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(signInGoogle.fulfilled, (state, action) => {
            state.loading = false;
            localStorage.setItem("profile", JSON.stringify({...action.payload}));
            state.user = action.payload;
            state.visited = "Home";
        });
        builder.addCase(signInGoogle.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(addToCart.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(addToCart.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(addToCart.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(removeToCart.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(removeToCart.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(removeToCart.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(buyProduct.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(buyProduct.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(buyProduct.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(rechargeUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(rechargeUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(rechargeUser.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(updateUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateUser.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(updateUser.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(avaluatePro.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(avaluatePro.fulfilled, (state, action) => {
            state.user = action.payload;
            state.loading = false;
        });
        builder.addCase(avaluatePro.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(getAll.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getAll.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.loading = false;
        });
        builder.addCase(getAll.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(getSearchUser.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(getSearchUser.fulfilled, (state, action) => {
            state.searchUser = action.payload.users;
            state.loading = false;
        });
        builder.addCase(getSearchUser.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
        builder.addCase(updateRoleLu.pending, (state, action) => {
            state.loading = true;
        });
        builder.addCase(updateRoleLu.fulfilled, (state, action) => {
            state.users = action.payload.users;
            state.loading = false;
        });
        builder.addCase(updateRoleLu.rejected, (state, action) => {
            state.loading = false;
            if(action.payload){
                state.error = "Information is invalid";
            }
        });
    }
})

export default authSlice.reducer;
export const {setLogout, setVisited, getUser, setFollow} = authSlice.actions;