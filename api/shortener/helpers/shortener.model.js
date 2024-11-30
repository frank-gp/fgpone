const mongoose = require("mongoose");

const shortenerSchema = new mongoose.Schema({
  _id: { type: String, required: true },
  originalUrl: { type: String, required: true },
  shortUrl: { type: String, required: true, unique: true },
  visitCount: { type: Number, default: 0 },
  createdAt: { type: Date, default: Date.now },
});

const ShortenerModel = mongoose.model("Shortener", shortenerSchema);

module.exports = ShortenerModel;
