import React, { useEffect, useState, useCallback, useMemo } from "react";
import { useSearchParams } from "react-router-dom";
import { ChevronDown } from "lucide-react";
import productApi from "../services/productApi";
import ProductCard from "../components/ui/ProductCard";
import FilterSidebar from "../components/ui/FilterSidebar";
import SearchBar from "../components/ui/SearchBar";

interface Product {
  id: number;
  name: string;
  price: number;
  discount_price?: number;
  discount_percent?: number;
  rating: number;
  sold_count: number;
  is_new?: boolean;
  is_featured?: boolean;
  is_promotional?: boolean;
  images?: Array<{
    image_url: string;
    alt_text?: string;
  }>;
}

interface PaginationInfo {
  total: number;
  per_page: number;
  current_page: number;
  total_pages: number;
}

export const Products = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [products, setProducts] = useState<Product[]>([]);
  const [pagination, setPagination] = useState<PaginationInfo | null>(null);
  const [loading, setLoading] = useState(false);

  // Derive filters from URL searchParams
  const filters = useMemo(() => {
    return {
      search: searchParams.get("search") || "",
      category_id: searchParams.get("category_id") ? searchParams.get("category_id")?.split(",") : [],
      min_price: searchParams.get("min_price") || "",
      max_price: searchParams.get("max_price") || "",
      is_new: searchParams.get("is_new") === "true" ? true : searchParams.get("is_new") === "false" ? false : null,
      is_featured: searchParams.get("is_featured") === "true" ? true : searchParams.get("is_featured") === "false" ? false : null,
      is_promotional: searchParams.get("is_promotional") === "true" ? true : searchParams.get("is_promotional") === "false" ? false : null,
      rating_min: searchParams.get("rating_min") || "",
      sort: searchParams.get("sort") || "created_at",
      order: searchParams.get("order") || "DESC",
    };
  }, [searchParams]);

  const currentPage = parseInt(searchParams.get("page") || "1");

  // Fetch products when filters change
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const response = await productApi.getProducts({
          ...filters,
          page: currentPage,
          limit: 12,
        });

        setProducts(response.data?.data?.products || []);
        setPagination(response.data?.data?.pagination);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, [filters, currentPage]);

  // Update URL params when filters change
  const updateFilters = useCallback((newFilters: any) => {
    const params = new URLSearchParams();
    
    // Merge new filters with existing search query if not provided
    const mergedFilters = { ...filters, ...newFilters };
    
    Object.entries(mergedFilters).forEach(([key, value]) => {
      if (value !== "" && value !== null && value !== undefined && (!Array.isArray(value) || value.length > 0)) {
        params.set(key, Array.isArray(value) ? value.join(",") : String(value));
      }
    });
    
    params.set("page", "1");
    setSearchParams(params);
  }, [filters, setSearchParams]);

  const handleSearch = useCallback((query: string) => {
    updateFilters({ search: query });
  }, [updateFilters]);

  const handlePageChange = (page: number) => {
    const params = new URLSearchParams(searchParams);
    params.set("page", String(page));
    setSearchParams(params);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      <div className="container mx-auto px-4 py-8">
        {/* Header with Search */}
        <div className="mb-12">
          <h1 className="text-5xl font-bold font-serif mb-6 text-center">Danh sách sản phẩm</h1>
          <SearchBar onSearch={handleSearch} />
        </div>

        {/* Main Content */}
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Sidebar */}
          <FilterSidebar onFiltersChange={updateFilters} initialFilters={filters} />

          {/* Products Grid */}
          <div className="flex-1">
            {/* Sort Bar */}
            <div className="bg-white border-2 border-black shadow-brutal p-6 mb-8 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <p className="text-gray-900 font-medium">
                Hiển thị{" "}
                <span className="font-bold underline decoration-2">
                  {(currentPage - 1) * 12 + 1}-
                  {Math.min(currentPage * 12, pagination?.total || 0)}
                </span>{" "}
                /{" "}
                <span className="font-bold">{pagination?.total || 0}</span> sản phẩm
              </p>

              <div className="flex flex-wrap items-center gap-4">
                <div className="flex items-center gap-2">
                  <span className="text-xs font-bold uppercase tracking-widest text-gray-500">Sắp xếp:</span>
                  <select
                    value={filters.sort}
                    onChange={(e) => updateFilters({ sort: e.target.value })}
                    className="px-3 py-2 border-2 border-black bg-white focus:outline-none focus:shadow-brutal transition-all font-bold text-sm"
                  >
                    <option value="created_at">Mới nhất</option>
                    <option value="price">Giá</option>
                    <option value="sold_count">Bán chạy nhất</option>
                    <option value="rating">Đánh giá cao nhất</option>
                  </select>
                </div>

                <select
                  value={filters.order}
                  onChange={(e) => updateFilters({ order: e.target.value })}
                  className="px-3 py-2 border-2 border-black bg-white focus:outline-none focus:shadow-brutal transition-all font-bold text-sm"
                >
                  <option value="DESC">Giảm dần ↓</option>
                  <option value="ASC">Tăng dần ↑</option>
                </select>
              </div>
            </div>

            {/* Loading State */}
            {loading ? (
              <div className="flex items-center justify-center h-96">
                <div className="text-center">
                  <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
                  <p className="mt-4 text-gray-600">Đang tải sản phẩm...</p>
                </div>
              </div>
            ) : products.length > 0 ? (
              <>
                {/* Products Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 mb-8">
                  {products.map((product) => (
                    <ProductCard key={product.id} product={product} />
                  ))}
                </div>

                {/* Pagination */}
                {pagination && pagination.total_pages > 1 && (
                  <div className="flex items-center justify-center gap-2 mb-8">
                    <button
                      onClick={() => handlePageChange(currentPage - 1)}
                      disabled={currentPage === 1}
                      className="px-4 py-2 border-2 border-black bg-white font-bold hover:shadow-brutal disabled:opacity-30 disabled:hover:shadow-none transition-all"
                    >
                      ← Trước
                    </button>

                    {/* Page Numbers */}
                    {Array.from(
                      { length: Math.min(pagination.total_pages, 5) },
                      (_, i) => {
                        let pageNum;
                        if (pagination.total_pages <= 5) {
                          pageNum = i + 1;
                        } else if (currentPage <= 3) {
                          pageNum = i + 1;
                        } else if (currentPage >= pagination.total_pages - 2) {
                          pageNum = pagination.total_pages - 4 + i;
                        } else {
                          pageNum = currentPage - 2 + i;
                        }
                        return pageNum;
                      }
                    ).map((pageNum) => (
                      <button
                        key={pageNum}
                        onClick={() => handlePageChange(pageNum)}
                        className={`px-4 py-2 border-2 border-black font-bold transition-all ${
                          currentPage === pageNum
                            ? "bg-black text-white shadow-brutal"
                            : "bg-white text-black hover:shadow-brutal"
                        }`}
                      >
                        {pageNum}
                      </button>
                    ))}

                    <button
                      onClick={() => handlePageChange(currentPage + 1)}
                      disabled={currentPage === pagination.total_pages}
                      className="px-4 py-2 border-2 border-black bg-white font-bold hover:shadow-brutal disabled:opacity-30 disabled:hover:shadow-none transition-all"
                    >
                      Tiếp →
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div className="flex items-center justify-center h-96 bg-white rounded-lg">
                <div className="text-center">
                  <p className="text-xl text-gray-600 mb-4">
                    Không tìm thấy sản phẩm
                  </p>
                  <button
                    onClick={() => updateFilters({})}
                    className="text-blue-600 hover:text-blue-800 font-semibold"
                  >
                    Xóa bộ lọc
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Products;
