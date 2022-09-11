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

export interface Auth {
    _id: string,
    email: string;
    password: string;
    name: string;
    money: number;
    role: "User" | "Admin" | "Boss" | "Owner";
    idBrand: string,
    ban: boolean;
    googleId: string,
    notification: Notifi[],
    waitingLine: string[],
    facebookId: string,
    avatar: string;
    cart: Cart[];
    createdAt: Date;
    updatedAt: Date;
}

export interface Decode {
    email?: string,
    idShop?: string,
    code?: number,
    id?: string,
    iat?: number,
    exp?: number
}
