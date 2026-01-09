import express from "express";
import {
  register,
  login,
  getMe,
} from "../controllers/authController.js";
import { authMiddleware } from "../middlewares/authMiddleware.js";

const router = express.Router();

/**
 * @route   POST /api/auth/register
 * @desc    Register new user
 * @access  Public
 */
router.post("/register", register);

/**
 * @route   POST /api/auth/login
 * @desc    Login user
 * @access  Public
 */
router.post("/login", login);

/**
 * @route   GET /api/auth/me
 * @desc    Get logged-in user
 * @access  Protected
 */
router.get("/me", authMiddleware, getMe);

export default router;
