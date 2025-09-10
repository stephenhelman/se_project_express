const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const { createUser, login } = require("./controllers/usersController");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("/users", require("./routes/usersRoutes"));
app.use("/items", require("./routes/clothingItemsRoutes"));

app.use("/signup", createUser);
app.use("/signin", login);

app.use("*", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
