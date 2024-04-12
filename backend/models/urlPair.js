const mongoose = require("mongoose");

const urlPairSchema = new mongoose.Schema({
  full: {
    type: String,
    required: true,
  },
  short: {
    type: String,
    required: true,
  },
});

const UrlPair = mongoose.model("UrlPair", urlPairSchema);

module.exports = UrlPair