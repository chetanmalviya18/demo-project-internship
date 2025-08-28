import db from "../models/index.cjs";
import bcrypt from "bcryptjs";
import sequelize from "../database/database.js";

const { User, Profile } = db;

//Creates a new user and their profile in a transaction.
async function createUser(userData) {
  const trans = await sequelize.transaction();

  try {
    // Hash the password for security
    const hashedPassword = bcrypt.hashSync(userData.password, 10);

    // Create the user
    const newUser = await User.create(
      {
        firstName: userData.firstName,
        lastName: userData.lastName,
        email: userData.email,
        password: hashedPassword,
      },
      { transaction: trans }
    );

    // Create an associated profile for the user
    const newProfile = await Profile.create(
      {
        userId: newUser.id,
        bio: `This is the profile for ${userData.firstName} ${userData.lastName}`,
      },
      { transaction: trans }
    );

    // If everything is successful, commit the transaction
    await trans.commit();

    // We don't want to return the password hash
    newUser.password = undefined;
    return newUser;
  } catch (error) {
    // If anything fails, roll back the transaction
    await trans.rollback();
    console.error("Error creating user:", error);
    throw new Error("Could not create user.");
  }
}

//Finds a user by their email address.
async function getUserByEmail(email) {
  const user = await User.findOne({
    where: { email: email },
    include: Profile,
  });
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

export { createUser, getUserByEmail, updateUser, deleteUserById };
