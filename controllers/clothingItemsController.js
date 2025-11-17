const ClothingItem = require("../models/ClothingItem");
const { filterError } = require("../utils/errors");

const getClothingItems = (req, res, next) => {
  ClothingItem.find({})
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

const createClothingItem = (req, res, next) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

const deleteClothingItem = (req, res, next) => {
  const { id } = req.params;
  ClothingItem.verifyCredentials(id, req.user._id)
    .then((authorizedDeletionItem) => {
      ClothingItem.findByIdAndDelete({
        _id: authorizedDeletionItem._id,
      })
        .then(() => res.send({ message: "Item deleted successfully" }))
        .catch((err) => {
          const error = filterError(err);
          next(error);
        });
    })
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

const addLikeToClothingItem = (req, res, next) => {
  const { id } = req.params;
  ClothingItem.findByIdAndUpdate(
    id,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((response) => res.send({ data: response }))
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

const removeLikeFromClothingItem = (req, res, next) => {
  const { id } = req.params;
  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((response) => {
      res.send({ data: response });
    })
    .catch((err) => {
      const error = filterError(err);
      next(error);
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  addLikeToClothingItem,
  removeLikeFromClothingItem,
};
