const express = require("express");
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const { register } = require("./controllers/AuthControllers");

const AuthRoute = require("./routes/auth");
//loading config
dotenv.config({ path: "./config/config.env" });

MONGO_URI = process.env.MONGO_URI;

mongoose.connect(MONGO_URI);
db = mongoose.connection;

db.on("error", (err) => {
  console.log(err);
});

db.once("open", () => {
  console.log("Database Connection Established");
});

const app = express();

app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

const PORT = process.env.PORT;

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

app.use("/api", AuthRoute);
