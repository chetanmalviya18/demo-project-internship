import { Router } from "express";
import {
  handleCreateUser,
  handleDeleteUser,
  handleGetUserByEmail,
  handleUpdateUser,
} from "../controllers/user.controller.js";

const router = Router();

// Route to create a new user
// POST /api/user
router.post("/user", handleCreateUser);

// Route to retrieve a user by email
// GET /api/user/:email
router.get("/user/:email", handleGetUserByEmail);

//Route to update a user by ID
// PUT /api/user/:id
router.put("/user/:userId", handleUpdateUser);

//Route to delete a user by ID
// DELETE /api/user/:id
router.delete("/user/:userId", handleDeleteUser);

export default router;
