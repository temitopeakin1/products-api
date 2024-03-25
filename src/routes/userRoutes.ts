import validateToken from "../middleware/validateTokenHandler";
import { registerUser, loginUser, currentUser } from "../controller/userController";
import express, { Request, Response, Router } from "express";

const router: Router = express.Router();

router.post("/register", registerUser);

router.post("/login", loginUser);

router.get("/current", validateToken, currentUser);

export default router;
