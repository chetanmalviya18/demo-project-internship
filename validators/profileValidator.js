import { body } from "express-validator";

const profileValidator = [
  body("bio").optional().isString().withMessage("Bio must be a string."),
  body("location")
    .optional()
    .isString()
    .withMessage("Location must be a string."),
];

export default profileValidator;
