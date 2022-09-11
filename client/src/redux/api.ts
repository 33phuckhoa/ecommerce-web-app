import axios from 'axios';
import { addCart, localStr, User } from '../interface/Auth';
import { formProduct, updateProduct } from '../interface/Product';
import { createShop } from '../interface/Shop';


const userStr: localStr = JSON.parse(localStorage?.getItem("profile")!);

const API = axios.create({baseURL: "http://localhost:4000"});
const Api = axios.create({baseURL: "http://localhost:4000"});
API.interceptors.request.use((req: any) => {
    if(localStorage.getItem("profile")){
        req.headers.Authorization = `Bearer ${JSON.parse(userStr.accessToken!)}`
    }

    return req;
})

export const getAll = () => axios.get("http://localhost:4000/auth");
export const login = (formValue: User) => API.post("/auth/login", formValue);
export const register = (formValue: User) => API.post("/auth/register", formValue); 
export const signInGoogle = (formValue: User) => API.post("/auth/signInGoogle", formValue);
export const updateUser = (formValue: {name: string, email: string, avatar: string}) => axios.patch(`http://localhost:4000/auth/profile`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const updateRoles = (id: string)  => 
axios.patch(`http://localhost:4000/auth/role/${id}`,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const addProduct = (formValue: addCart) => axios.patch("http://localhost:4000/auth/cart/add", formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});

export const searchUser = (searchQuery: string) => axios.get(`http://localhost:4000/auth/search?searchQuery=${searchQuery}`);
export const removeProduct = (formValue: {element: string[]}) => axios.patch("http://localhost:4000/auth/cart/remove", formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const buyProduct = (formValue: {total: number, element: string[]}) => axios.patch(`http://localhost:4000/auth/buy`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const recharge = (formValue: {total: number}) => axios.patch(`http://localhost:4000/auth/recharge`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const avaluate = (formValue: {image: string, comment: string, star: number, idShop: string}, id: string)  => 
axios.patch(`http://localhost:4000/auth/comment/${id}`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const follow = (id: string, formValue: {state: string})  => 
axios.patch(`http://localhost:4000/auth/follow/${id}`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const chatWithShop = (id: string, formValue: {mess: string})  => 
axios.patch(`http://localhost:4000/auth/chatShop/${id}`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});

export const getProducts = () => Api.get("/product");
export const getProduct = (id: string) => Api.get(`/product/${id}`);
export const createProduct = (formValue: formProduct)  => 
axios.post(`http://localhost:4000/product`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const deleteProduct = (id: string)  => 
axios.delete(`http://localhost:4000/product/${id}`,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});

export const patchProduct = (id: string, formValue: updateProduct)  => 
axios.patch(`http://localhost:4000/product/${id}`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});
export const searchProduct = (searchQuery: string) => axios.get(`http://localhost:4000/product/search?searchQuery=${searchQuery}`);
export const getTag = (tag: string) => axios.get(`http://localhost:4000/product/tag/${tag}`);


export const getShop = (id: string) => Api.get(`/shop/${id}`);
export const getShops = () => Api.get(`/shop`);
export const createShops = (formValue: createShop)  => 
axios.post(`http://localhost:4000/shop`, formValue,
{
  headers: {
    'Content-Type': 'application/json',
    "Authorization" : `Bearer ${userStr.accessToken}`
  }
});