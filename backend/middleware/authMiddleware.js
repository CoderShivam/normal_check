import jwt from "jsonwebtoken";
import User from "../models/userSchema.js";

export const isAuthenticated = async (req, res, next) => {
  const token = req.cookies?.token; // Check if token exists in cookies

  if (!token) {
    return res
      .status(401)
      .json({ success: false, message: "Access Denied: No Token Provided" });
  }

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET); // Verify the token
    req.user = await User.findById(decoded.id); // Retrieve user from DB based on ID
    next();
  } catch (error) {
    return res
      .status(401)
      .json({ success: false, message: "Invalid Token" });
  }
};