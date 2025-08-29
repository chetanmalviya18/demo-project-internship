import { Router } from "express";
import {
  handleAddComment,
  handleDeleteComment,
  handleUpdateComment,
} from "../controllers/comment.controller.js";
import authenticationToken from "../middleware/authenticateToken.js";

const router = Router();

// Route to create a new comment
// POST /api/post/:postId/comment
router.post("/post/:postId/comment", authenticationToken, handleAddComment);

// Route to update a comment by ID
// PUT /api/post/:postId/comment/:commentId
router.put(
  "/post/:postId/comment/:commentId",
  authenticationToken,
  handleUpdateComment
);

// Route to delete a comment by ID
// DELETE /api/post/:postId/comment/:commentId
router.delete(
  "/post/:postId/comment/:commentId",
  authenticationToken,
  handleDeleteComment
);

export default router;
