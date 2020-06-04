import { Router } from "express";
import { getIndex, getProduct, getProducts } from "../controller/shop";

// define Router
const router = Router();

// get requests
router.get('/', getIndex);
router.get('/products/:id',getProduct);
router.get('/products',getProducts);


 export default router;