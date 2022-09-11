export interface Avaluate {
    userId?: string,
    contentComment?: string,
    resposeAdmin?: string,
    starAvaluate?: number,
    imageComment?: string
}

export interface Price {
    cost: number,
    discountPrice?: number
}

export interface Review {
    image: string[],
    url: string
}

export interface Amount{
    total: number,
    remainingStock: number
}

export interface Product {
    _id: string,
    brand: string,
    title: string,
    description: string,
    price: Price,
    review: Review,
    avaluate: Avaluate[],
    sale: number,
    amount: Amount,
    typeProduct: string[],
    star: number,
    createdAt: Date
}

export interface formProduct{
    brand: string,
    title: string,
    description: string,
    review: Review
    price: number,
    amount: number,
    type: string[]
}

export interface updateProduct {
    title: string,
    description: string,
    review: Review,
    price: number,
    amount: number,
    type: string[]
}