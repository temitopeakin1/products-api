import express, { Request, Response, Router } from "express";
import { getProducts, getProduct, createProduct, updateProduct, deleteProduct } from "../controller/productController";
import validateToken from "../middleware/validateTokenHandler";

const router: Router = express.Router();


router.get("/", getProducts);

router.get("/:id", getProduct);

router.post("/", createProduct);

router.put("/:id", updateProduct);

router.delete("/:id", deleteProduct);

router.use(validateToken);

export default router;
 