const express = require("express");
const { authorizeUser } = require("../middleware/auth");

const router = express.Router();
const clothingItemsController = require("../controllers/clothingItemsController");

router.get("/", clothingItemsController.getClothingItems);
router.post("/", authorizeUser, clothingItemsController.createClothingItem);
router.delete(
  "/:id",
  authorizeUser,
  clothingItemsController.deleteClothingItem
);
router.put(
  "/:id/likes",
  authorizeUser,
  clothingItemsController.addLikeToClothingItem
);
router.delete(
  "/:id/likes",
  authorizeUser,
  clothingItemsController.removeLikeFromClothingItem
);

module.exports = router;
