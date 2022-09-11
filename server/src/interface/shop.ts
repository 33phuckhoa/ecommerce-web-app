
export interface Conservation{
    userId: string,
    shopId: string,
    userChat: string[],
    adChat: string[]
}

export interface Shop {
    _id: string,
    owner: string,
    avatar: string,
    brand: string,
    follower: string[],
    products: string[],
    responseChat: number,
    star: number,
    allType: string[],
    codeDiscount: string[],
    admin: string[],
    conser: Conservation[],
    createdAt: Date
}