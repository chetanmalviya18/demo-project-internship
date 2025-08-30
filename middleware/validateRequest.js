import { validationResult } from "express-validator";

const validateRequest = (req, res, next) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    // Forward error to global error handler
    const err = new Error("Validation failed");
    err.statusCode = 400;
    err.errors = errors.array();
    return next(err);
  }
  next();
};

export default validateRequest;
