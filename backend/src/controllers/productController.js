import productService from "../services/productService.js";

export const productController = {
  // Get products with filters
  getProducts: async (req, res) => {
    try {
      const filters = {
        search: req.query.search || "",
        category_id: req.query.category_id 
          ? (String(req.query.category_id).includes(",") 
              ? String(req.query.category_id).split(",").map(id => parseInt(id.trim()))
              : parseInt(req.query.category_id)) 
          : null,
        min_price: req.query.min_price ? parseFloat(req.query.min_price) : 0,
        max_price: req.query.max_price ? parseFloat(req.query.max_price) : 999999999,
        is_new: req.query.is_new ? req.query.is_new === "true" : null,
        is_featured: req.query.is_featured ? req.query.is_featured === "true" : null,
        is_promotional: req.query.is_promotional ? req.query.is_promotional === "true" : null,
        sort: req.query.sort || "created_at",
        order: req.query.order || "DESC",
        page: req.query.page ? parseInt(req.query.page) : 1,
        limit: req.query.limit ? parseInt(req.query.limit) : 12,
        rating_min: req.query.rating_min ? parseFloat(req.query.rating_min) : 0,
      };

      const response = await productService.getProducts(filters);
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getProducts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get product by ID
  getProductById: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const response = await productService.getProductById(parseInt(id));
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getProductById:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get similar products
  getSimilarProducts: async (req, res) => {
    try {
      const { id } = req.params;

      if (!id) {
        return res.status(400).json({ message: "Product ID is required" });
      }

      const limit = req.query.limit ? parseInt(req.query.limit) : 4;
      const response = await productService.getSimilarProducts(parseInt(id), limit);
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getSimilarProducts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get featured products
  getFeaturedProducts: async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 8;
      const response = await productService.getFeaturedProducts(limit);
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getFeaturedProducts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get new products
  getNewProducts: async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 8;
      const response = await productService.getNewProducts(limit);
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getNewProducts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get promotional products
  getPromotionalProducts: async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 8;
      const response = await productService.getPromotionalProducts(limit);
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getPromotionalProducts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get best-selling products
  getBestSellingProducts: async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const response = await productService.getBestSellingProducts(limit);
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getBestSellingProducts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get most-viewed products
  getMostViewedProducts: async (req, res) => {
    try {
      const limit = req.query.limit ? parseInt(req.query.limit) : 10;
      const response = await productService.getMostViewedProducts(limit);
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getMostViewedProducts:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },

  // Get all categories
  getCategories: async (req, res) => {
    try {
      const response = await productService.getCategories();
      return res.status(response.status).json(response);
    } catch (error) {
      console.error("Error in getCategories:", error);
      return res.status(500).json({ message: "Internal server error" });
    }
  },
};

export default productController;
