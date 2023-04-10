import { Router } from "express";
import {
  login_GET,
  login_POST,
  signUp_GET,
  signUp_POST,
} from "../controllers/authControllers";

const router = Router();

router.get("/signup", signUp_GET);
router.post("/signup", signUp_POST);
router.get("/login", login_GET);
router.get("/login", login_POST);

export default router;
