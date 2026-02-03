const mongoose = require("mongoose");

const placeSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  state: {
    type: String,
    required: true
  },
  category: {
    type: String,
    enum: ["Devotional", "Party", "Chill", "Historical"],
    required: true
  },
  budget: {
  type: Number,
  required: true
}
  ,
  rating: {
    type: Number,
    required: true
  },
  bestTime: {
    type: String
  },
  description: {
    type: String
  },
  images: {
    type: [String]
  }
});

module.exports = mongoose.model("Place", placeSchema);
