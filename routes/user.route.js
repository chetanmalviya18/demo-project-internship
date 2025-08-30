import { Router } from "express";
import {
  handleDeleteUser,
  handleGetUserByEmail,
  handleUpdateUser,
} from "../controllers/user.controller.js";
import authenticationToken from "../middleware/authenticateToken.js";
import {
  getUserByEmailValidator,
  updateUserValidator,
} from "../validators/userValidator.js";
import validateRequest from "../middleware/validateRequest.js";

const router = Router();

// Route to retrieve a user by email
// GET /api/user/:email
router.get(
  "/user/:email",
  authenticationToken,
  getUserByEmailValidator,
  validateRequest,
  handleGetUserByEmail
);

//Route to update a user by ID
// PUT /api/user/update
router.put(
  "/user/update",
  authenticationToken,
  updateUserValidator,
  validateRequest,
  handleUpdateUser
);

//Route to delete a user by ID
// DELETE /api/user/delete
router.delete("/user/delete", authenticationToken, handleDeleteUser);

export default router;
