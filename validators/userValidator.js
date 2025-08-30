import { body } from "express-validator";

const getUserByEmailValidator = [
  body("email").isEmail().withMessage("Invalid email format."),
];

const updateUserValidator = [
  body("firstName")
    .optional()
    .notEmpty()
    .withMessage("First name is required."),
  body("lastName").optional().notEmpty().withMessage("Last name is required."),
  body("email").optional().isEmail().withMessage("Invalid email format."),
];

export { getUserByEmailValidator, updateUserValidator };
