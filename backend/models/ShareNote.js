const mongoose = require("mongoose");
const { Schema } = mongoose;

const notesSchema = new Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "user",
  },
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  tag: {
    type: String,
    default: "General",
  },
  to:{
    type:String,
    required: true,
  },
  from:{
    type:String,
    required: true,
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

// Mongoose automatically looks for the plural, lowercased version of your model name so user will be for users collections in db.
module.exports = mongoose.model("shared", notesSchema);
