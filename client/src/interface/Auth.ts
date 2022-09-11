import { GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { NavigateFunction } from 'react-router-dom';

export interface Cart {
    nameProduct: string,
    name: string,
    image: string,
    amount: number,
    price: number,
}

export interface Notifi{
    idProduct: string,
    nameShop: string
}

export interface User {
    _id?: string,
    email?: string;
    password?: string;
    name?: string;
    money?: number;
    role?: "User" | "Admin" | "Boss" | "Owner";
    idBrand?: string,
    notification?: Notifi[],
    ban?: boolean;
    googleId?: string,
    waitingLine?: string[],
    facebookId?: string,
    avatar?: string;
    cart?: Cart[];
    createdAt?: Date;
    updatedAt?: Date;
}

export interface response {
    id?: string,
    query?: string,
    formValue?: User,
    navigate?: NavigateFunction
}


export interface localStr{
    result?: User,
    accessToken?: string
}

export interface googleAuthInt {
    profileObj: any;
    tokenId: string;
    googleId: string;
    googleLoginResponse: GoogleLoginResponse | GoogleLoginResponseOffline;
}

export interface addCart {
    nameProduct: string,    
    amount: number
}

export interface buy {
    total: number,
    element: string[]
}