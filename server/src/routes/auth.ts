import { Router } from "express";
import { addCart, avaluate, banUser, buyProduct, chatWithShop, clearCart, deleteChatShop, followShop, getAll, getSearchUser, login, recharge, register, removeProduct, signInGoogle, updateRole, updateUser } from "../controllers/auth";
import {auth} from '../middleware/auth';

const router: Router = Router();

router.get("/", getAll);
router.get("/search", getSearchUser);
router.post("/login", login);
router.post("/register", register);
router.post("/signInGoogle", signInGoogle);
router.patch("/profile", auth, updateUser);
router.patch("/role/:id", auth, updateRole);
router.patch("/ban/:id", auth, banUser);
router.patch("/cart/clear", auth, clearCart);
router.patch("/cart/add", auth, addCart);
router.patch("/cart/remove", auth, removeProduct);
router.patch("/comment/:id", auth, avaluate);
router.patch("/follow/:id", auth, followShop);
router.patch("/buy", auth, buyProduct);
router.patch("/recharge", auth, recharge);
router.patch("/chatShop/:id", auth, chatWithShop);
router.patch("/delelteMess/:id", auth, deleteChatShop);

export default router;