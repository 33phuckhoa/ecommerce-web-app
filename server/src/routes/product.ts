import express from 'express';
import { createProduct, removeProduct, repComment, updateProduct, getAllProducts, getProduct, getSearchProduct, getTag } from '../controllers/product';
import { auth } from '../middleware/auth';
const router = express.Router();

router.get("/", getAllProducts);
router.get('/search', getSearchProduct);
router.get('/tag/:tag', getTag);
router.get("/:id", getProduct);
router.post("/", auth, createProduct);       
router.delete("/:id", auth, removeProduct); 
router.patch("/:id", updateProduct);
router.patch("/comment/:id", repComment);

export default router;