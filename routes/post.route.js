import { Router } from "express";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetPostById,
  handleUpdatePost,
} from "../controllers/post.controller.js";
import authenticationToken from "../middleware/authenticateToken.js";

const router = Router();

// Route to create a new post
// POST /api/post/create
router.post("/post/create", authenticationToken, handleCreatePost);

// Route to retrieve a post by ID
// GET /api/post/:postId
router.get("/post/:postId", authenticationToken, handleGetPostById);

// Route to update a post by ID
// PUT /api/post/:postId
router.put("/post/:postId", authenticationToken, handleUpdatePost);

// Route to delete a post by ID
// DELETE /api/post/:postId
router.delete("/post/:postId", authenticationToken, handleDeletePost);

export default router;
