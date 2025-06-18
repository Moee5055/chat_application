import express from "express";
import { checkUserExist } from "../controllers/user-controller";

const router = express.Router();

router.post("/user_exist", checkUserExist);

export default router;
