import mongoose from "mongoose";
import dotenv from "dotenv";
import bcrypt from "bcryptjs";
import Product from "./models/Product.js";
import User from "./models/User.js";
import Cart from "./models/Cart.js";
import products from "./data/products.js";

dotenv.config();

// Connect to database
mongoose.connect(process.env.MONGO_URI);

// Function to seed data
const seedData = async () => {
  try {
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    // Create a default admin user
    const createdUser = await User.create({
      name: "Admin User",
      email: "admin@gmail.com",
      password: await bcrypt.hash("123456", 10),
      role: "admin",
    });

    // Assign the default user ID to each product
    const userID = createdUser._id;

    const sampleProducts = products.map((product) => {
      return { ...product, user: userID };
    });

    // Insert the products into the database
    await Product.insertMany(sampleProducts);

    console.log("Product data seeded successfully!");
    process.exit();
  } catch (error) {
    console.error("Error seeding the data", error);
    process.exit(1);
  }
};

seedData();
