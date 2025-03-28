import User from "../models/userSchema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

// Register User
export const register = async (req, res, next) => {
  const { name, email, password } = req.body;

  // Validate request body
  if (!name || !email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill out the full form.",
    });
  }

  try {
    console.log("Request Body:", req.body); // Debugging log

    // Check if user already exists
    const isUser = await User.findOne({ email });
    if (isUser) {
      return res.status(400).json({
        success: false,
        message: "User already exists.",
      });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the user
    const user = await User.create({ name, email, password: hashedPassword });

    res.status(201).json({
      success: true,
      message: "User registered successfully.",
      user,
    });
  } catch (error) {
    console.error("Error in register:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Login User
export const login = async (req, res, next) => {
  const { email, password } = req.body;

  // Validate request body
  if (!email || !password) {
    return res.status(400).json({
      success: false,
      message: "Please fill out the full form.",
    });
  }

  try {
    // Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Check if password matches
    const isPasswordMatched = await bcrypt.compare(password, user.password);
    if (!isPasswordMatched) {
      return res.status(400).json({
        success: false,
        message: "Invalid email or password.",
      });
    }

    // Generate a JWT token
    const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET, {
      expiresIn: "7d",
    });

    // Set token in an HTTP-only cookie
    console.log("Generated Token:", token);
    res.status(200)
      .cookie("token", token, {
        httpOnly: true,
        expires: new Date(Date.now() + process.env.COOKIE_EXPIRES * 24 * 60 * 60 * 1000),
        
      })
      .json({
        success: true,
        message: "User logged in successfully.",
        user,
        token,
      });
  } catch (error) {
    console.error("Error in login:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Get Logged-in User
export const getUser = async (req, res, next) => {
  try {
    // Fetch user using the user ID stored in `req.user` (after JWT validation)
    const user = await User.findById(req.user._id);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found.",
      });
    }

    res.status(200).json({
      success: true,
      user,
    });
  } catch (error) {
    console.error("Error in getUser:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};

// Logout User
export const logout = async (req, res) => {
  try {
    res.clearCookie("token", {
      httpOnly: true,
      
    });

    res.status(200).json({
      success: true,
      message: "Logged out successfully",
    });
  } catch (error) {
    console.error("Error in logout:", error);
    res.status(500).json({
      success: false,
      message: "Server error. Please try again later.",
    });
  }
};