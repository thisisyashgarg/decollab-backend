import { Router } from "express";
import {
  login,
  signup,
  logout,
  profileUpdate,
} from "../controllers/authControllers";

const router = Router();

router.post("/signup", signup);
router.get("/logout", logout);
router.post("/login", login);
router.post("/profile/update", profileUpdate);

export default router;
