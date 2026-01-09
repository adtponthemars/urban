import { Router } from "express";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { adminMiddleware } from "../../middlewares/adminMiddleware.js";
import {
  getAllProducts,
  createProduct,
  updateProduct,
  deleteProduct,
} from "../../controllers/productController.js";

const router = Router();

router.get("/", getAllProducts);
router.post("/create", authMiddleware, adminMiddleware, createProduct);
router.put("/update/:id", authMiddleware, adminMiddleware, updateProduct);
router.delete("/delete/:id", authMiddleware, adminMiddleware, deleteProduct);

export default router;
