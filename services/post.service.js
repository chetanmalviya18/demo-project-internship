import db from "../models/index.cjs";

const { User, Post, Comment } = db;

// Creates a new blog post for a specific user.
const createPost = async (userId, postData) => {
  const { title, content } = postData;

  const newPost = await Post.create({
    title,
    content,
    userId,
  });
  return newPost;
};

// Retrieves a single post by its ID, including the author and comments.
const getPostById = async (postId) => {
  const post = await Post.findByPk(postId, {
    include: [
      {
        model: User,
        attributes: ["id", "firstName", "lastName", "email"],
      },
      {
        model: Comment,
        include: [{ model: User, attributes: ["firstName", "lastName"] }],
      },
    ],
  });

  return post;
};

// Updates a post by its id
const updatePost = async (postId, updateData) => {
  const userId = req.user.id;
  const post = await Post.findByPk(postId);

  if (!post) return null;

  if (post.userId !== userId) {
    throw new Error("Unauthorized: You can only update your own posts.");
  }

  await post.update(updateData);
  return post;
};

// Deletes a post by its ID.
const deletePost = async (postId) => {
  const userId = req.user.id;
  const post = await Post.findByPk(postId);

  if (!post) return null;

  if (post.userId !== userId) {
    throw new Error("Unauthorized: You can only delete your own posts.");
  }

  await post.destroy();
  return true;
};

export { createPost, getPostById, updatePost, deletePost };
