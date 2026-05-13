import React from "react";
import { Link } from "react-router-dom";
import { ShoppingCart, Star } from "lucide-react";

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

interface ProductCardProps {
  product: Product;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const displayPrice = product.discount_price || product.price;
  const originalPrice = product.price;
  const discount = product.discount_percent || 0;

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND",
      minimumFractionDigits: 0,
    }).format(price);
  };

  const imageUrl =
    product.images && product.images.length > 0
      ? product.images[0].image_url
      : "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=500&h=500&fit=crop";

  return (
    <Link to={`/products/${product.id}`} className="block h-full group">
      <div className="bg-white border-[3px] border-black shadow-brutal hover:shadow-brutal-lg transition-all duration-300 h-full flex flex-col relative overflow-hidden group-hover:-translate-y-1 group-hover:-translate-x-1">
        {/* Image Container */}
        <div className="relative w-full aspect-square bg-[#d2bba3] border-b-[3px] border-black overflow-hidden">
          <img
            src={imageUrl}
            alt={product.name}
            className="w-full h-full object-cover grayscale-[0.2] group-hover:grayscale-0 transition-all duration-500 group-hover:scale-105"
          />

          {/* Badges */}
          <div className="absolute top-3 left-3 flex flex-col gap-2 z-10">
            {product.is_new && (
              <span className="bg-black text-white px-3 py-1 border-2 border-white text-[10px] font-black uppercase tracking-widest">
                Mới
              </span>
            )}
            {product.is_promotional && discount > 0 && (
              <span className="bg-[#d97736] text-white px-3 py-1 border-2 border-black text-[10px] font-black uppercase tracking-widest">
                -{discount}%
              </span>
            )}
          </div>
          
          {/* Quick Add Overlay */}
          <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center">
             <div className="bg-white border-2 border-black px-4 py-2 font-black text-xs uppercase tracking-tighter shadow-brutal">
                Chi tiết →
             </div>
          </div>
        </div>

        {/* Content */}
        <div className="p-5 flex flex-col flex-grow bg-white">
          {/* Category/Brand placeholder if any, or just spacing */}
          <div className="text-[10px] font-black uppercase tracking-widest text-gray-400 mb-1">
             UTEShop Collection
          </div>

          {/* Name */}
          <h3 className="font-serif font-bold text-lg text-black leading-tight line-clamp-2 mb-3 h-14 group-hover:underline decoration-2">
            {product.name}
          </h3>

          <div className="flex items-center justify-between mt-auto pt-4 border-t-2 border-black/5">
             <div className="flex flex-col">
                {discount > 0 && (
                  <span className="text-xs text-gray-400 line-through font-bold">
                    {formatPrice(originalPrice)}
                  </span>
                )}
                <span className="text-xl font-black text-black">
                  {formatPrice(displayPrice)}
                </span>
             </div>
             
             <div className="flex items-center gap-1 bg-black text-white px-2 py-1 text-[10px] font-bold">
                <Star size={10} className="fill-white" />
                {Number(product.rating || 0).toFixed(1)}
             </div>
          </div>
        </div>
      </div>
    </Link>
  );
};

export default ProductCard;
