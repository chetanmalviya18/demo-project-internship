import { Router } from "express";
import {
  handleAddComment,
  handleDeleteComment,
  handleUpdateComment,
} from "../controllers/comment.controller.js";

const router = Router();

// Route to create a new comment
// POST /api/post/:postId/comment
router.post("/post/:postId/comment", handleAddComment);

// Route to update a comment by ID
// PUT /api/post/:postId/comment/:commentId
router.put("/post/:postId/comment/:commentId", handleUpdateComment);

// Route to delete a comment by ID
// DELETE /api/post/:postId/comment/:commentId
router.delete("/post/:postId/comment/:commentId", handleDeleteComment);

export default router;
