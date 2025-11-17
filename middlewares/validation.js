const { Joi, celebrate } = require("celebrate");
const validator = require("validator");

const validateUrl = (value, helpers) => {
  if (validator.isURL(value)) {
    return value;
  }
  return helpers.error("string.uri");
};

const validateClothingItem = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).message({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    imageUrl: Joi.string().required().custom(validateUrl).message({
      "string.empty": "The 'imageUrl' field must be filled in",
      "string.uri": "The 'imageUrl' field must be a valid url",
    }),
  }),
});

const validateUserInfo = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30).message({
      "string.min": 'The minimum length of the "name" field is 2',
      "string.max": 'The maximum length of the "name" field is 30',
      "string.empty": 'The "name" field must be filled in',
    }),
    avatar: Joi.string().required().custom(validateUrl).message({
      "string.empty": "The 'avatar' field must be filled in",
      "string.uri": "The 'avatar' field must be a valid url",
    }),
    email: Joi.string().required().email().message({
      "string.email": "The 'email' field must be a valid",
      "string.empty": "The 'email' field must be filled in",
    }),
    password: Joi.string().required().message({
      "string.empty": "The 'password' value must be filled in",
    }),
  }),
});

const validateAuth = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().message({
      "string.email": "The 'email' field must be a valid",
      "string.empty": "The 'email' field must be filled in",
    }),
    password: Joi.string().required().message({
      "string.empty": "The 'password' value must be filled in",
    }),
  }),
});

const validateId = celebrate({
  params: Joi.object().keys({
    id: Joi.string().hex().message({
      "string.empty": "The 'id' value must be filled in",
      "string.hex": "The provided 'id' is formatted incorrectly",
    }),
  }),
});

module.exports = {
  validateAuth,
  validateClothingItem,
  validateUserInfo,
  validateId,
};
