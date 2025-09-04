const validationError = {
  name: "ValidationError",
  message: "Some of the required information is missing",
  statusCode: 400,
};

const notFoundError = {
  name: "DocumentNotFoundError",
  message: "The requested resource is either unavailable or does not exist",
  statusCode: 404,
};

const serverError = {
  name: "ServerError",
  message: "There has been an issue contacting the server",
  statusCode: 500,
};

const filterError = (err) => {
  let errorToReturn;
  [validationError, notFoundError, serverError].forEach((error) => {
    if (err.name === error.name) {
      errorToReturn = error;
    }
  });
  return errorToReturn;
};

module.exports = { filterError };
