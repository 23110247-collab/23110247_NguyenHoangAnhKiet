import axiosClient from "./axiosClient";

export interface ProductFilters {
  search?: string;
  category_id?: string | number | (string | number)[];
  min_price?: string | number;
  max_price?: string | number;
  is_new?: boolean;
  is_featured?: boolean;
  is_promotional?: boolean;
  sort?: string;
  order?: string;
  page?: string | number;
  limit?: string | number;
  rating_min?: string | number;
}

export const productApi = {
  // Get all products with filters
  getProducts: (filters: ProductFilters = {}) => {
    const params = new URLSearchParams();
    
    if (filters.search) params.append("search", filters.search);
    if (filters.category_id) {
      const categoryValue = Array.isArray(filters.category_id) 
        ? filters.category_id.join(",") 
        : String(filters.category_id);
      params.append("category_id", categoryValue);
    }
    if (filters.min_price) params.append("min_price", String(filters.min_price));
    if (filters.max_price) params.append("max_price", String(filters.max_price));
    if (filters.is_new !== undefined && filters.is_new !== null) params.append("is_new", String(filters.is_new));
    if (filters.is_featured !== undefined && filters.is_featured !== null) params.append("is_featured", String(filters.is_featured));
    if (filters.is_promotional !== undefined && filters.is_promotional !== null) params.append("is_promotional", String(filters.is_promotional));
    if (filters.sort) params.append("sort", filters.sort);
    if (filters.order) params.append("order", filters.order);
    if (filters.page) params.append("page", String(filters.page));
    if (filters.limit) params.append("limit", String(filters.limit));
    if (filters.rating_min) params.append("rating_min", String(filters.rating_min));

    return axiosClient.get(`/products?${params.toString()}`);
  },

  // Get product by ID
  getProductById: (id: string | number) => {
    return axiosClient.get(`/products/${id}`);
  },

  // Get similar products
  getSimilarProducts: (id: string | number, limit = 4) => {
    return axiosClient.get(`/products/${id}/similar?limit=${limit}`);
  },

  // Get featured products
  getFeaturedProducts: (limit = 8) => {
    return axiosClient.get(`/products/featured?limit=${limit}`);
  },

  // Get new products
  getNewProducts: (limit = 8) => {
    return axiosClient.get(`/products/new?limit=${limit}`);
  },

  // Get promotional products
  getPromotionalProducts: (limit = 8) => {
    return axiosClient.get(`/products/promotional?limit=${limit}`);
  },

  // Get best-selling products
  getBestSellingProducts: (limit = 8) => {
    return axiosClient.get(`/products/best-selling?limit=${limit}`);
  },

  // Get all categories
  getCategories: () => {
    return axiosClient.get(`/products/categories`);
  },
};

export default productApi;
