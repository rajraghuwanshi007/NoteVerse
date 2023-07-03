const mongoose = require("mongoose");
const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, ".env") });
const mongoURI = process.env.mongoURI;

const connectToMongo = () => {
  mongoose.connect(mongoURI, () => {
    console.log("connection established");
  });
};

module.exports = connectToMongo;
