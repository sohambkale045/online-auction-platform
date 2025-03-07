const mongoose = require("mongoose");
const dotenv = require("dotenv");
const Auction = require("./models/auctionModel"); // Ensure this path is correct

dotenv.config();

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => console.log("MongoDB connected for seeding..."))
  .catch((error) => console.error("MongoDB connection error:", error));

// Sample auction data
const sampleAuctions = [
  {
    title: "iPhone 15",
    description: "Latest Apple iPhone with 256GB storage.",
    startingPrice: 500,
  },
  {
    title: "MacBook Pro",
    description: "M2 MacBook Pro 16-inch, 512GB SSD.",
    startingPrice: 1200,
  },
  {
    title: "Rolex Watch",
    description: "Luxury Rolex Submariner watch.",
    startingPrice: 5000,
  },
];

// Insert sample data
const seedDatabase = async () => {
  try {
    await Auction.deleteMany(); // Clear existing auctions
    await Auction.insertMany(sampleAuctions);
    console.log("✅ Sample auctions added!");
    mongoose.connection.close();
  } catch (error) {
    console.error("Error seeding database:", error);
    mongoose.connection.close();
  }
};

// Run the seeding function
seedDatabase();
