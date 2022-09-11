import jwt from 'jsonwebtoken';
import { Request, Response } from "express";
import { Auth } from "../interface/auth";
import { ShopModal } from "../models/shop";
import { AuthModal } from '../models/auth';
import { Conservation, Shop } from '../interface/shop';
import deleteOneUnit from '../config/one';

export const getShop = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const shop = await ShopModal.findById(id);
        res.json({shop});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const getShops = async(req: Request, res: Response) => {
    try {
        const shop = await ShopModal.find({});
        res.json({shop});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error s"});
    }
}

export const createShop = async(req: Request, res: Response) => {
    const {brand, avatar} = req.body;
    try {
        const shop = await ShopModal.findOne({owner: req.userId}) as Shop;
        const user = await AuthModal.findById(req.userId) as Auth;
        if(shop){
            return res.status(404).json({msg: "This user had become before"});
        }

        const newShop = await ShopModal.create({
            owner: req.userId,
            brand,
            avatar
        }) as Shop;
        user.role = "Owner"; 
        user.idBrand = newShop._id;
        await AuthModal.findByIdAndUpdate(req.userId, user, {new: true});
        res.json({newShop});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const loginShop = async(req: Request, res: Response) => {
    try {
        
        const shop = await ShopModal.findById(req.idShop) as Shop;
        const user = await AuthModal.findById(req.userId) as Auth;
        if(!shop){
            return res.status(404).json({msg: "This shop is not exists"});
        }

        if(shop._id.toString()===user.idBrand){
            res.json({shop});
        }
        for(let i = 0; i < shop.admin.length; i++){
            if(shop.admin[i]===user._id.toString()){
                res.json({shop});
            }
            break;
        }
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const addDiscountCode = async(req: Request, res: Response) => {
    const {code, time} = req.body;
    try {
        const shop = await ShopModal.findById(req.idShop) as Shop;
        for(let i = 0; i < shop.codeDiscount.length; i++){
            if(shop.codeDiscount[i]===code){
                return res.status(404).json({msg: "This code had had in the shop"});
            }
        }
        const signCode = jwt.sign({id: shop._id, code}, process.env.ACCESS_TOKEN!, {expiresIn: `${time}h`})

        shop.codeDiscount.push(signCode);

        const updatedShop = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});
        res.json({updatedShop});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const deleteDiscountCode = async(req: Request, res: Response) => {
    const {code} = req.body;
    try {
        const shop = await ShopModal.findById(req.idShop) as Shop;
        shop.codeDiscount = deleteOneUnit<string>(shop.codeDiscount, code);
        const updatedShop = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});
        res.json({updatedShop});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

//Conversation
export const chatWithClient = async(req: Request, res: Response) => {
    const {mess} = req.body;
    const {id} = req.params;
    try {
        const shop = await ShopModal.findById(req.idShop) as Shop;
        for(let i = 0; i < shop.conser.length; i++){
            if(shop.conser[i].userId.toString()===id.toString()){
                shop.conser[i].adChat.push(mess);
                break;
            }
        }

        const updatedCon = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});
        res.json({updatedCon});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const deleteChatClient = async(req: Request, res: Response) => {
    const {mess} = req.body;
    const {id} = req.params;
    try {
        const shop = await ShopModal.findById(req.idShop) as Shop;
        for(let i = 0; i < shop.conser.length; i++){
            if(shop.conser[i].userId.toString()===id.toString()){
                shop.conser[i].adChat = deleteOneUnit<string>(shop.conser[i].adChat, mess);
                break;
            }
        }

        const updatedCon = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});
        res.json({updatedCon});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}