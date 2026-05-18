import React, { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight } from "lucide-react";
import ProductCard from "./ProductCard";

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

interface HorizontalPaginationCarouselProps {
  products: Product[];
}

export const HorizontalPaginationCarousel: React.FC<HorizontalPaginationCarouselProps> = ({
  products,
}) => {
  const [itemsPerPage, setItemsPerPage] = useState(4);
  const [currentPage, setCurrentPage] = useState(0);

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth < 640) {
        setItemsPerPage(1); // Mobile
      } else if (window.innerWidth < 1024) {
        setItemsPerPage(2); // Tablet
      } else {
        setItemsPerPage(4); // Desktop
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const totalPages = Math.ceil(products.length / itemsPerPage);

  useEffect(() => {
    if (currentPage >= totalPages && totalPages > 0) {
      setCurrentPage(totalPages - 1);
    }
  }, [itemsPerPage, totalPages, currentPage]);

  const handlePrev = () => {
    setCurrentPage((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setCurrentPage((prev) => Math.min(totalPages - 1, prev + 1));
  };

  if (!products || products.length === 0) {
    return (
      <div className="bg-white border-2 border-black p-8 text-center shadow-brutal my-6">
        <p className="text-gray-500 font-bold uppercase tracking-wider">Không có sản phẩm nào</p>
      </div>
    );
  }

  return (
    <div className="relative my-8">
      {/* Navigation Controls & Pagination Info */}
      <div className="flex items-center justify-between mb-6">
        <div className="flex items-center gap-3">
          <span className="text-xs font-black uppercase tracking-widest bg-black text-white px-3 py-1 border-2 border-black">
            Trang ngang
          </span>
          <span className="font-bold text-sm text-black border-2 border-black px-3 py-1 bg-white shadow-[2px_2px_0px_0px_#000000]">
            {currentPage + 1} / {totalPages || 1}
          </span>
        </div>

        <div className="flex gap-2">
          <button
            onClick={handlePrev}
            disabled={currentPage === 0}
            className="p-3 border-2 border-black bg-white hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
            aria-label="Previous Page"
          >
            <ChevronLeft size={20} strokeWidth={3} />
          </button>
          <button
            onClick={handleNext}
            disabled={currentPage === totalPages - 1}
            className="p-3 border-2 border-black bg-white hover:bg-black hover:text-white disabled:opacity-30 disabled:hover:bg-white disabled:hover:text-black hover:shadow-[3px_3px_0px_0px_rgba(0,0,0,1)] transition-all font-black"
            aria-label="Next Page"
          >
            <ChevronRight size={20} strokeWidth={3} />
          </button>
        </div>
      </div>

      {/* Carousel Container */}
      <div className="overflow-hidden border-2 border-black bg-white shadow-brutal p-4">
        <div
          className="flex transition-transform duration-500 ease-in-out gap-4"
          style={{
            transform: `translateX(-${currentPage * 100}%)`,
          }}
        >
          {products.map((product) => {
            // Calculate basis width based on items per page, taking gaps into account
            let widthClass = "w-full shrink-0"; // Mobile (1 item)
            if (itemsPerPage === 2) {
              widthClass = "w-[calc(50%-8px)] shrink-0"; // Tablet (2 items)
            } else if (itemsPerPage === 4) {
              widthClass = "w-[calc(25%-12px)] shrink-0"; // Desktop (4 items)
            }

            return (
              <div key={product.id} className={widthClass}>
                <ProductCard product={product} />
              </div>
            );
          })}
        </div>
      </div>

      {/* Slide Indicators */}
      <div className="flex justify-center items-center gap-2 mt-6">
        {Array.from({ length: totalPages }).map((_, idx) => (
          <button
            key={idx}
            onClick={() => setCurrentPage(idx)}
            className={`w-3 h-3 border-2 border-black transition-all ${
              currentPage === idx ? "bg-black scale-110 shadow-[1px_1px_0px_0px_rgba(0,0,0,1)]" : "bg-white hover:bg-black/10"
            }`}
            aria-label={`Go to page ${idx + 1}`}
          />
        ))}
      </div>
    </div>
  );
};

export default HorizontalPaginationCarousel;
