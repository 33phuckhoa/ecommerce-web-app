import mongoose, { Schema } from "mongoose";
import { Auth } from "../interface/auth";


const authSchema = new Schema<Auth>({
    email: {
        type: String,
        unique: true,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        unique: true,
        required: true
    },
    money: {
        type: Number,
        default: 0
    },
    notification: {
        type: [Object],
        default: []
    },
    role: {
        type:String,
        default: "User"
    },
    idBrand: {
        type: String,
        default: ""
    },
    ban: {
        type: Boolean,
        default: false
    },
    waitingLine: {
        type: [String],
        default: []
    },
    avatar: {
        type: String,
        default: "https://media.istockphoto.com/vectors/user-icon-flat-isolated-on-white-background-user-symbol-vector-vector-id1300845620?k=20&m=1300845620&s=612x612&w=0&h=f4XTZDAv7NPuZbG0habSpU0sNgECM0X7nbKzTUta3n8="
    },
    cart: {
        type: [Object],
        default: []
    },
    createdAt: {
        type: Date,
        default: new Date()
    },
    updatedAt: {
        type: Date
    },
    googleId: {type: String},
    facebookId: {type: String}
})

export const AuthModal = mongoose.model<Auth>('auth', authSchema);