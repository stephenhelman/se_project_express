const User = require("../models/User");
const { filterError } = require("../utils/errors.js");

const getUsers = (req, res) => {
  User.find({})
    .then((films) => res.send({ data: films }))
    .catch((err) => {
      console.log(err.name);
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

const getUser = (req, res) => {
  const { userId } = req.params;
  User.findById(userId)
    .orFail()
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err.name, err);
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

const createUser = (req, res) => {
  const { name, avatar } = req.body;
  User.create({ name, avatar })
    .then((user) => res.send({ data: user }))
    .catch((err) => {
      console.log(err.name);
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

module.exports = { getUsers, getUser, createUser };
