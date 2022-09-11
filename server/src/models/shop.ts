import { model, Schema } from "mongoose"
import { Shop } from "../interface/shop";


const shopSchema = new Schema<Shop>({
    owner: {
        type: String,
        required: true,
        unique: true
    },
    brand: {
        type: String,
        required: true,
        unique: true
    },
    avatar: {
        type: String
    },
    follower: {
        type: [String],
        default: []
    },
    products: {
        type: [String],
        default: []
    },
    responseChat: {type: Number},
    star: {
        type: Number, 
        default: 0
    },
    allType: {
        type: [String], 
        default: []
    },
    codeDiscount: {
        type: [String], 
        default: []
    },
    admin: {
        type: [String], 
        default: []
    },
    conser: {
        type: [Object], 
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    }
})

export const ShopModal = model<Shop>("shop", shopSchema);