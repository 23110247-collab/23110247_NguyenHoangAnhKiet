import React, { useEffect, useState, useMemo } from "react";
import { ChevronDown, X } from "lucide-react";
import productApi from "../../services/productApi";

interface FilterSidebarProps {
  onFiltersChange: (filters: any) => void;
  initialFilters?: any;
}

interface Category {
  id: number;
  name: string;
}

export const FilterSidebar: React.FC<FilterSidebarProps> = ({
  onFiltersChange,
  initialFilters = {},
}) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [expandedSections, setExpandedSections] = useState({
    categories: true,
    price: true,
    rating: true,
    type: true,
  });

  const [filters, setFilters] = useState<any>({
    category_id: initialFilters.category_id 
      ? (Array.isArray(initialFilters.category_id) ? initialFilters.category_id : String(initialFilters.category_id).split(","))
      : [],
    min_price: initialFilters.min_price || "",
    max_price: initialFilters.max_price || "",
    rating_min: initialFilters.rating_min || "",
    is_new: initialFilters.is_new === "true" || initialFilters.is_new === true || null,
    is_featured: initialFilters.is_featured === "true" || initialFilters.is_featured === true || null,
    is_promotional: initialFilters.is_promotional === "true" || initialFilters.is_promotional === true || null,
  });

  // Fetch categories on mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productApi.getCategories();
        setCategories(response.data?.data || []);
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Sync with initialFilters if they change from outside (e.g. URL change)
  useEffect(() => {
    if (initialFilters) {
      setFilters({
        category_id: initialFilters.category_id 
          ? (Array.isArray(initialFilters.category_id) ? initialFilters.category_id : String(initialFilters.category_id).split(","))
          : [],
        min_price: initialFilters.min_price || "",
        max_price: initialFilters.max_price || "",
        rating_min: initialFilters.rating_min || "",
        is_new: initialFilters.is_new === "true" || initialFilters.is_new === true ? true : initialFilters.is_new === "false" || initialFilters.is_new === false ? false : null,
        is_featured: initialFilters.is_featured === "true" || initialFilters.is_featured === true ? true : initialFilters.is_featured === "false" || initialFilters.is_featured === false ? false : null,
        is_promotional: initialFilters.is_promotional === "true" || initialFilters.is_promotional === true ? true : initialFilters.is_promotional === "false" || initialFilters.is_promotional === false ? false : null,
      });
    }
  }, [JSON.stringify(initialFilters)]);

  const handleApply = () => {
    const cleanFilters = Object.fromEntries(
      Object.entries(filters).filter(
        ([key, value]) => {
          if (key === "category_id") {
            return Array.isArray(value) ? value.length > 0 : value !== "";
          }
          return value !== "" && value !== null;
        }
      )
    );
    onFiltersChange(cleanFilters);
  };

  const toggleSection = (section: string) => {
    setExpandedSections((prev) => ({
      ...prev,
      [section]: !prev[section],
    }));
  };

  const handleCategoryChange = (categoryId: string) => {
    setFilters((prev: any) => {
      const categoryIds = Array.isArray(prev.category_id) ? [...prev.category_id] : (prev.category_id ? [String(prev.category_id)] : []);
      const index = categoryIds.indexOf(categoryId);
      if (index > -1) {
        categoryIds.splice(index, 1);
      } else {
        categoryIds.push(categoryId);
      }
      return { ...prev, category_id: categoryIds };
    });
  };

  const handlePriceChange = (
    type: "min" | "max",
    value: string
  ) => {
    setFilters((prev) => ({
      ...prev,
      [type === "min" ? "min_price" : "max_price"]: value,
    }));
  };

  const handleRatingChange = (rating: string) => {
    setFilters((prev) => ({
      ...prev,
      rating_min: prev.rating_min === rating ? "" : rating,
    }));
  };

  const handleTypeChange = (type: string, value: boolean) => {
    setFilters((prev) => ({
      ...prev,
      [type]: prev[type as keyof typeof filters] === value ? null : value,
    }));
  };

  const resetFilters = () => {
    const defaultFilters = {
      category_id: [],
      min_price: "",
      max_price: "",
      rating_min: "",
      is_new: null,
      is_featured: null,
      is_promotional: null,
    };
    setFilters(defaultFilters);
    onFiltersChange({});
  };

  return (
    <div className="w-64 bg-white border-2 border-black shadow-brutal p-6 h-fit sticky top-4">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-bold font-serif">Bộ lọc</h2>
        <button onClick={resetFilters} className="text-xs font-bold hover:underline">
          Xóa hết
        </button>
      </div>

      {/* Categories */}
      <div className="mb-6 border-b-2 border-black pb-4">
        <button
          onClick={() => toggleSection("categories")}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-bold text-gray-900 uppercase tracking-wider text-sm">Danh mục</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              expandedSections.categories ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.categories && (
          <div className="space-y-2 ml-1">
            {categories.map((category) => (
              <label key={category.id} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={Array.isArray(filters.category_id) ? filters.category_id.includes(String(category.id)) : filters.category_id === String(category.id)}
                  onChange={() =>
                    handleCategoryChange(String(category.id))
                  }
                  className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-black transition-colors"
                />
                <span className={`ml-2 text-sm font-medium transition-colors ${
                  (Array.isArray(filters.category_id) ? filters.category_id.includes(String(category.id)) : filters.category_id === String(category.id)) 
                    ? "text-black font-bold" 
                    : "text-gray-600 group-hover:text-black"
                }`}>
                  {category.name}
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Price Range */}
      <div className="mb-6 border-b-2 border-black pb-4">
        <button
          onClick={() => toggleSection("price")}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-bold text-gray-900 uppercase tracking-wider text-sm">Giá</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              expandedSections.price ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.price && (
          <div className="space-y-3 ml-1">
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Tối thiểu (₫)</label>
              <input
                type="number"
                value={filters.min_price}
                onChange={(e) => handlePriceChange("min", e.target.value)}
                placeholder="0"
                className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:shadow-brutal transition-all text-sm"
              />
            </div>
            <div>
              <label className="text-[10px] font-bold text-gray-500 uppercase">Tối đa (₫)</label>
              <input
                type="number"
                value={filters.max_price}
                onChange={(e) => handlePriceChange("max", e.target.value)}
                placeholder="99.000.000"
                className="w-full px-3 py-2 border-2 border-black focus:outline-none focus:shadow-brutal transition-all text-sm"
              />
            </div>
          </div>
        )}
      </div>

      {/* Rating */}
      <div className="mb-6 border-b-2 border-black pb-4">
        <button
          onClick={() => toggleSection("rating")}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-bold text-gray-900 uppercase tracking-wider text-sm">Đánh giá</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              expandedSections.rating ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.rating && (
          <div className="space-y-2 ml-1">
            {[5, 4, 3, 2].map((rating) => (
              <label key={rating} className="flex items-center cursor-pointer group">
                <input
                  type="checkbox"
                  checked={filters.rating_min === String(rating)}
                  onChange={() => handleRatingChange(String(rating))}
                  className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-black transition-colors"
                />
                <span className={`ml-2 text-sm font-medium transition-colors ${filters.rating_min === String(rating) ? "text-black font-bold" : "text-gray-600 group-hover:text-black"}`}>
                  {rating}⭐ trở lên
                </span>
              </label>
            ))}
          </div>
        )}
      </div>

      {/* Product Type */}
      <div className="mb-6 border-b-2 border-black pb-4">
        <button
          onClick={() => toggleSection("type")}
          className="flex items-center justify-between w-full mb-3"
        >
          <span className="font-bold text-gray-900 uppercase tracking-wider text-sm">Loại</span>
          <ChevronDown
            size={18}
            className={`transition-transform duration-300 ${
              expandedSections.type ? "rotate-180" : ""
            }`}
          />
        </button>
        {expandedSections.type && (
          <div className="space-y-2 ml-1">
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.is_new === true}
                onChange={() => handleTypeChange("is_new", true)}
                className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-black transition-colors"
              />
              <span className={`ml-2 text-sm font-medium transition-colors ${filters.is_new === true ? "text-black font-bold" : "text-gray-600 group-hover:text-black"}`}>
                Sản phẩm mới
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.is_promotional === true}
                onChange={() => handleTypeChange("is_promotional", true)}
                className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-black transition-colors"
              />
              <span className={`ml-2 text-sm font-medium transition-colors ${filters.is_promotional === true ? "text-black font-bold" : "text-gray-600 group-hover:text-black"}`}>
                Khuyến mãi
              </span>
            </label>
            <label className="flex items-center cursor-pointer group">
              <input
                type="checkbox"
                checked={filters.is_featured === true}
                onChange={() => handleTypeChange("is_featured", true)}
                className="w-4 h-4 border-2 border-black rounded-none appearance-none checked:bg-black transition-colors"
              />
              <span className={`ml-2 text-sm font-medium transition-colors ${filters.is_featured === true ? "text-black font-bold" : "text-gray-600 group-hover:text-black"}`}>
                Nổi bật
              </span>
            </label>
          </div>
        )}
      </div>

      <button
        onClick={handleApply}
        className="w-full bg-black text-white py-3 font-bold uppercase tracking-widest text-xs hover:shadow-brutal transition-all active:translate-x-0.5 active:translate-y-0.5"
      >
        Áp dụng lọc
      </button>
    </div>
  );
};

export default FilterSidebar;
