import User from "../../models/User.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// register

export const registerUser = async (req, res) => {
  const { userName, email, password } = req.body;

  const userExists = await User.findOne({ email });
  if (userExists) {
    return res.status(400).json({
      success: false,
      message: "User already exists with this email",
    });
  }

  try {
    const hashPassword = await bcrypt.hash(password, 10);
    const newUser = new User({
      username: userName,
      email,
      password: hashPassword,
    });
    const user = await newUser.save();

    res.status(201).json({
      success: true,
      message: "User created successfully",
      user,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// login

export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  const userExists = await User.findOne({ email });

  try {
    if (!userExists) {
      return res.status(400).json({
        success: false,
        message: "User does not exist with this email",
      });
    }

    const isMatch = await bcrypt.compare(password, userExists.password);
    if (!isMatch) {
      return res.status(400).json({
        success: false,
        message: "Invalid credentials",
      });
    } else {
      const token = jwt.sign(
        { id: userExists._id, email: userExists.email },
        process.env.JWT_SECRET,
        {
          expiresIn: "60mins",
        },
      );

      const options = {
        expires: new Date(Date.now() + 3 * 24 * 60 * 60 * 1000),
        httpOnly: true,
        secure: false,
      };
      res
        .cookie("token", token, options)
        .status(200)
        .json({
          success: true,
          message: "User logged in successfully",
          user: {
            id: userExists._id,
            username: userExists.username,
            email: userExists.email,
            role: userExists.role,
          },
        });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: error.message,
    });
  }
};

// logout

export const logoutUser = async (req, res) => {
  res.clearCookie("token").status(200).json({
    success: true,
    message: "User logged out successfully",
  });
};

// check auth
const authMiddleware = async (req, res, next) => {
  const token = req.cookies.token;
  if (!token) {
    return res.status(401).json({
      success: true,
      message: "Unauthorized user",
    });
  }
  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    return res.status(401).json({
      success: true,
      message: "Unauthorized user",
    });
  }
};
