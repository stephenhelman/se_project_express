const filterError = (error) => {
  if (error.name === "ValidationError" || error.name === "CastError") {
    return {
      statusCode: 400,
      message: error.message,
    };
  } if (error.name === "DocumentNotFoundError") {
    return {
      statusCode: 404,
      message: error.message,
    };
  }
  return {
    statusCode: 500,
    message: error.message,
  };
};

module.exports = { filterError };
