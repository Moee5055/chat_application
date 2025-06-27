import express from "express";

import {
  handleSendVerificationCode,
  handleUserLogin,
  handleUserSignup,
  handleVerificationCode,
} from "../controllers/auth-controller";

const router = express.Router();

router
  .post("/login", handleUserLogin)
  .post("/sign-up", handleUserSignup)
  .post("/sendVerificationCode", handleSendVerificationCode)
  .post("/verifyCode", handleVerificationCode);

export default router;
