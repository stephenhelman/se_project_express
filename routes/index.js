const express = require("express");
const { NOT_FOUND } = require("../utils/constants");

const router = express.Router();

router.use("/", (req, res) => {
  res.status(NOT_FOUND).send({ message: "Requested resource not found" });
});

module.exports = router;
