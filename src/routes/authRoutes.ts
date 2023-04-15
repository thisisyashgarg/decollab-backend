import { Router } from "express";
import {
  login,
  signup,
  logout,
  profileUpdate,
  createPost,
  auth,
  search,
  getAllPosts,
} from "../controllers/authControllers";

const router = Router();

router.post("/signup", signup);
router.get("/logout", logout);
router.post("/login", login);
router.get("/auth", auth);
router.post("/search", search);

router.get("/posts", getAllPosts); // get all posts from the db
router.post("/profile/update", profileUpdate);
router.post("/collabhub/create", createPost);

export default router;
