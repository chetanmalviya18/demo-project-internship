import { login, registerUser } from "../services/auth.service.js";

/**
 * Handles the creation of a new user.
 * Route: POST /user
 */
const handleRegisterUser = async (req, res) => {
  try {
    console.log("Registering user...");
    const { firstName, lastName, email, password } = req.body;

    if (!firstName || !lastName || !email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    const newUser = await registerUser({
      firstName,
      lastName,
      email,
      password,
    });
    res.status(201).json(newUser);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating user", error: error.message });
  }
};

/**
 * Handles the creation of a new user.
 * Route: POST /user
 */
const handleLoginUser = async (req, res) => {
  try {
    console.log("Logging in user...");
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "Missing required fields." });
    }

    // Implement login logic here
    const loginResult = await login(email, password);
    if (!loginResult)
      return res.status(401).json({ message: "Invalid credentials." });

    res.status(200).json(loginResult);
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error logging in user", error: error.message });
  }
};

export { handleRegisterUser, handleLoginUser };
