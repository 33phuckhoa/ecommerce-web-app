import { model, Schema } from "mongoose"
import { Product } from "../interface/product";



const productSchema = new Schema<Product>({
    brand: {
        type: String,
        required: true
    },
    title: {type: String},
    description: {type: String},
    price: {type: Object},
    review: {
        type: Object,
        default: {}
    },
    avaluate: {
        type: [Object],
        default: []
    },
    sale: {
        type: Number,
        default: 0
    },
    amount: {
        type: Object,
        default: {}
    },
    typeProduct: {
        type: [String],
        default: []
    },
    star: {type: Number},
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export const ProductModal = model<Product>("product", productSchema);