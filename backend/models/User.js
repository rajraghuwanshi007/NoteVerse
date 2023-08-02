const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
  sent: {
    type: Array,
  },
  recieve: {
    type: Array,
  },
  friends: {
    type: Array,
  },
});

// Mongoose automatically looks for the plural, lowercased version of your model name so user will be for users collections in db.
module.exports = mongoose.model("user", userSchema);
