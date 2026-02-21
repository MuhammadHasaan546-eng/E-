import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;
  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      userName,
      email,
      password: hashPassword,
    });
    newUser.save();
    res.status("201").json({
      success: true,
      message: "User created successfully",
    });
  } catch (error) {
    res.status("500").json(
      {
        success: false,
        message: error.message,
      },
      error,
    );
  }
};

// login

const login = async (req, res) => {
  const { email, password } = req.body;
  try {
  } catch (error) {
    res.status("500").json({
      success: false,
      message: error.message,
    });
  }
};

// logout
