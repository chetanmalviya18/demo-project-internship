import {
  createPost,
  deletePost,
  getPostById,
  updatePost,
} from "../services/post.service.js";

/**
 * Handles the creation of a new blog post.
 * Route: POST /posts
 */
const handleCreatePost = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { title, content } = req.body;

    if (!title || !content) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newPost = await createPost(userId, { title, content });
    res.status(201).json(newPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating post", error: error.message });
  }
};

/**
 * Handles fetching a single blog post by its ID.
 * Route: GET /posts/:postId
 */
const handleGetPostById = async (req, res) => {
  try {
    const postId = req.params.postId;
    const post = await getPostById(postId);

    if (!post) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(post);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving post", error: error.message });
  }
};

/**
 * Handles updating a blog post.
 * Route: PUT /posts/:postId
 */
const handleUpdatePost = async (req, res) => {
  try {
    const postId = req.params.postId;

    const { title, content } = req.body;

    const updatedPost = await updatePost(postId, { title, content });

    if (!updatedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(200).json(updatedPost);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating post", error: error.message });
  }
};

/**
 * Handles deleting a blog post.
 * Route: DELETE /posts/:postId
 */
const handleDeletePost = async (req, res) => {
  try {
    const postId = req.params.postId;
    const deletedPost = await deletePost(postId);

    if (!deletedPost) {
      return res.status(404).json({ message: "Post not found." });
    }

    res.status(204).send();
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting post", error: error.message });
  }
};

export {
  handleCreatePost,
  handleGetPostById,
  handleUpdatePost,
  handleDeletePost,
};
