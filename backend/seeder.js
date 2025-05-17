import mongoose from "mongoose";
import express from "express";
import User from "./models/User.js";
import Product from "./models/Product.js";
import { connectDb } from "./config/db.js";
import products from "./data/products.js";
import 'dotenv/config';
import Cart from "./models/Cart.js";

//connect to mongodb
connectDb();

//function to seed data
const seedData = async () => {
  try {
    //clear existing data
    await Product.deleteMany();
    await User.deleteMany();
    await Cart.deleteMany();

    //default admin user
    const createdUser = await User.create({
      name: "admin",
      email: "admin@example.com",
      password: "123456",
      role: "admin",
    });

    const userId = createdUser._id;

    const sampleProduct = products.map((product) => ({
      ...product,
      user: userId,
    }));

    await Product.insertMany(sampleProduct);
    console.log("Data seeded successfully");
    process.exit(0);
  } catch (error) {
    console.error("Error seeding data: ", error);
    process.exit(1);
  }
};

seedData()