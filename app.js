const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");

const { PORT = 3001 } = process.env;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());
app.use((req, res, next) => {
  req.user = {
    _id: "68ab9c6e4c4145949ba823ea", // paste the _id of the test user created in the previous step
  };
  next();
});

mongoose.connect("mongodb://127.0.0.1:27017/wtwr_db");

app.use("/users", require("./routes/usersRoutes"));
app.use("/items", require("./routes/clothingItemsRoutes"));

app.use("*", require("./routes/index"));

app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
