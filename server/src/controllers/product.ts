import { Request, Response } from "express";
import deleteMultiUnit from "../config/multi";
import deleteOneUnit from "../config/one";
import { addType, updateType } from "../config/general";
import { Product } from "../interface/product";
import { Shop } from "../interface/shop";
import { AuthModal } from "../models/auth";
import { ProductModal } from "../models/product";
import { ShopModal } from "../models/shop";
import { Auth, Notifi } from "../interface/auth";


export const getProduct = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const product = await ProductModal.findById(id);
        res.json({product});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error ss"});
    }
}

export const getSearchProduct = async(req: Request, res: Response) => {
    const {searchQuery} = req.query;
    try {
        if(typeof searchQuery === 'string'){
            const title = new RegExp(searchQuery, "i");
            const products = await ProductModal.find({title});
            res.json({products});
        }
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error ss"});
    }
}

export const getTag = async(req: Request, res: Response) => {
    const {tag} = req.params;
    try {
        const products = await ProductModal.find({typeProduct: {$in: tag}});
        res.json({products});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error ss"});
    }
}

export const createProduct = async(req: Request, res: Response) => {
    const {title, description, price, type, amount, review} = req.body;
    try {
        const shop = await ShopModal.findById(req.idShop) as Shop;
        const pro = await ProductModal.findOne({title}) as Product;
        const user = await AuthModal.findById(req.userId) as Auth;

        if(pro){
            return res.status(404).json({msg: "This aticle had been exists"});
        }

        const product = await ProductModal.create({
            brand: shop._id,
            title, description,
            price:  {
                cost: price,
                discountPrice: price
            },
            typeProduct: type,
            amount: {
                total: amount,
                remainingStock: amount
            },
            review
        }) as Product;        

        const newNoti = {
            idProduct: product._id,
            nameShop: shop.brand
        } as Notifi;
        user.notification.push(newNoti);

        shop.allType = addType(shop.allType, type);

        shop.products.push(product._id);

        await AuthModal.findByIdAndUpdate(req.userId, user, {new: true});
        const result = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});

        res.json({result});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error ss"});
    }
}

export const removeProduct = async(req: Request, res: Response) => {
    const {id} = req.params;
    try {
        const deletedProduct = await ProductModal.findByIdAndRemove(id) as Product;
        const shop = await ShopModal.findById(req.idShop) as Shop;
        
        shop.products = deleteOneUnit<string>(shop.products, id);

        shop.allType = deleteMultiUnit<string>(shop.allType, deletedProduct.typeProduct);

        shop.allType = await updateType(shop.products, shop.allType);

        const newShop = await ShopModal.findByIdAndUpdate(shop._id, shop, {new: true});
        res.json({newShop});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const updateProduct = async(req: Request, res: Response) => {
    const {id} = req.params;
    const {title, description, review, price, amount, type} = req.body;
    try {
        const product = await ProductModal.findById(id) as Product;
        product.title = title;
        product.description = description;
        product.review = review;
        product.price.discountPrice = price
        product.amount.total = amount,
        product.typeProduct = type

        const updatedProduct = await ProductModal.findByIdAndUpdate(id, product, {new: true});
        res.json({updatedProduct});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const updateSale = async(req: Request, res: Response) => {
    const {sale, state} = req.body;
    const {id} = req.params;
    try {
        const product = await ProductModal.findById(id) as Product;
        if(state==="+"){
            product.sale += sale;
        }else if(state==="-" && product.sale > 0){
            product.sale -= sale;
        }
        product.price.discountPrice = product.price.cost - product.price.cost*sale/100;

        const updatedProduct = await ProductModal.findByIdAndUpdate(id, product, {new: true});
        res.json({updatedProduct});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const repComment = async(req: Request, res: Response) => {
    const {rep, index} = req.body;
    const {id} = req.params;
    try {
        const product = await ProductModal.findById(id) as Product;
        
        if(index !== -1){
            product.avaluate[index].resposeAdmin = rep;
        }

        const updatedProduct = await ProductModal.findByIdAndUpdate(id, product, {new: true});
        res.json({updatedProduct});
    } catch (error) {    
        res.status(500).json({msg: "Interval Server Error"});
    }
}

export const getAllProducts = async(req: Request, res: Response) => {
    try {
        const products = await ProductModal.find({});
        res.json({products});
    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
    }
}