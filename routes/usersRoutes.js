const express = require("express");

const router = express.Router();
const usersController = require("../controllers/usersController");
const { authorizeUser } = require("../middlewares/auth");

router.get("/me", authorizeUser, usersController.getCurrentUser);
router.patch("/me", authorizeUser, usersController.updateProfile);

module.exports = router;
