import bcrypt from "bcryptjs";
import sequelize from "../database/database.js";

import db from "../models/index.cjs";
import jwt from "jsonwebtoken";

const { User, Profile } = db;

//Creates a new user and their profile in a transaction.
const registerUser = async (userData) => {
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
    return { newUser, newProfile };
  } catch (error) {
    await trans.rollback();

    console.error("Error registering user:", error);
    await t.rollback();
    console.error("Error registering user:", error);
    // Check for unique constraint error
    if (error.name === "SequelizeUniqueConstraintError") {
      throw new Error("User with this email already exists.");
    }
    throw new Error("Could not register user.");
  }
};

const login = async (email, password) => {
  try {
    const user = await User.findOne({ where: { email } });

    if (!user) return null; //User not found

    const isPasswordValid = bcrypt.compareSync(password, user.password);

    if (!isPasswordValid) return null; //Invalid password

    const token = jwt.sign({ id: user.id }, process.env.TOKEN_SECRET, {
      expiresIn: "1h",
    });
    return { user, token: `Bearer ${token}` };
  } catch (error) {
    console.error("Error logging in:", error);
    throw new Error("Could not log in.");
  }
};

export { registerUser, login };
