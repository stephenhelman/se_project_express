const {
  BAD_REQUEST,
  NOT_FOUND,
  CONFLICT,
  DEFAULT,
  FORBIDDEN,
  UNAUTHORIZED,
} = require("./constants");

class CustomAPIError extends Error {
  constructor(message, statusCode, name = null) {
    super(message);
    this.statusCode = statusCode;
    this.name = name;
  }
}

const filterError = (error) => {
  if (error.name === "ValidationError") {
    return new CustomAPIError(error.message, BAD_REQUEST);
  }
  if (error.name === "CastError") {
    return new CustomAPIError(error.message, BAD_REQUEST);
  }
  if (error.name === "DocumentNotFoundError") {
    return new CustomAPIError(error.message, NOT_FOUND);
  }
  if (error.name === "MongoServerError") {
    if (error.code === 11000) {
      return new CustomAPIError(
        "Error: There is already a user registered with that email",
        CONFLICT
      );
    }
  }
  if (error.name === "AuthorizationError") {
    return new CustomAPIError(error.message, UNAUTHORIZED);
  }
  if (error.name === "ForbiddenError") {
    return new CustomAPIError(error.message, FORBIDDEN);
  }
  return new CustomAPIError("An error has occurred on the server", DEFAULT);
};

module.exports = { filterError, CustomAPIError };
