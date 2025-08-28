import db from "../models/index.cjs";

const { User, Post, Comment } = db;

// Adds a new comment to a blog post.
const addComment = async (userId, postId, commentData) => {
  const { body } = commentData;

  const newComment = await Comment.create({
    body,
    userId,
    postId,
  });

  return newComment;
};

//Updates a comment by its ID.
const updateComment = async (commentId, userId, updatedData) => {
  const comment = await Comment.findByPk(commentId);

  if (!comment) return null; // Comment not found

  // Check if the user is the author of the comment
  if (comment.userId !== userId)
    throw new Error("Unauthorized: You can only update your own comments.");

  comment.body = updatedData.body;
  await comment.save();

  return comment;
};

// Deletes a comment by its ID.
const deleteComment = async (commentId, userId) => {
  const comment = await Comment.findByPk(commentId);

  if (!comment) return false; // Comment not found

  // Check if the user is the author of the comment
  if (comment.userId !== userId)
    throw new Error("Unauthorized: You can only delete your own comments.");

  await comment.destroy();
  return true;
};

export { addComment, updateComment, deleteComment };
