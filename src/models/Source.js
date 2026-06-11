const mongoose = require("mongoose");

const SourceSchema = new mongoose.Schema({
  name: String,
  url: String,
  active: {
    type: Boolean,
    default: true
  }
});

module.exports =
mongoose.model("Source", SourceSchema);