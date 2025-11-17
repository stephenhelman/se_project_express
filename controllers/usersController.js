const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

const User = require("../models/User");
const { filterError } = require("../utils/errors");
const { JWT_SECRET } = require("../utils/config");

const getUsers = (req, res, next) => {
  User.find({})
    .then((users) => res.send({ data: users }))
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail()
    .then((user) => {
      res.send({ data: user._doc });
    })
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

const createUser = (req, res, next) => {
  const { email, password, name, avatar } = req.body;
  bcrypt.hash(password, 10).then((hash) => {
    User.create({ email, password: hash, name, avatar })
      .then((user) => {
        res.send({ data: user._doc });
      })
      .catch((err) => {
        const error = filterError(err);
        next(error);
      });
  });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign({ _id: user._id }, JWT_SECRET, {
        expiresIn: "7d",
      });
      res.send({ token });
    })
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

const updateProfile = (req, res, next) => {
  const { name, avatar } = req.body;
  User.findByIdAndUpdate(
    req.user._id,
    { $set: { name, avatar } },
    { new: true, runValidators: true }
  )
    .orFail()
    .then((user) => {
      res.send({ data: user._doc });
    })
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

module.exports = { getUsers, getCurrentUser, createUser, login, updateProfile };
