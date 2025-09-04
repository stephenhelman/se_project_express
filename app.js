const path = require("path");
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { addUserToRequest } = require("./middleware/auth");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use(addUserToRequest);

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("/users", require("./routes/usersRoutes"));
app.use("/items", require("./routes/clothingItemsRoutes"));

app.use("*", require("./routes/index"));

app.use(express.static(path.join(__dirname, "public")));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
