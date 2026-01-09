import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

/**
 * Protect routes - verify JWT
 */
export const authMiddleware = async (req, res, next) => {
  try {
    let token;

    // 1️⃣ Check for token in Authorization header
    if (
      req.headers.authorization &&
      req.headers.authorization.startsWith("Bearer")
    ) {
      token = req.headers.authorization.split(" ")[1];
    }

    // 2️⃣ If no token found
    if (!token) {
      return res.status(401).json({ message: "Not authorized, no token" });
    }

    // 3️⃣ Verify token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // 4️⃣ Get user from DB (exclude password)
    req.user = await User.findById(decoded.id).select("-password");

    if (!req.user) {
      return res.status(401).json({ message: "User no longer exists" });
    }

    // 5️⃣ Continue to next middleware/controller
    next();
  } catch (error) {
    return res.status(401).json({ message: "Not authorized, token failed" });
  }
};
