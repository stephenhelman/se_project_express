const express = require("express");

const router = express.Router();
const clothingItemsController = require("../controllers/clothingItemsController");

router.get("/", clothingItemsController.getClothingItems);
router.post("/", clothingItemsController.createClothingItem);
router.delete("/:id", clothingItemsController.deleteClothingItem);
router.put("/:id/likes", clothingItemsController.addLikeToClothingItem);
router.delete("/:id/likes", clothingItemsController.removeLikeFromClothingItem);

module.exports = router;
