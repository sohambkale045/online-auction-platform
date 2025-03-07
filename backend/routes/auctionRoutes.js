const express = require("express");
const Auction = require("../models/auctionModel"); // Import Auction model
const router = express.Router();

// ✅ Fetch all auctions
router.get("/", async (req, res) => {
    try {
        const auctions = await Auction.find({}); // Fetch auctions from DB
        res.json(auctions);
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

// ✅ Place a bid
router.post("/:id/bid", async (req, res) => {
    try {
        const { amount } = req.body;
        const auction = await Auction.findById(req.params.id);

        if (!auction) {
            return res.status(404).json({ message: "Auction not found" });
        }

        if (amount <= auction.startingPrice) {
            return res.status(400).json({ message: "Bid must be higher than the starting price" });
        }

        auction.startingPrice = amount; // Update highest bid
        await auction.save();

        res.status(200).json({ message: "Bid placed successfully", auction });
    } catch (error) {
        res.status(500).json({ message: "Server error", error });
    }
});

module.exports = router;
