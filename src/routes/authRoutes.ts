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
  getNewCompaniesFromTag,
  twitterAuth,
} from "../controllers/authControllers";
import passport from "passport";

const router = Router();

router.post("/signup", signup);
router.get("/logout", logout);
router.post("/login", login);
router.get("/auth", auth);
router.post("/newcompanies", getNewCompaniesFromTag);
router.get("/search", search);
router.get("/posts", getAllPosts); // get all posts from the db
router.post("/profile/update", profileUpdate);
router.post("/collabhub/create", createPost);

router.get("/auth/twitter", passport.authenticate("twitter"));
router.get("/auth/twitter/callback", twitterAuth);

export default router;
