import {
  addComment,
  deleteComment,
  updateComment,
} from "../services/comment.service";

/**
 * Handles adding a comment to a specific post.
 * Route: POST /posts/:postId/comments
 */
const handleAddComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const { userId, body } = req.body;

    if (!userId || !body) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newComment = await addComment(postId, { userId, body });
    res.status(201).json(newComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error adding comment", error: error.message });
  }
};

/**
 * Handles updating a comment on a specific post.
 * Route: PUT /posts/:postId/comments/:commentId
 */
const handleUpdateComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;
    const { body } = req.body;

    if (!body) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const updatedComment = await updateComment(postId, commentId, { body });

    if (!updatedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json(updatedComment);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating comment", error: error.message });
  }
};

/**
 * Handles deleting a comment on a specific post.
 * Route: DELETE /posts/:postId/comments/:commentId
 */
const handleDeleteComment = async (req, res) => {
  try {
    const postId = req.params.postId;
    const commentId = req.params.commentId;

    const deletedComment = await deleteComment(postId, commentId);

    if (!deletedComment) {
      return res.status(404).json({ message: "Comment not found." });
    }

    res.status(200).json({ message: "Comment deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting comment", error: error.message });
  }
};

export { handleAddComment, handleUpdateComment, handleDeleteComment };
