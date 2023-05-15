import { Router } from "express";
import signup from "../controllers/auth/signup";
import logout from "../controllers/auth/logout";
import login from "../controllers/auth/login";
import uploadImageToCloudinary from "../controllers/cloudinary/uploadImageToCloudinary";
import getNewCompaniesFromTag from "../controllers/company/getCompaniesByTagName";
import createPost from "../controllers/post/createPost";
import getAllPosts from "../controllers/post/getAllPosts";
import profileUpdate from "../controllers/profile/updateProfile";
import search from "../controllers/search/searchByCompanyNameOrTag";

const router = Router();

// auth
router.post("/signup", signup);
router.get("/logout", logout);
router.post("/login", login);
// router.get("/auth/twitter", passport.authenticate("twitter"));
// router.get("/auth/twitter/callback", twitterAuth);
// router.get("/auth", auth);

// cloudinary
router.post("/api/cloudinary/upload", uploadImageToCloudinary);

// company
router.post("/newcompanies", getNewCompaniesFromTag);

// post
router.post("/collabhub/create", createPost);
router.get("/posts", getAllPosts);

// search
router.get("/search", search);

// profile
router.post("/profile/update", profileUpdate);

export default router;
