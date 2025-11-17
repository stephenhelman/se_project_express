const { DEFAULT } = require("../utils/constants");

const errorHandler = (err, req, res, next) => {
  console.error(err);
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message:
      statusCode === DEFAULT ? "An error occurred on the server" : message,
  });
};

module.exports = { errorHandler };
