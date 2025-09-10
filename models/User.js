const mongoose = require("mongoose");
const validator = require("validator");
const bcrypt = require("bcryptjs");
const errorCodes = require("../utils/constants");
const { CustomAPIError } = require("../utils/errors");

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
  avatar: {
    type: String,
    required: true,
    validate: {
      validator(value) {
        return validator.isURL(value);
      },
      message: "You must enter a valid URL",
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator(value) {
        return validator.isEmail(value);
      },
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

userSchema.statics.findUserByCredentials = function findUserByCredentials(
  email,
  password
) {
  if (!email || !password) {
    return Promise.reject(
      new CustomAPIError(
        "Missing email or password",
        errorCodes.BAD_REQUEST,
        "ValidationError"
      )
    );
  }
  return this.findOne({ email })
    .select("+password")
    .orFail(() => {
      const error = new CustomAPIError(
        "Incorrect email or Password",
        errorCodes.UNAUTHORIZED,
        "AuthorizationError"
      );
      return error;
    })
    .then((user) => {
      const { password: userPassword } = user;
      return bcrypt.compare(password, userPassword).then((matched) => {
        if (!matched) {
          return Promise.reject(
            new CustomAPIError(
              "Incorrect email or password",
              errorCodes.UNAUTHORIZED,
              "AuthorizationError"
            )
          );
        }
        return user;
      });
    });
};

module.exports = mongoose.model("User", userSchema);
