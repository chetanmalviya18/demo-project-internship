import { ValidationError } from "sequelize";

const errorHandler = (err, req, res, next) => {
  // console.error(err);

  // Handle express-validator errors (from validateRequest)
  if (err.message === "Validation failed" && err.errors) {
    return res.status(err.statusCode).json({
      message: err.message,
      errors: err.errors,
    });
  }

  // Handle Sequelize Validation Errors
  if (err instanceof ValidationError) {
    const errors = err.errors.map((e) => ({
      field: e.path,
      message: e.message,
    }));
    return res
      .status(400)
      .json({ message: "Validation Error", errors: errors });
  }

  // Handle Sequelize Unique Constraint Errors
  if (err instanceof UniqueConstraintError) {
    const field = Object.keys(err.fields)[0];
    return res.status(409).json({
      // 409 Conflict
      message: `An account with this ${field} already exists.`,
      field: field,
    });
  }

  const statusCode = res.statusCode ? res.statusCode : 500;

  res.status(statusCode).json({
    status: "error",
    message: err.message,
  });
};

export default errorHandler;
