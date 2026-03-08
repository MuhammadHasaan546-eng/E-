import mongoose from "mongoose";
import User from "./models/User.js";
import bcrypt from "bcrypt";
import dotenv from "dotenv";

dotenv.config();

async function test() {
  await mongoose.connect(process.env.MONGO_URL);
  console.log("Connected");
  
  const password = "testpassword";
  const hashPassword = await bcrypt.hash(password, 10);
  console.log("Hashed");
  
  const newUser = new User({
    username: "testuser_" + Date.now(),
    email: "test_" + Date.now() + "@gmail.com",
    password: hashPassword,
  });
  
  try {
    await newUser.save();
    console.log("Saved");
  } catch (e) {
    console.error("Error saving:", e);
  } finally {
    await mongoose.disconnect();
  }
}

test();
