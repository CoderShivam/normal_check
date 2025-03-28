const mongoose = require("mongoose");
// const Company = require("../models/Company");
require("dotenv").config(); // Ensure you have your MONGO_URI in .env

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log("Connected to MongoDB"))
  .catch(err => console.error("MongoDB connection error:", err));

// const companies = [
//   { name: "Google", description: "A global tech company.", industry: "Technology", location: "California, USA", website: "https://google.com" },
//   { name: "Microsoft", description: "Software giant.", industry: "Technology", location: "Washington, USA", website: "https://microsoft.com" },
//   { name: "Tesla", description: "Electric vehicles and renewable energy.", industry: "Automotive", location: "Texas, USA", website: "https://tesla.com" }
// ];

// const insertSampleData = async () => {
//   try {
//     await Company.deleteMany(); // Clear existing data to avoid duplication
//     await Company.insertMany(companies);
//     console.log("Sample companies added successfully!");
//     mongoose.connection.close();
//   } catch (error) {
//     console.error("Error inserting sample data:", error);
//     mongoose.connection.close();
//   }
// };

// insertSampleData();