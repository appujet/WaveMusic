const { Schema, model } = require("mongoose");

let Volume = new Schema({
  Guild: String,
  volLevel: Number,
});

module.exports = model("Volume", Volume);
