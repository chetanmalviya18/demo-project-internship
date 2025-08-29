import db from "../models/index.cjs";

import sequelize from "../database/database.js";

const { User, Profile } = db;

// Finds a user by their email address.
async function getUserByEmail(email) {
  const user = await User.findOne({
    where: { email: email },
    include: Profile,
  });
  return user;
}

// Updates a user's information.
async function updateUser(userId, updateData) {
  const user = await User.findByPk(userId);
  if (!user) return null; // User not found

  await user.update(updateData);
  return user;
}

// Deletes a user by their ID.
async function deleteUserById(userId) {
  const trans = await sequelize.transaction();
  try {
    const user = await User.findByPk(userId, { transaction: trans });
    if (!user) {
      await trans.rollback();
      return false;
    }

    // Delete the associated profile first
    await Profile.destroy({ where: { userId: userId }, transaction: trans });

    // Delete the user
    await user.destroy({ transaction: trans });

    await trans.commit();
    return true;
  } catch (error) {
    await trans.rollback();
    console.error("Error deleting user:", error);
    throw new Error("Could not delete user.");
  }
}

export { getUserByEmail, updateUser, deleteUserById };
