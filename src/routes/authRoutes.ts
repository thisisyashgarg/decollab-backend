import { Router } from "express";
import {
  login,
  signup,
  logout,
  profileUpdate,
  createPost,
  auth,
} from "../controllers/authControllers";
import { requireAuth } from "../middleware/authMiddleware";

const router = Router();

router.post("/signup", signup);
router.get("/logout", logout);
router.post("/login", login);
router.get("/auth", auth);
router.post("/profile/update", requireAuth, profileUpdate);
router.post("/collabhub/create", requireAuth, createPost);

export default router;
