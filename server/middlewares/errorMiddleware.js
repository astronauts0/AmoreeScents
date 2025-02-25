const ErrorHandler = require("../utils/error/errorHandler");

module.exports = (err, req, res, next) => {
  err.statusCode = err.statusCode || 500;
  err.message = err.message || "Internal Server Error. Try Again!";

  // # Network connection reset error (read ECONNRESET)
  if (err.code === "ECONNRESET") {
    const message = "Network connection interrupted. Please check your internet connection & try again.";
    err = new ErrorHandler(message, 503);
  }

  // # MongoDB connection timeout error (querySrv ETIMEOUT)
  if (err.message && err.message.includes("querySrv ETIMEOUT")) {
    const message = "Please check your network connection or try again later.";
    err = new ErrorHandler(message, 503);
  }

  // # Wrong MongoDB id error
  if (err.name === "CastError") {
    const message = `Resource not found. Invalid: ${err.path}`;
    err = new ErrorHandler(message, 400);
  }

  // # Mongoose duplicate key error
  if (err.code === 11000) {
    const field = Object.keys(err.keyValue)[0];
    let message;
    if (field === "slug") {
      message = `The slug '${err.keyValue.slug}' already exists. Please use a different slug.`;
    } else {
      message = `Duplicate ${field} entered.`;
    }
    err = new ErrorHandler(message, 400);
  }

  // # Mongoose validation error
  if (err.name === "ValidationError") {
    const messages = Object.values(err.errors).map((value) => value.message);
    const message = `Validation Error: ${messages.join(", ")}`;
    err = new ErrorHandler(message, 400);
  }

  // # Wrong JWT error
  if (err.name === "JsonWebTokenError") {
    const message = `Your Token is invalid. Try again`;
    err = new ErrorHandler(message, 400);
  }

  // # JWT EXPIRE error
  if (err.name === "TokenExpiredError") {
    const message = `Your Token has been Expired. Login again`;
    err = new ErrorHandler(message, 400);
  }

  res.status(err.statusCode).json({
    success: false,
    status: err.statusCode,
    message: err.message,
  });
};
