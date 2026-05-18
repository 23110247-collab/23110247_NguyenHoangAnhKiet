import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import productApi from "../services/productApi";
import ProductCard from "../components/ui/ProductCard";
import HorizontalPaginationCarousel from "../components/ui/HorizontalPaginationCarousel";

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

export const Home = () => {
  const [featuredProducts, setFeaturedProducts] = useState<Product[]>([]);
  const [newProducts, setNewProducts] = useState<Product[]>([]);
  const [promotionalProducts, setPromotionalProducts] = useState<Product[]>([]);
  const [bestSellingProducts, setBestSellingProducts] = useState<Product[]>([]);
  const [mostViewedProducts, setMostViewedProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setLoading(true);
        const [featured, newProds, promo, bestSelling, mostViewed] = await Promise.all([
          productApi.getFeaturedProducts(8),
          productApi.getNewProducts(8),
          productApi.getPromotionalProducts(8),
          productApi.getBestSellingProducts(10),
          productApi.getMostViewedProducts(10),
        ]);

        setFeaturedProducts(featured.data?.data || []);
        setNewProducts(newProds.data?.data || []);
        setPromotionalProducts(promo.data?.data || []);
        setBestSellingProducts(bestSelling.data?.data || []);
        setMostViewedProducts(mostViewed.data?.data || []);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchProducts();
  }, []);

  const ProductSection = ({
    title,
    products,
    viewAllLink,
  }: {
    title: string;
    products: Product[];
    viewAllLink?: string;
  }) => (
    <section className="mb-12">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold text-gray-800">{title}</h2>
        {viewAllLink && (
          <Link
            to={viewAllLink}
            className="text-blue-600 hover:text-blue-800 font-semibold"
          >
            Xem tất cả →
          </Link>
        )}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        {products.length > 0 ? (
          products.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))
        ) : (
          <div className="col-span-full text-center py-8">
            <p className="text-gray-500">Chưa có sản phẩm</p>
          </div>
        )}
      </div>
    </section>
  );

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="text-center">
          <div className="inline-block animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
          <p className="mt-4 text-gray-600">Đang tải...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#faf9f6]">
      {/* Hero Banner */}
      <section className="bg-white border-b-4 border-black py-20 mb-16 relative overflow-hidden">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
            <div className="relative z-10">
              <span className="inline-block bg-black text-white px-4 py-1 text-xs font-black uppercase tracking-[0.3em] mb-6">
                New Season 2026
              </span>
              <h1 className="text-7xl font-bold font-serif mb-6 leading-none">
                UTEShop <br/>
                <span className="italic text-primary">Editorial</span>
              </h1>
              <p className="text-xl mb-10 text-gray-600 max-w-md font-medium leading-relaxed">
                Khám phá bộ sưu tập mới nhất với phong cách tối giản và cá tính. Độc bản cho riêng bạn.
              </p>
              <div className="flex gap-4">
                <Link
                  to="/products"
                  className="inline-block bg-black text-white px-10 py-4 font-black uppercase tracking-widest text-sm hover:shadow-brutal transition-all active:translate-y-1 active:translate-x-1"
                >
                  Mua sắm ngay →
                </Link>
                <Link
                  to="/products?is_promotional=true"
                  className="inline-block bg-white text-black border-2 border-black px-10 py-4 font-black uppercase tracking-widest text-sm hover:shadow-brutal transition-all active:translate-y-1 active:translate-x-1"
                >
                  Sale Off
                </Link>
              </div>
            </div>
            <div className="hidden md:block relative">
              <div className="border-[4px] border-black shadow-brutal-lg overflow-hidden bg-[#d2bba3] aspect-[4/5] relative">
                <img
                  src="https://images.unsplash.com/photo-1539109136881-3be0616acf4b?q=80&w=1000&auto=format&fit=crop"
                  alt="Fashion"
                  className="w-full h-full object-cover opacity-90 mix-blend-multiply"
                />
                <div className="absolute top-10 right-10 w-32 h-32 bg-primary border-4 border-black rounded-full flex items-center justify-center -rotate-12 shadow-brutal">
                   <span className="text-white font-black text-center text-xs uppercase leading-tight">
                      Limited <br/> Edition
                   </span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Products Sections */}
      <div className="container mx-auto px-4 pb-24">
        {/* Promotional Products */}
        <div className="mb-20">
           <ProductSection
             title="🎉 Khuyến mãi hot"
             products={promotionalProducts}
             viewAllLink="/products?is_promotional=true"
           />
        </div>

        {/* New Products */}
        <div className="mb-20">
          <ProductSection
            title="✨ Sản phẩm mới"
            products={newProducts}
            viewAllLink="/products?is_new=true"
          />
        </div>

        {/* Best Selling Products Carousel */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b-4 border-black pb-4">
            <div>
              <span className="inline-block bg-[#d97736] text-white px-3 py-1 border-2 border-black text-xs font-black uppercase tracking-widest mb-3">
                Top 10 Bán chạy
              </span>
              <h2 className="text-4xl font-black font-serif uppercase tracking-tight text-black">
                🔥 Sản phẩm bán chạy nhất
              </h2>
            </div>
            <Link
              to="/products?sort=sold_count&order=DESC"
              className="mt-4 sm:mt-0 inline-block border-2 border-black bg-white px-6 py-2 text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1"
            >
              Xem tất cả →
            </Link>
          </div>
          <HorizontalPaginationCarousel products={bestSellingProducts} />
        </section>

        {/* Most Viewed Products Carousel */}
        <section className="mb-20">
          <div className="flex flex-col sm:flex-row sm:items-end justify-between mb-8 border-b-4 border-black pb-4">
            <div>
              <span className="inline-block bg-black text-white px-3 py-1 border-2 border-black text-xs font-black uppercase tracking-widest mb-3">
                Top 10 Xem nhiều
              </span>
              <h2 className="text-4xl font-black font-serif uppercase tracking-tight text-black">
                👁️ Sản phẩm xem nhiều nhất
              </h2>
            </div>
            <Link
              to="/category-products"
              className="mt-4 sm:mt-0 inline-block border-2 border-black bg-white px-6 py-2 text-xs font-black uppercase tracking-wider hover:bg-black hover:text-white transition-all shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] active:translate-y-1 active:translate-x-1"
            >
              Duyệt theo danh mục →
            </Link>
          </div>
          <HorizontalPaginationCarousel products={mostViewedProducts} />
        </section>

        {/* Featured Products */}
        <div className="mb-20">
          <ProductSection
            title="⭐ Sản phẩm nổi bật"
            products={featuredProducts}
            viewAllLink="/products?is_featured=true"
          />
        </div>
      </div>

      {/* Footer CTA */}
      <section className="bg-black text-white py-24">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-5xl font-bold font-serif mb-6 italic text-primary">Join our inner circle</h2>
          <p className="text-gray-400 mb-10 max-w-lg mx-auto font-medium uppercase tracking-widest text-sm">
            Nhận thông báo về các bộ sưu tập giới hạn và ưu đãi độc quyền dành riêng cho thành viên.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 max-w-md mx-auto">
             <input type="email" placeholder="Email của bạn" className="bg-transparent border-2 border-white px-6 py-4 focus:outline-none focus:bg-white focus:text-black transition-all font-bold" />
             <button className="bg-white text-black px-8 py-4 font-black uppercase tracking-widest text-xs hover:shadow-[4px_4px_0px_0px_#d97736]">Đăng ký</button>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;
