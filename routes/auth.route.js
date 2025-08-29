import { Router } from "express";
import {
  handleLoginUser,
  handleRegisterUser,
} from "../controllers/auth.controller.js";
import {
  loginUserValidator,
  registerUserValidator,
} from "../validators/authValidator.js";

const router = Router();

// Route to create a new user
// POST /api/user
router.post("/user", registerUserValidator, handleRegisterUser);

// Route to login a user
// POST /api/user/login
router.post("/user/login", loginUserValidator, handleLoginUser);

export default router;
