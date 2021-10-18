const mongoose = require("mongoose");

const ShortenedUrlModel = new mongoose.Schema(
  {
    key: { type: String, unique: true },
    originalUrl: { type: String, required: true },
  },
  { timestamps: true }
);

module.exports = mongoose.model("urls", ShortenedUrlModel);
