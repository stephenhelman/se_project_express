const ClothingItem = require("../models/ClothingItem");
const { filterError } = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .populate("owner")
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => {
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl, owner: req.user._id })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

const deleteClothingItem = (req, res) => {
  const { id } = req.params;
  ClothingItem.verifyCredentials(id, req.user._id)
    .then((authorizedDeletionItem) => {
      ClothingItem.findByIdAndDelete({
        _id: authorizedDeletionItem._id.toString(),
      })
        .then(() => res.send({ message: "Item deleted successfully" }))
        .catch((err) => {
          const error = filterError(err);
          res.status(error.statusCode).send({ message: error.message });
        });
    })
    .catch((err) => {
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

const addLikeToClothingItem = (req, res) => {
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
      res.status(error.statusCode).send({ message: error.message });
    });
};

const removeLikeFromClothingItem = (req, res) => {
  const { id } = req.params;
  ClothingItem.findByIdAndUpdate(
    id,
    { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  )
    .orFail()
    .then((response) => res.send({ data: response }))
    .catch((err) => {
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

module.exports = {
  createClothingItem,
  getClothingItems,
  deleteClothingItem,
  addLikeToClothingItem,
  removeLikeFromClothingItem,
};
