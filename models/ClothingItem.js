const mongoose = require("mongoose");
const validator = require("validator");
const { FORBIDDEN } = require("../utils/constants");
const { CustomAPIError } = require("../utils/errors");

const clothingItemSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      minlength: 2,
      maxlength: 30,
    },
    weather: {
      type: String,
      required: true,
      enum: ["hot", "warm", "cold"],
    },
    imageUrl: {
      type: String,
      required: true,
      validate: {
        validator(value) {
          return validator.isURL(value);
        },
        message: "You must enter a valid URL",
      },
    },
    owner: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    likes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    timestamps: {
      createdAt: true,
      updatedAt: false,
    },
  }
);
clothingItemSchema.statics.verifyCredentials = function verifyCredentials(
  itemId,
  userId
) {
  return this.findById(itemId)
    .orFail()
    .then((item) => {
      if (item.owner.toString() !== userId.toString()) {
        return Promise.reject(
          new CustomAPIError(
            "Forbidden! You do not have the permission to delete another user's items",
            FORBIDDEN,
            "ForbiddenError"
          )
        );
      }
      return item;
    });
};

module.exports = mongoose.model("ClothingItem", clothingItemSchema);
