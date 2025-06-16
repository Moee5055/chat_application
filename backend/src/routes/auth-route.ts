import express from "express";
import {
  handleUserLogin,
  handleUserSignup,
} from "../controllers/auth-controller";

const router = express.Router();

router.post("/login", handleUserLogin).post("/sign-up", handleUserSignup);

export default router;
