import express from "express";
import productController from "../controllers/productController.js";

const router = express.Router();

// Get products with filters and search
router.get("/", productController.getProducts);

// Get categories
router.get("/categories", productController.getCategories);

// Get featured products
router.get("/featured", productController.getFeaturedProducts);

// Get new products
router.get("/new", productController.getNewProducts);

// Get promotional products
router.get("/promotional", productController.getPromotionalProducts);

// Get best-selling products
router.get("/best-selling", productController.getBestSellingProducts);

// Get product by ID
router.get("/:id", productController.getProductById);

// Get similar products
router.get("/:id/similar", productController.getSimilarProducts);

export default router;
