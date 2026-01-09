import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import User from "../model/userModel.js";

// /**
//  * Generate JWT
//  */
const generateToken = (user) => {
  return jwt.sign(
    {
      id: user._id,
      role: user.role,
    },
    process.env.JWT_SECRET,
    { expiresIn: "7d" }
  );
};

// /**
//  * @desc    Register new user
//  * @route   POST /api/auth/register
//  * @access  Public
//  */
export const register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Check required fields
    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // 2. Check if user already exists
    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // 3. Hash password
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    // 4. Create user
    const user = await User.create({
      name,
      email,
      password: hashedPassword,
    });

    // 5. Send response
    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// /**
//  * @desc    Login user
//  * @route   POST /api/auth/login
//  * @access  Public
//  */

export const login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Check fields
    if (!email || !password) {
      return res.status(400).json({ message: "Email and password are required" });
    }

    // 2. Find user (include password explicitly)
    const user = await User.findOne({ email }).select("+password");
    if (!user) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 3. Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ message: "Invalid credentials" });
    }

    // 4. Generate token
    const token = generateToken(user);

    // 5. Send response
    res.status(200).json({
      message: "Login successful",
      token,
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
        role: user.role,
      },
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// /**
//  * @desc    Get logged-in user
//  * @route   GET /api/auth/me
//  * @access  Protected
//  */

export const getMe = async (req, res) => {
  try {
    // req.user is set by authMiddleware
    const user = await User.findById(req.user.id);

    res.status(200).json({
      user,
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
