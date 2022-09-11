export interface Avaluate {
    userId?: string,
    contentComment?: string,
    resposeAdmin?: string,
    starAvaluate?: number,
    imageComment?: string,
}

interface Price {
    cost: number,
    discountPrice?: number
}

interface Review {
    image: string[],
    video: string
}

interface Amount{
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