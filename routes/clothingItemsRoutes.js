const express = require("express");
const router = express.Router();
const clothingItemsController = require("../controllers/clothingItemsController");

router.get("/", clothingItemsController.getClothingItems);
router.post("/", clothingItemsController.createClothingItem);
router.delete("/:itemId", clothingItemsController.deleteClothingItem);
router.put(
  "/items/:itemId/likes",
  clothingItemsController.addLikeToClothingItem
);
router.delete(
  "/items/:itemId/likes",
  clothingItemsController.deleteClothingItem
);

module.exports = router;
