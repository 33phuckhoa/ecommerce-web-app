import { NextFunction, Request, Response } from "express";
import jwt from 'jsonwebtoken';
import { Decode } from "../interface/auth";
import { AuthModal } from "../models/auth";

declare global {
    namespace Express {
        interface Request {
            userId?: string;
            idShop?: string
        }
    }
}

export const auth = async(req: Request, res: Response, next: NextFunction) => {
    try {
        const token: string | undefined= req.headers.authorization?.split(" ")[1];
        if(typeof token === "string"){
            const decoded = jwt.verify(token, process.env.ACCESS_TOKEN!) as Decode;
            if (decoded){
                const oldUser: any = await AuthModal.findOne({email: decoded.email});
                req.userId = oldUser._id;
                req.idShop = decoded.idShop;
            }
            next();
        }
        

    } catch (error) {
        res.status(500).json({msg: "Interval Server Error"});
        localStorage.clear();
    }
}