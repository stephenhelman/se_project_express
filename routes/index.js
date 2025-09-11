const express = require("express");
const { NOT_FOUND } = require("../utils/constants");
const { createUser, login } = require("../controllers/usersController");

const router = express.Router();

router.use("/users", require("./usersRoutes"));

router.use("/items", require("./clothingItemsRoutes"));

router.post("/signup", createUser);
router.post("/signin", login);

router.use("*", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
