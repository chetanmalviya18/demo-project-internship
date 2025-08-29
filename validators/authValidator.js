import { body } from "express-validator";

const registerUserValidator = [
  body("firstName").notEmpty().withMessage("First name is required"),
  body("lastName").notEmpty().withMessage("Last name is required"),
  body("email")
    .isEmail()
    .withMessage("Email is required and must be a valid email address."),
  body("password")
    .isLength({ min: 5 })
    .withMessage(
      "Password is required and must be at least 5 characters long."
    ),
];

const loginUserValidator = [
  body("email")
    .isEmail()
    .withMessage("Email is required and must be a valid email address."),
  body("password")
    .isLength({ min: 5 })
    .withMessage(
      "Password is required and must be at least 5 characters long."
    ),
];

export { registerUserValidator, loginUserValidator };
