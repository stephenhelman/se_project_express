const filterError = (error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return {
      statusCode: 400,
      message: error.message,
    };
  } else if (error.name === "DocumentNotFoundError") {
    return {
      statusCode: 404,
      message: error.message,
    };
  } else {
    return {
      statusCode: 500,
      message: error.message,
    };
  }
};

module.exports = { filterError };
