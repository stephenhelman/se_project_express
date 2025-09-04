const ClothingItem = require("../models/ClothingItem");
const { filterError } = require("../utils/errors");

const getClothingItems = (req, res) => {
  ClothingItem.find({})
    .populate("user")
    .then((clothingItems) => res.send({ data: clothingItems }))
    .catch((err) => {
      console.log(err.name);
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

const createClothingItem = (req, res) => {
  const { name, weather, imageUrl } = req.body;
  ClothingItem.create({ name, weather, imageUrl })
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.log(err);
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

const deleteClothingItem = (req, res) => {
  const { itemId } = req.params;
  ClothingItem.findByIdAndDelete(itemId)
    .orFail()
    .then((clothingItem) => res.send({ data: clothingItem }))
    .catch((err) => {
      console.log(err.name);
      const error = filterError(err);
      res.status(error.statusCode).send({ message: error.message });
    });
};

const addLikeToClothingItem = (req, res) => {
  const { itemId } = req.params.userId;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $addToSet: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  ).orFail();
  then((data) => res.send(data)).catch((err) => {
    console.log(err.name);
    const error = filterError(err);
    res.status(error.statusCode).send({ message: error.message });
  });
};

const removeLikeFromClothingItem = (req, res) => {
  const { itemId } = req.params.userId;
  ClothingItem.findByIdAndUpdate(
    itemId,
    { $pull: { likes: req.user._id } }, // add _id to the array if it's not there yet
    { new: true }
  ).orFail();
  then((data) => res.send(data)).catch((err) => {
    console.log(err.name);
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
