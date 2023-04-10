import { Router } from "express";
import { login, signup, logout } from "../controllers/authControllers";

const router = Router();

router.post("/signup", signup);
router.get("/logout", logout);
router.post("/login", login);

export default router;
