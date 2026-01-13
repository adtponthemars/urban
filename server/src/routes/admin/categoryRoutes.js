import { Router } from "express";
import { createCategory, getCategories } from "../../controllers/categoryController.js";
import { adminMiddleware } from "../../middlewares/adminMiddleware.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = Router();

router.post('/create', authMiddleware, adminMiddleware, createCategory);
router.get('/', getCategories);


export default router;