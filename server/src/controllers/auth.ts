import { checkUser } from './../config/general';
import { Request, Response } from "express";
import { AuthModal } from "../models/auth";
import bcypth from 'bcryptjs';
import jwt from 'jsonwebtoken';
import { Auth, Cart, Decode } from "../interface/auth";
import deleteMultiUnit, {  } from "../config/multi";
import { ProductModal } from "../models/product";
import { Avaluate, Product } from "../interface/product";
import { ShopModal } from "../models/shop";
import { Conservation, Shop } from "../interface/shop";
import { removeAndAddCart } from "../config/general";
import deleteOneUnit from "../config/one";

export const getAll = async(req: Request, res: Response) => {
    try {
        const users = (await AuthModal?.find({})) as Auth[] | unknown;
        res.json({users});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const getSearchUser = async(req: Request, res: Response) => {
    const {searchQuery} = req.query;
    try {
        if(typeof searchQuery === 'string'){
            const name = new RegExp(searchQuery, "i");
            const users = await AuthModal.find({name});
            res.json({users});
        }
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const login = async(req: Request, res: Response) => {
    const {email, password} = req.body;
    try {
        const user= await AuthModal.findOne({email}) as Auth;
        if(!user){
            return res.status(404).json({msg: "Email or Password is not invalid"});
        }
        else if(user?.ban){
            return res.status(404).json({msg: "Your had been banned"});
        }

        const isPassword: boolean = await bcypth.compare(password, user.password);
        if(!isPassword){
            return res.status(404).json({msg: "Email or Password is not invalid"});
        }

        const accessToken = jwt.sign({email: user.email, idShop: user.idBrand}, process.env.ACCESS_TOKEN!, {expiresIn: '1h'});
        res.json({result: user, accessToken});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const register = async(req: Request, res: Response) => {
    const {email, password, name} = req.body;
    try {
        const user = await AuthModal.findOne({email}) as Auth;
        if(user){
            return res.status(404).json({msg: "User had been exists"});
        }

        const hashPassword = await bcypth.hash(password, 10);
        const newUser = await AuthModal.create({
            email,
            password: hashPassword,
            name
        }) as Auth;
        const acccessToken = jwt.sign({email: newUser.email, idShop: newUser.idBrand}, process.env.ACCESS_TOKEN!, {expiresIn: '1h'});
        res.json({result: newUser, acccessToken});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const signInGoogle = async(req: Request, res: Response) => {
    const {email, name, token, googleId} = req.body;
    try {
        const user = await AuthModal.findOne({email});
        if(user) {
            const result = { _id: user._id.toString(), email, name };
            return res.status(200).json({ result, token });
        }

        const result = await AuthModal.create({
            email,
            name,
            googleId,
        });
      
        res.status(200).json({ result, token });
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const updateUser = async(req: Request, res: Response) => {
    const {name, email, avatar} = req.body;
    try {
        const user = await AuthModal.findById(req.userId) as Auth;
        user.name = name;
        user.email = email;
        user.avatar = avatar;

        const result = await AuthModal.findByIdAndUpdate(req.userId , user, {new: true});
        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval s Server Error"});
    }
}

export const updateRole = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        console.log(id);
        const user = await AuthModal.findById(id) as Auth;
        const ad = await AuthModal.findById(req.userId) as Auth;
        const shop = await ShopModal.findById(req.idShop) as Shop;
        if(!user){
            res.status(404).json({msg: "User is not exists"});
        }
        if(ad?.role === "Owner"){
            if(user?.role === "User"){
                user.role = "Admin";
                shop.admin.push(user._id);
            }
            else if(user?.role === "Admin") {
                user.role = "User";
                shop.admin = deleteOneUnit<string>(shop.admin, user._id.toString());
            }

            user.updatedAt = new Date();

            await AuthModal.findByIdAndUpdate(id, user, {new: true});
            const updatedShop = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});
            const users = await AuthModal.find({});
            res.json({users});
        }
        else {
            return res.status(404).json({msg: "You are not qualified to do this"});
        }

    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const banUser = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const user = await AuthModal.findById(id) as Auth;
        const ad = await AuthModal.findById(req.userId) as Auth;
        
        if(ad?.role === "Admin" || ad?.role === "Boss"){
            user.ban = !user.ban;

            const updatedUser = await AuthModal.findByIdAndUpdate(id, user, {new: true});
            res.json({updatedUser});
        }
        else {
            return res.status(404).json({msg: "You are not qualified to do this"});
        }
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const addCart = async(req: Request, res: Response) => {
    const {nameProduct, amount} = req.body;
    try {
        const user = await AuthModal.findById(req.userId) as Auth;
        const pro = await ProductModal.findById(nameProduct) as Product;
        
        let index: number | null = null;
        
        for(let i = 0; i < user.cart.length; i++){
            if(user.cart[i].nameProduct===nameProduct){
                index = i;
                break;
            }
        }

        if(typeof index === "number"){
            user.cart[index].amount += amount;
        }
        else {
            const product = {
                nameProduct, 
                name: pro.title,
                amount, 
                price: pro.price.discountPrice,
                image: pro.review.image[0]
            } as Cart;
            user.cart.push(product);
        }

        removeAndAddCart(nameProduct, amount, "-");

        const result = await AuthModal.findByIdAndUpdate(user._id, user, {new: true});
        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const removeProduct = async(req: Request, res: Response) => {
    const {element}: {element: string[]} = req.body;
    try {
        const user = await AuthModal.findById(req.userId) as Auth;  
        
        for(let i = 0; i < element.length; i++){
            for(let j = 0; j < user.cart.length; j++){
                if(element[i].toString()===user.cart[j].nameProduct.toString()){
                    console.log(element);
                    
                    removeAndAddCart(element[i], user.cart[j].amount, "+");
                }
            }
        }
        user.cart = deleteMultiUnit<Cart>(user.cart, element);
        const result = await AuthModal.findByIdAndUpdate(user._id, user, {new: true});
        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const clearCart = async(req: Request, res: Response) => {
    try {
        const user = await AuthModal.findById(req.userId) as Auth;

        for(let i = 0; i < user.cart.length; i++){
            removeAndAddCart(user.cart[i].nameProduct, user.cart[i].amount, "+");
        }

        user.cart = [];
        const updatedUser = await AuthModal.findByIdAndUpdate(user._id, user, {new: true});
        res.json({updatedUser});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const buyProduct = async(req: Request, res: Response) => {
    const {total, element}: {total: number, element: string[]} = req.body;
    try {
        const user = await AuthModal.findById(req.userId) as Auth;
        if(user.money < total){
            return res.status(404).json({msg: "You must recharge"})
        }
        
        user.money -= total;
        user.cart = deleteMultiUnit<Cart>(user.cart, element);

        for(let i = 0; i < element.length; i++){
            if(user.waitingLine.length===0){
                user.waitingLine.push(element[i]);
            }
            else {
                let check = false;
                for(let j = 0; j < user.waitingLine.length; j++){
                    if(element[i]!==user.waitingLine[j]){
                        check=true;
                    }
                }
                if(check){
                    user.waitingLine.push(element[i]);
                }
            }
        }

        const result = await AuthModal.findByIdAndUpdate(req.userId, user, {new: true});
        res.json({result})
    } catch (error) {
        res.status(500).json({msg: "Interval Server s Error"});
    }
}

export const recharge = async(req: Request, res: Response) => {
    const {total} = req.body;
    try {
        const user = await AuthModal.findById(req.userId) as Auth;
        user.money = total;

        const result = await AuthModal.findByIdAndUpdate(req.userId, user, {new: true});
        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const avaluate = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {image, comment, star, idShop} = req.body;
    try {
        const product = await ProductModal.findById(id) as Product;
        const avaluate = {} as Avaluate;
        avaluate.starAvaluate = star;
        avaluate.userId = req.userId;
        if(image && comment){
            avaluate.imageComment = image;
            avaluate.contentComment = comment;
        }

        product.avaluate.push(avaluate);
        let total: number = 0;
        
        for(let i = 0;  i < product.avaluate.length; i++){
            total += product.avaluate[i].starAvaluate!;
        }
        product.star = total/product.avaluate.length;
        
        await ProductModal.findByIdAndUpdate(id, product, {new: true});
        
        const shop = await ShopModal.findById(idShop) as Shop;
        let starTotal = 0;
        for(let i = 0; i < shop.products.length; i++){
            const pro = await ProductModal.findById(shop.products[i]) as Product;
            starTotal += pro.star;
        }
        shop.star = starTotal/shop.products.length;

        await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});

        const user = await AuthModal.findById(req.userId) as Auth;

        user.waitingLine = deleteOneUnit<string>(user.waitingLine, id);

        const result = await AuthModal.findByIdAndUpdate(user._id, user, {new: true});
        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval ss Server Error"});
    }
}

export const followShop = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {state} = req.body;
    try {
        const shop = await ShopModal.findById(id) as Shop;
        if(state==="plus"){
            if(checkUser(shop.follower, req.userId?.toString()!)){
                shop.follower.push(req.userId?.toString()!);
            }
            else {
                return res.status(404).json({msg: "This user had had in list"})
            }
        }
        else if(state === "minus"){
            
            shop.follower = deleteOneUnit<string>(shop.follower, req.userId?.toString()!);
        }
        
        const result = await ShopModal.findByIdAndUpdate(id, shop, {new: true});
        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}
export const chatWithShop = async(req: Request, res: Response) => {
    const {mess} = req.body;
    const {id} = req.params;
    try {
        const shop = await ShopModal.findById(id) as Shop;
        let index = -1;
        for(let i = 0; i < shop.conser.length; i++){
            if(shop.conser[i].userId.toString()===req.userId!.toString()){
                index = i;
                break;
            }
        }

        if(index !== -1){
            shop.conser[index].userChat.push(mess);
        }
        else{
            const conver = {
                userId: req.userId,
                shopId: id,
                userChat: [mess],
                adChat: []
            } as Conservation;
            shop.conser.push(conver);
        }

        const result = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});
        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const deleteChatShop = async(req: Request, res: Response) => {
    const {mess} = req.body;
    const {id} = req.params;
    try {
        const shop = await ShopModal.findById(id) as Shop;

        for(let i = 0; i < shop.conser.length; i++){
            if(shop.conser[i].userId.toString()===req.userId!.toString()){
                shop.conser[i].userChat = deleteOneUnit<string>(shop.conser[i].userChat, mess);
                break;
            }
        }

        const result = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});
        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}