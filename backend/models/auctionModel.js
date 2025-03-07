const mongoose = require("mongoose");

const auctionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String },
  startingPrice: { type: Number, required: true },
  createdAt: { type: Date, default: Date.now },
});

const Auction = mongoose.model("Auction", auctionSchema);
module.exports = Auction;
