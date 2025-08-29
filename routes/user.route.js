import { Router } from "express";
import {
  handleDeleteUser,
  handleGetUserByEmail,
  handleUpdateUser,
} from "../controllers/user.controller.js";
import authenticationToken from "../middleware/authenticateToken.js";

const router = Router();

// Route to retrieve a user by email
// GET /api/user/:email
router.get("/user/:email", authenticationToken, handleGetUserByEmail);

//Route to update a user by ID
// PUT /api/user/:id
router.put("/user/:userId", authenticationToken, handleUpdateUser);

//Route to delete a user by ID
// DELETE /api/user/:id
router.delete("/user/:userId", authenticationToken, handleDeleteUser);

export default router;
