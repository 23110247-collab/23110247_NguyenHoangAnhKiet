import db from "../models/index.js";

const { Product, ProductCategory, ProductImage, sequelize } = db;
const { Op } = sequelize.Sequelize;

export const productService = {
  // Get all products with filters, search, pagination
  getProducts: (filters = {}) => {
    return new Promise(async (resolve, reject) => {
      try {
        let {
          search = "",
          category_id = null,
          min_price = 0,
          max_price = 999999999,
          is_new = null,
          is_featured = null,
          is_promotional = null,
          sort = "created_at",
          order = "DESC",
          page = 1,
          limit = 12,
          rating_min = 0,
        } = filters;

        // Ensure numeric values are actually numbers and handle empty strings
        min_price = min_price === "" || min_price === null ? 0 : Number(min_price);
        max_price = max_price === "" || max_price === null ? 999999999 : Number(max_price);
        rating_min = rating_min === "" || rating_min === null ? 0 : Number(rating_min);

        let where = {
          status: "ACTIVE",
          price: {
            [Op.between]: [min_price, max_price],
          },
          rating: {
            [Op.gte]: rating_min,
          },
        };

        // Add search filter
        if (search) {
          where[Op.or] = [
            { name: { [Op.like]: `%${search}%` } },
            { description: { [Op.like]: `%${search}%` } },
          ];
        }

        // Add category filter
        if (category_id) {
          if (Array.isArray(category_id)) {
            where.category_id = { [Op.in]: category_id };
          } else {
            where.category_id = category_id;
          }
        }

        // Add flags filter
        if (is_new !== null) where.is_new = is_new;
        if (is_featured !== null) where.is_featured = is_featured;
        if (is_promotional !== null) where.is_promotional = is_promotional;

        const offset = (page - 1) * limit;

        const products = await Product.findAndCountAll({
          where,
          include: [
            {
              model: ProductCategory,
              as: "category",
              attributes: ["id", "name"],
            },
            {
              model: ProductImage,
              as: "images",
              where: { is_thumbnail: true },
              required: false,
              attributes: ["image_url", "alt_text"],
              limit: 1,
            },
          ],
          order: [[sort, order]],
          limit,
          offset,
          attributes: [
            "id",
            "name",
            "price",
            "discount_price",
            "discount_percent",
            "stock_quantity",
            "sold_count",
            "rating",
            "is_new",
            "is_featured",
            "is_promotional",
          ],
        });

        const totalPages = Math.ceil(products.count / limit);

        resolve({
          status: 200,
          message: "Products retrieved successfully",
          data: {
            products: products.rows,
            pagination: {
              total: products.count,
              per_page: limit,
              current_page: page,
              total_pages: totalPages,
            },
          },
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  // Get product by ID with all details
  getProductById: (productId) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await Product.findByPk(productId, {
          include: [
            {
              model: ProductCategory,
              as: "category",
              attributes: ["id", "name"],
            },
            {
              model: ProductImage,
              as: "images",
              attributes: ["id", "image_url", "alt_text", "display_order"],
              order: [["display_order", "ASC"]],
            },
          ],
          attributes: [
            "id",
            "name",
            "description",
            "price",
            "discount_price",
            "discount_percent",
            "stock_quantity",
            "sold_count",
            "rating",
            "is_new",
            "is_featured",
            "is_promotional",
            "created_at",
          ],
        });

        if (!product) {
          return resolve({
            status: 404,
            message: "Product not found",
            data: null,
          });
        }

        resolve({
          status: 200,
          message: "Product retrieved successfully",
          data: product,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  // Get similar products (same category, exclude current product)
  getSimilarProducts: (productId, limit = 4) => {
    return new Promise(async (resolve, reject) => {
      try {
        const product = await Product.findByPk(productId, {
          attributes: ["category_id"],
        });

        if (!product) {
          return resolve({
            status: 404,
            message: "Product not found",
            data: [],
          });
        }

        const similarProducts = await Product.findAll({
          where: {
            category_id: product.category_id,
            id: { [Op.ne]: productId },
            status: "ACTIVE",
          },
          include: [
            {
              model: ProductImage,
              as: "images",
              where: { is_thumbnail: true },
              required: false,
              attributes: ["image_url", "alt_text"],
              limit: 1,
            },
          ],
          limit,
          order: [["sold_count", "DESC"]],
          attributes: [
            "id",
            "name",
            "price",
            "discount_price",
            "discount_percent",
            "rating",
            "sold_count",
          ],
        });

        resolve({
          status: 200,
          message: "Similar products retrieved successfully",
          data: similarProducts,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  // Get featured products
  getFeaturedProducts: (limit = 8) => {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await Product.findAll({
          where: {
            is_featured: true,
            status: "ACTIVE",
          },
          include: [
            {
              model: ProductImage,
              as: "images",
              where: { is_thumbnail: true },
              required: false,
              attributes: ["image_url", "alt_text"],
              limit: 1,
            },
            {
              model: ProductCategory,
              as: "category",
              attributes: ["id", "name"],
            },
          ],
          limit,
          order: [["sold_count", "DESC"]],
          attributes: [
            "id",
            "name",
            "price",
            "discount_price",
            "discount_percent",
            "rating",
            "sold_count",
          ],
        });

        resolve({
          status: 200,
          message: "Featured products retrieved successfully",
          data: products,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  // Get new products
  getNewProducts: (limit = 8) => {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await Product.findAll({
          where: {
            is_new: true,
            status: "ACTIVE",
          },
          include: [
            {
              model: ProductImage,
              as: "images",
              where: { is_thumbnail: true },
              required: false,
              attributes: ["image_url", "alt_text"],
              limit: 1,
            },
            {
              model: ProductCategory,
              as: "category",
              attributes: ["id", "name"],
            },
          ],
          limit,
          order: [["created_at", "DESC"]],
          attributes: [
            "id",
            "name",
            "price",
            "discount_price",
            "discount_percent",
            "rating",
            "sold_count",
          ],
        });

        resolve({
          status: 200,
          message: "New products retrieved successfully",
          data: products,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  // Get promotional products
  getPromotionalProducts: (limit = 8) => {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await Product.findAll({
          where: {
            is_promotional: true,
            status: "ACTIVE",
          },
          include: [
            {
              model: ProductImage,
              as: "images",
              where: { is_thumbnail: true },
              required: false,
              attributes: ["image_url", "alt_text"],
              limit: 1,
            },
            {
              model: ProductCategory,
              as: "category",
              attributes: ["id", "name"],
            },
          ],
          limit,
          order: [["discount_percent", "DESC"]],
          attributes: [
            "id",
            "name",
            "price",
            "discount_price",
            "discount_percent",
            "rating",
            "sold_count",
          ],
        });

        resolve({
          status: 200,
          message: "Promotional products retrieved successfully",
          data: products,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  // Get best-selling products
  getBestSellingProducts: (limit = 8) => {
    return new Promise(async (resolve, reject) => {
      try {
        const products = await Product.findAll({
          where: {
            status: "ACTIVE",
          },
          include: [
            {
              model: ProductImage,
              as: "images",
              where: { is_thumbnail: true },
              required: false,
              attributes: ["image_url", "alt_text"],
              limit: 1,
            },
            {
              model: ProductCategory,
              as: "category",
              attributes: ["id", "name"],
            },
          ],
          limit,
          order: [["sold_count", "DESC"]],
          attributes: [
            "id",
            "name",
            "price",
            "discount_price",
            "discount_percent",
            "rating",
            "sold_count",
          ],
        });

        resolve({
          status: 200,
          message: "Best-selling products retrieved successfully",
          data: products,
        });
      } catch (error) {
        reject(error);
      }
    });
  },

  // Get all categories
  getCategories: () => {
    return new Promise(async (resolve, reject) => {
      try {
        const categories = await ProductCategory.findAll({
          where: { status: "ACTIVE" },
          attributes: ["id", "name", "image_url"],
          order: [["name", "ASC"]],
        });

        resolve({
          status: 200,
          message: "Categories retrieved successfully",
          data: categories,
        });
      } catch (error) {
        reject(error);
      }
    });
  },
};

export default productService;
