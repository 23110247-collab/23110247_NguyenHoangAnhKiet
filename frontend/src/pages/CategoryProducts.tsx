import React, { useEffect, useState, useRef, useCallback } from "react";
import productApi from "../services/productApi";
import ProductCard from "../components/ui/ProductCard";

interface Category {
  id: number;
  name: string;
  image_url?: string;
}

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

export const CategoryProducts = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [activeCategoryId, setActiveCategoryId] = useState<number | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [totalProducts, setTotalProducts] = useState(0);

  const observerRef = useRef<IntersectionObserver | null>(null);
  const loadMoreElementRef = useRef<HTMLDivElement | null>(null);

  // Fetch all categories on component mount
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await productApi.getCategories();
        const cats = response.data?.data || [];
        setCategories(cats);
        if (cats.length > 0) {
          // Set first category as active by default
          setActiveCategoryId(cats[0].id);
        }
      } catch (error) {
        console.error("Error fetching categories:", error);
      }
    };
    fetchCategories();
  }, []);

  // Fetch products when active category or page changes
  const fetchProducts = useCallback(async (catId: number, pageNum: number, append = false) => {
    if (!catId) return;
    try {
      setLoading(true);
      const response = await productApi.getProducts({
        category_id: catId,
        page: pageNum,
        limit: 4, // Fetch smaller chunks for smooth lazy loading
      });

      const fetchedProducts = response.data?.data?.products || [];
      const pagination = response.data?.data?.pagination;

      if (append) {
        setProducts((prev) => {
          // Prevent duplicates by checking ids
          const existingIds = new Set(prev.map(p => p.id));
          const uniqueNew = fetchedProducts.filter((p: Product) => !existingIds.has(p.id));
          return [...prev, ...uniqueNew];
        });
      } else {
        setProducts(fetchedProducts);
      }

      setTotalProducts(pagination?.total || 0);
      setHasMore(pageNum < (pagination?.total_pages || 1));
    } catch (error) {
      console.error("Error fetching products for category:", error);
    } finally {
      setLoading(false);
    }
  }, []);

  // Effect to load initial products on category change
  useEffect(() => {
    if (activeCategoryId !== null) {
      setProducts([]);
      setPage(1);
      setHasMore(true);
      fetchProducts(activeCategoryId, 1, false);
    }
  }, [activeCategoryId, fetchProducts]);

  // Effect to load next pages
  useEffect(() => {
    if (page > 1 && activeCategoryId !== null) {
      fetchProducts(activeCategoryId, page, true);
    }
  }, [page, activeCategoryId, fetchProducts]);

  // Setup intersection observer for lazy loading
  const handleObserver = useCallback(
    (entries: IntersectionObserverEntry[]) => {
      const target = entries[0];
      if (target.isIntersecting && hasMore && !loading) {
        setPage((prev) => prev + 1);
      }
    },
    [hasMore, loading]
  );

  useEffect(() => {
    const option = {
      root: null,
      rootMargin: "20px",
      threshold: 0.1,
    };

    if (observerRef.current) observerRef.current.disconnect();

    observerRef.current = new IntersectionObserver(handleObserver, option);

    const currentElement = loadMoreElementRef.current;
    if (currentElement) {
      observerRef.current.observe(currentElement);
    }

    return () => {
      if (observerRef.current) observerRef.current.disconnect();
    };
  }, [handleObserver]);

  const handleCategorySelect = (categoryId: number) => {
    if (activeCategoryId === categoryId) return;
    setActiveCategoryId(categoryId);
  };

  return (
    <div className="min-h-screen bg-[#faf9f6] pb-24">
      <div className="container mx-auto px-4 py-12">
        {/* Giant Brutalist Page Title */}
        <div className="text-center mb-16">
          <span className="inline-block bg-black text-white px-4 py-2 border-2 border-black text-xs font-black uppercase tracking-[0.3em] mb-4">
            Browse by Category
          </span>
          <h1 className="text-6xl font-black font-serif uppercase tracking-tight text-black">
            Danh mục sản phẩm
          </h1>
          <p className="text-sm font-bold text-gray-500 mt-4 uppercase tracking-widest">
            Trải nghiệm tải trang cuộn vô hạn (Lazy Loading) siêu tốc
          </p>
        </div>

        {/* Dynamic Category Selector Tab Bar */}
        <div className="mb-12 overflow-x-auto pb-4 scrollbar-thin">
          <div className="flex justify-center min-w-max gap-4 px-4">
            {categories.map((category) => {
              const isActive = activeCategoryId === category.id;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className={`px-8 py-4 border-3 border-black text-sm font-black uppercase tracking-wider transition-all duration-200 active:translate-y-1 active:translate-x-1 ${
                    isActive
                      ? "bg-black text-white shadow-none translate-y-[2px] translate-x-[2px]"
                      : "bg-white text-black hover:bg-black/5 shadow-[4px_4px_0px_0px_#000000] hover:shadow-[6px_6px_0px_0px_#000000]"
                  }`}
                >
                  {category.name}
                </button>
              );
            })}
          </div>
        </div>

        {/* Results Counter */}
        <div className="flex items-center justify-between mb-8 max-w-7xl mx-auto border-b-2 border-black/10 pb-4">
          <p className="font-bold text-black uppercase tracking-wider text-sm">
            Hiển thị <span className="underline decoration-2 font-black">{products.length}</span> /{" "}
            <span className="font-black">{totalProducts}</span> sản phẩm
          </p>
          <span className="bg-[#d97736] text-white px-3 py-1 border-2 border-black text-[10px] font-black uppercase tracking-widest shadow-[2px_2px_0px_0px_#000000]">
            Lazy Loading Active
          </span>
        </div>

        {/* Main Product Grid */}
        <div className="max-w-7xl mx-auto">
          {products.length > 0 ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
              {products.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>
          ) : (
            !loading && (
              <div className="bg-white border-3 border-black shadow-brutal p-12 text-center my-12">
                <p className="text-xl font-bold uppercase tracking-wider text-gray-500">
                  Không tìm thấy sản phẩm nào trong danh mục này.
                </p>
              </div>
            )
          )}

          {/* Loading indicator / Scroll anchor */}
          <div
            ref={loadMoreElementRef}
            className="flex flex-col items-center justify-center py-16 mt-8 w-full"
          >
            {loading && (
              <div className="text-center">
                <div className="inline-block animate-spin rounded-full h-12 w-12 border-4 border-black border-t-transparent mb-4"></div>
                <p className="text-sm font-black uppercase tracking-widest text-black">
                  Đang tải thêm sản phẩm...
                </p>
              </div>
            )}
            {!hasMore && products.length > 0 && (
              <div className="bg-black text-white px-8 py-4 border-2 border-black text-center font-black uppercase tracking-widest text-xs shadow-brutal my-4">
                ✨ Bạn đã xem hết tất cả sản phẩm của danh mục này!
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default CategoryProducts;
