import {
  deleteUserById,
  getUserByEmail,
  updateUser,
} from "../services/user.service.js";

/**
 * Handles the retrieval of a user.
 * Route: GET /user/:email
 */
const handleGetUserByEmail = async (req, res) => {
  try {
    const userEmail = req.params.email;
    const user = await getUserByEmail(userEmail);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(user);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error retrieving user", error: error.message });
  }
};

/**
 * Handles updating a user's information.
 * Route: PUT /user/:userId
 */
const handleUpdateUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const { firstName, lastName, email, password } = req.body;

    const updatedUser = await updateUser(userId, {
      firstName,
      lastName,
      email,
      password,
    });

    if (!updatedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json(updatedUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating user", error: error.message });
  }
};

/**
 * Handles deleting a user.
 * Route: DELETE /user/:userId
 */
const handleDeleteUser = async (req, res) => {
  try {
    const userId = req.params.userId;
    const deletedUser = await deleteUserById(userId);

    if (!deletedUser) {
      return res.status(404).json({ message: "User not found." });
    }

    res.status(200).json({ message: "User deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting user", error: error.message });
  }
};

export { handleGetUserByEmail, handleUpdateUser, handleDeleteUser };
