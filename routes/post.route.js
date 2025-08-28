import { Router } from "express";
import {
  handleCreatePost,
  handleDeletePost,
  handleGetPostById,
  handleUpdatePost,
} from "../controllers/post.controller.js";

const router = Router();

// Route to create a new post
// POST /api/post/:userId
router.post("/post/:userId", handleCreatePost);

// Route to retrieve a post by ID
// GET /api/post/:postId
router.get("/post/:postId", handleGetPostById);

// Route to update a post by ID
// PUT /api/post/:postId
router.put("/post/:postId", handleUpdatePost);

// Route to delete a post by ID
// DELETE /api/post/:postId
router.delete("/post/:postId", handleDeletePost);

export default router;
