const { BAD_REQUEST, NOT_FOUND, DEFAULT } = require("./constants");

const filterError = (error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return {
      statusCode: BAD_REQUEST,
      message: error.message,
    };
  }
  if (error.name === "DocumentNotFoundError") {
    return {
      statusCode: NOT_FOUND,
      message: error.message,
    };
  }
  return {
    statusCode: DEFAULT,
    message: "An error has occurred on the server",
  };
};

module.exports = { filterError };
