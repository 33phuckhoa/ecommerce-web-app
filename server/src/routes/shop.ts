import express from 'express';
import { addDiscountCode, chatWithClient, createShop, deleteChatClient, deleteDiscountCode, getShop, getShops, loginShop } from '../controllers/shop';
import { auth } from '../middleware/auth';

const router = express.Router();

router.get("/:id", getShop);
router.get("/", getShops);
router.post("/", auth, createShop);
router.post("/signin", auth, loginShop);
router.patch("/discount", auth, addDiscountCode);
router.patch("/removeDis", auth, deleteDiscountCode);
router.patch("/chatClient/:id", auth, chatWithClient);
router.patch("/deleteMess/:id", auth, deleteChatClient);

export default router;